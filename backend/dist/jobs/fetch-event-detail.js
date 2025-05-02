"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const axios_1 = require("axios");
const prisma = new client_1.PrismaClient();
async function fetchEventDetails(eventId) {
    try {
        const response = await axios_1.default.get(`https://api-v2.ticketbox.vn/gin/api/v1/events/${eventId}`);
        if (response.data.status === 1) {
            console.log(`Fetched details for event ID: ${eventId}`);
            return response.data.data.result;
        }
        else {
            console.log(`Failed to fetch details for event ID: ${eventId}`);
            return null;
        }
    }
    catch (error) {
        console.error(`Error fetching details for event ID: ${eventId}:`, error.message);
        return null;
    }
}
async function saveEventData(eventDetails) {
    if (!eventDetails)
        return;
    const { id, description, address, showings, status } = eventDetails;
    try {
        let parts = address.split(",").map((part) => part.trim());
        let province = parts.pop();
        let district = parts.pop();
        let streetAndWard = parts.join(", ");
        let street, ward;
        if (streetAndWard.includes(",")) {
            const streetAndWardParts = streetAndWard.split(",").map((part) => part.trim());
            ward = streetAndWardParts.pop();
            street = streetAndWardParts.join(", ");
        }
        else {
            street = streetAndWard;
            ward = "";
        }
        let provinceAdd = await prisma.province.findFirst({
            where: { name: province },
        });
        if (!provinceAdd) {
            provinceAdd = await prisma.province.create({
                data: { name: province },
            });
            console.log(`Province "${province}" created.`);
        }
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
        await prisma.events.update({
            where: { id },
            data: {
                description: description || "Default Event Description",
                status: status || "Default Event Status",
                locationId: location.id,
            },
        });
    }
    catch (error) {
        console.error(`Error saving event ID: ${id} to database:`, error.message);
    }
}
async function main() {
    try {
        const eventIds = await prisma.events.findMany({
            select: { id: true },
        });
        for (const { id } of eventIds) {
            console.log(`Processing event ID: ${id}`);
            const eventDetails = await fetchEventDetails(id);
            await saveEventData(eventDetails);
        }
    }
    catch (error) {
        console.error("Error in main function:", error.message);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=fetch-event-detail.js.map