import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

// Từ điển ánh xạ để chuyển đổi loại địa danh
const typeMapping: { [key: string]: string } = {
  "Quan": "District",
  "Huyen": "District",
  "Thanh pho": "City",
  "Thi xa": "Town",
  "Phuong": "Ward",
};

// Hàm chuyển đổi tiếng Việt có dấu sang không dấu
const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

// Hàm chuẩn hóa tên tỉnh/thành phố
const normalizeProvinceName = (name: string): string => {
  let formattedName = removeVietnameseTones(name);

  // Nếu có tiền tố "Thanh pho" (Thành phố), đổi thành "City"
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

// Hàm chuẩn hóa tên quận/huyện
const normalizeDistrictName = (name: string): string => {
  let formattedName = removeVietnameseTones(name);

  for (const [vi, en] of Object.entries(typeMapping)) {
    if (formattedName.startsWith(vi)) {
      formattedName = formattedName.replace(new RegExp(`^${vi}\\s*`), "").trim();
      formattedName = `${formattedName} ${en}`;
      break; // Chỉ thay thế loại địa danh đầu tiên
    }
  }

  return formattedName;
};

// Đọc file JSON chứa dữ liệu tỉnh/thành và quận/huyện
const filePath = path.join(__dirname, "vn_only_simplified_json_generated_data_vn_units.json");
const rawData = fs.readFileSync(filePath, "utf-8");
const provincesData = JSON.parse(rawData);

async function insertProvinces() {
  console.log("🔹 Đang thêm các tỉnh/thành phố...");

  for (const province of provincesData) {
    const provinceName = normalizeProvinceName(province.FullName);

    console.log("🚀 Tỉnh/thành phố sau khi chuẩn hóa:", provinceName);

    // Kiểm tra xem province đã tồn tại chưa
    const existingProvince = await prisma.province.findFirst({
      where: { name: provinceName },
    });

    if (!existingProvince) {
      await prisma.province.create({
        data: { name: provinceName },
      });

      console.log(`✅ Đã thêm tỉnh/thành phố: ${provinceName}`);
    } else {
      console.log(`🟡 Tỉnh/thành phố "${provinceName}" đã tồn tại.`);
    }
  }

  console.log("🟢 Hoàn tất thêm tỉnh/thành phố.");
}

async function insertDistricts() {
  console.log("🔹 Đang thêm các quận/huyện...");

  for (const province of provincesData) {
    const provinceName = normalizeProvinceName(province.FullName);
    console.log("🚀 ~ insertDistricts ~ provinceName:", provinceName)

    // Lấy ID của province sau khi đã thêm
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

      // Kiểm tra xem district đã tồn tại chưa
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
      } else {
        console.log(`🟡 Quận/huyện "${districtName}" đã tồn tại.`);
      }
    }
  }

  console.log("✅ Hoàn tất thêm quận/huyện.");
}

async function main() {
  // await insertProvinces();
  await insertDistricts();
}

main()
  .catch((error) => {
    console.error("❌ Lỗi khi chèn dữ liệu:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
