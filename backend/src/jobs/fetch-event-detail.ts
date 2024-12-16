import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

async function fetchEventDetails(eventId) {
    try {
        const response = await axios.get(`https://api-v2.ticketbox.vn/gin/api/v1/events/${eventId}`);
        if (response.data.status === 1) {
            console.log(`Fetched details for event ID: ${eventId}`);
            return response.data.data.result;
        } else {
            console.log(`Failed to fetch details for event ID: ${eventId}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching details for event ID: ${eventId}:`, error.message);
        return null;
    }
}

async function saveEventData(eventDetails) {
    if (!eventDetails) return;

    const {
        id,
        description,
        address,
        showings,
        status
    } = eventDetails;

    try {
        // 1. Tách các thành phần từ địa chỉ
        // Tách địa chỉ thành các phần dựa trên dấu phẩy
        let parts = address.split(",").map((part) => part.trim());

        // province: Phần sau dấu phẩy cuối cùng
        let province = parts.pop();

        // district: Phần ngay trước province
        let district = parts.pop();

        // streetAndWard: Phần còn lại
        let streetAndWard = parts.join(", ");

        let street, ward;

        // Kiểm tra streetAndWard có dấu phẩy hay không
        if (streetAndWard.includes(",")) {
            // Nếu có dấu phẩy, tách street và ward
            const streetAndWardParts = streetAndWard.split(",").map((part) => part.trim());
            ward = streetAndWardParts.pop(); // Phần sau dấu phẩy cuối cùng là ward
            street = streetAndWardParts.join(", "); // Phần còn lại là street
        } else {
            // Nếu không có dấu phẩy, toàn bộ là street
            street = streetAndWard;
            ward = ""; // ward để trống
        }


        // 2. Kiểm tra và thêm vào bảng province
        let provinceAdd = await prisma.province.findFirst({
            where: { name: province },
        });
        if (!provinceAdd) {
            provinceAdd = await prisma.province.create({
            data: { name: province },
            });
            console.log(`Province "${province}" created.`);
        }

        // 3. Kiểm tra và thêm vào bảng districts
        let districtAdd = await prisma.districts.findFirst({
            where: {
            name: district,
            provinceId: provinceAdd.id,
            },
        });
        if (!districtAdd) {
            districtAdd = await prisma.districts.create({
            data: {
                name: district,
                provinceId: provinceAdd.id,
            },
            });
            console.log(`District "${district}" created in province "${province}".`);
        }

        // 4. Kiểm tra và thêm vào bảng locations
        let location = await prisma.locations.findFirst({
            where: {
            street,
            ward,
            districtId: districtAdd.id,
            },
        });
        if (!location) {
            location = await prisma.locations.create({
            data: {
                street,
                ward,
                districtId: districtAdd.id,
            },
            });
            console.log(`Location "${street}, P. ${ward}" created in district "${district}".`);
        }

        // 5. Cập nhật hoặc tạo mới sự kiện trong bảng events
        await prisma.events.update({
            where: { id },
            data: {
            description: description || "Default Event Description",
            status: status || "Default Event Status",
            locationId: location.id, // Gán locationId từ bảng locations
            },
        });

        if (Array.isArray(showings)){
            const showing = showings[0];
            const ticketTypes = showing.ticketTypes;
            for (const ticketType of ticketTypes){
                await prisma.ticket_Types.upsert({
                    where: { id: ticketType.id },
                    update: {
                        name: ticketType.name || "Default Ticket Name",
                        description: ticketType.description || "Default Ticket Description",
                        maxQuantity: ticketType.maxQtyPerOrder || 2,
                        minQuantity: ticketType.minQtyPerOrder || 1,
                        basePrice: ticketType.originalPrice || 0,
                        effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
                        effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
                        eventId: id,
                    },
                    create: {
                        id: ticketType.id,
                        name: ticketType.name || "Default Ticket Name",
                        description: ticketType.description || "Default Ticket Description",
                        maxQuantity: ticketType.maxQtyPerOrder || 2,
                        minQuantity: ticketType.minQtyPerOrder || 1,
                        basePrice: ticketType.originalPrice || 0,
                        effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
                        effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
                        eventId: id,
                    },
                });
            }
        }
    } catch (error) {
        console.error(`Error saving event ID: ${id} to database:`, error.message);
    }
}

async function main() {
    try {
        // Lấy danh sách tất cả ID sự kiện từ bảng Event
        const eventIds = await prisma.events.findMany({
            select: { id: true },
        });

        // Chạy qua tất cả các ID sự kiện
        for (const { id } of eventIds) {
        //const id = `23422`;
            console.log(`Processing event ID: ${id}`);
            const eventDetails = await fetchEventDetails(id);
            await saveEventData(eventDetails);
        }
    } catch (error) {
        console.error("Error in main function:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
