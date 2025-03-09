"use client";

/* Package System */
import { useState } from "react";

/* Package Application */
import InputField from "./common/form/inputField";
import SelectField from "./common/form/selectField";

export default function FormInformationEventClient() {
    const [eventName, setEventName] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [typeEvent, setTypeEvent] = useState("");
    const [ward, setWard] = useState("");
    const [street, setStreet] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const provinces = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"]
    const districts = ["Quận 1", "Quận 3", "Quận 7"];
    const typeEvents = ["Nhạc sống", "Sân khấu & Nghệ thuật", "Thể thao", "Khác"];
    const wards = ["Phường 1", "Phường 2", "Phường 3"];

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
        const value = e.target.value;

        if (field === "province") setProvince(value);
        if (field === "district") setDistrict(value);
        if (field === "ward") setWard(value);
        if (field === "typeEvent") setTypeEvent(value);

        // Xóa lỗi nếu chọn lại giá trị
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = e.target.value;
        if (field === "eventName") setEventName(value);
        if (field === "street") setStreet(value);
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: boolean } = {};

        if (!province) newErrors.province = true;
        if (!typeEvent) newErrors.typeEvent = true;
        if (!eventName.trim()) newErrors.eventName = true;
        if (!street.trim()) newErrors.street = true;

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert("Form hợp lệ! Gửi dữ liệu...");
        }
    };

    return (
        <div className="flex justify-center">
            <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit}>
                <div className="p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto"
                    style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        {/* Tên địa điểm */}
                        <div className="w-full px-3">
                            <InputField
                                label="Tên địa điểm"
                                placeholder="Nhập tên địa điểm"
                                value={eventName}
                                onChange={(e) => handleInputChange(e, "eventName")}
                                error={errors.eventName}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        {/* Tỉnh/Thành */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <SelectField
                                label="Tỉnh/Thành"
                                options={provinces}
                                value={province}
                                onChange={(e) => handleSelectChange(e, "province")}
                                error={errors.province}
                                required
                            />
                        </div>

                        {/* Quận/Huyện */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <SelectField
                                label="Quận/Huyện"
                                options={districts}
                                value={district}
                                onChange={(e) => handleSelectChange(e, "district")}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        {/* Phường/Xã */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <SelectField
                                label="Phường/Xã"
                                options={wards}
                                value={ward}
                                onChange={(e) => handleSelectChange(e, "ward")}
                            />
                        </div>

                        {/* Số nhà, đường */}
                        <div className="w-full md:w-1/2 px-3">
                            <InputField
                                label="Số nhà, đường"
                                placeholder="Nhập số nhà, đường"
                                value={street}
                                onChange={(e) => handleInputChange(e, "street")}
                                error={errors.street}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-3 p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                    {/* Thể loại sự kiện */}
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                             <SelectField
                                label="Thể loại sự kiện"
                                options={typeEvents}
                                value={typeEvent}
                                onChange={(e) => handleSelectChange(e, "typeEvent")}
                                error={errors.typeEvent}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Nút Nộp */}
                <div className="flex justify-center mt-4 mb-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition"
                    >
                        Nộp
                    </button>
                </div>
            </form>
        </div>
    );
}
