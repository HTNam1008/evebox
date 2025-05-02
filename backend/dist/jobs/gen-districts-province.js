"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
const typeMapping = {
    "Quan": "District",
    "Huyen": "District",
    "Thanh pho": "City",
    "Thi xa": "Town",
    "Phuong": "Ward",
};
const removeVietnameseTones = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
};
const normalizeProvinceName = (name) => {
    let formattedName = removeVietnameseTones(name);
    if (formattedName.startsWith("Thanh pho ")) {
        formattedName = formattedName.replace("Thanh pho ", "").trim();
        formattedName += " City";
    }
    if (formattedName.startsWith("Tinh ")) {
        formattedName = formattedName.replace("Tinh ", "").trim();
        formattedName += " Province";
    }
    return formattedName;
};
const normalizeDistrictName = (name) => {
    let formattedName = removeVietnameseTones(name);
    for (const [vi, en] of Object.entries(typeMapping)) {
        if (formattedName.startsWith(vi)) {
            formattedName = formattedName.replace(new RegExp(`^${vi}\\s*`), "").trim();
            formattedName = `${formattedName} ${en}`;
            break;
        }
    }
    return formattedName;
};
const filePath = path.join(__dirname, "vn_only_simplified_json_generated_data_vn_units.json");
const rawData = fs.readFileSync(filePath, "utf-8");
const provincesData = JSON.parse(rawData);
async function insertProvinces() {
    console.log("🔹 Đang thêm các tỉnh/thành phố...");
    for (const province of provincesData) {
        const provinceName = normalizeProvinceName(province.FullName);
        console.log("🚀 Tỉnh/thành phố sau khi chuẩn hóa:", provinceName);
        const existingProvince = await prisma.province.findFirst({
            where: { name: provinceName },
        });
        if (!existingProvince) {
            await prisma.province.create({
                data: { name: provinceName },
            });
            console.log(`✅ Đã thêm tỉnh/thành phố: ${provinceName}`);
        }
        else {
            console.log(`🟡 Tỉnh/thành phố "${provinceName}" đã tồn tại.`);
        }
    }
    console.log("🟢 Hoàn tất thêm tỉnh/thành phố.");
}
async function insertDistricts() {
    console.log("🔹 Đang thêm các quận/huyện...");
    for (const province of provincesData) {
        const provinceName = normalizeProvinceName(province.FullName);
        console.log("🚀 ~ insertDistricts ~ provinceName:", provinceName);
        const existingProvince = await prisma.province.findFirst({
            where: { name: provinceName },
        });
        if (!existingProvince) {
            console.warn(`⚠️ Không tìm thấy tỉnh/thành: ${provinceName}`);
            continue;
        }
        for (const district of province.District) {
            const districtName = normalizeDistrictName(district.FullName);
            console.log(`🚀 Quận/huyện sau khi chuẩn hóa: ${districtName}`);
            const existingDistrict = await prisma.districts.findFirst({
                where: {
                    name: districtName,
                    provinceId: existingProvince.id,
                },
            });
            if (!existingDistrict) {
                await prisma.districts.create({
                    data: {
                        name: districtName,
                        provinceId: existingProvince.id,
                    },
                });
                console.log(`✅ Đã thêm quận/huyện: ${districtName} (thuộc ${provinceName})`);
            }
            else {
                console.log(`🟡 Quận/huyện "${districtName}" đã tồn tại.`);
            }
        }
    }
    console.log("✅ Hoàn tất thêm quận/huyện.");
}
async function main() {
    await insertDistricts();
}
main()
    .catch((error) => {
    console.error("❌ Lỗi khi chèn dữ liệu:", error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=gen-districts-province.js.map