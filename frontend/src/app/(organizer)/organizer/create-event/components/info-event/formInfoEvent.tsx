"use client";

/* Package System */
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

/* Package Application */
import InputField from "../common/form/inputCountField";
import SelectField from "../common/form/selectField";
import ImageUpload from "../common/form/imageUpload";

export default function FormInformationEventClient({ onNextStep }: { onNextStep: () => void }) {
    const [logo, setLogo] = useState<string | null>(null);
    const [background, setBackground] = useState<string | null>(null);
    const [logoOrg, setLogoOrg] = useState<string | null>(null);
    const [eventName, setEventName] = useState("");
    const [nameOrg, setNameOrg] = useState("");
    const [infoOrg, setInfoOrg] = useState("");
    const [eventTypeSelected, setEventTypeSelected] = useState("offline");
    const [eventAddress, setEventAddress] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [typeEvent, setTypeEvent] = useState("");
    const [ward, setWard] = useState("");
    const [street, setStreet] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [imageErrors, setImageErrors] = useState<{ [key: string]: string }>({});

    const provinces = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"]
    const districts = ["Quận 1", "Quận 3", "Quận 7"];
    const typeEvents = ["Nhạc sống", "Sân khấu & Nghệ thuật", "Thể thao", "Khác"];
    const wards = ["Phường 1", "Phường 2", "Phường 3"];

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    const { width, height } = img;
                    if ((type === "logo" && (width !== 720 || height !== 958)) || (type === "background" && (width !== 1280 || height !== 720)) || (type === "logoOrg" && (width !== 275 || height !== 275))) {
                        setImageErrors((prev) => ({ ...prev, [type]: "Kích thước ảnh không đúng" }));
                        toast.error("Kích thước ảnh không đúng!", { duration: 10000 });
                    } else {
                        setImageErrors((prev) => ({ ...prev, [type]: "" }));
                        if (type === "logo") {
                            setLogo(reader.result as string);
                        } else if (type === "background") {
                            setBackground(reader.result as string);
                        } else if (type === "logoOrg") {
                            setLogoOrg(reader.result as string);
                        }
                    }
                };
            };

            reader.readAsDataURL(file);
        }
    };

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const value = e.target.value;
        if (field === "eventName") setEventName(value);
        if (field === "eventAddress") setEventAddress(value);
        if (field === "street") setStreet(value);
        if (field === "nameOrg") setNameOrg(value);
        if (field === "infoOrg") setInfoOrg(value);

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: boolean } = {};

        if (!province) newErrors.province = true;
        if (!typeEvent) newErrors.typeEvent = true;
        if (!eventAddress.trim()) newErrors.eventAddress = true;
        if (!eventName.trim()) newErrors.eventName = true;
        if (!street.trim()) newErrors.street = true;
        if (!nameOrg.trim()) newErrors.nameOrg = true;
        if (!infoOrg.trim()) newErrors.infoOrg = true;
        if (!background) {
            setImageErrors((prev) => ({ ...prev, background: "Vui lòng tải lên ảnh nền sự kiện" }));
            toast.error("Vui lòng tải lên ảnh nền sự kiện!", { duration: 5000 });
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert("Form hợp lệ! Gửi dữ liệu...");
            onNextStep();
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <div className="flex justify-center">
                <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit}>
                    <div className="p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                        <label className="block text-sm font-bold mb-2">
                            <span className="text-red-500">* </span> Upload hình ảnh
                        </label>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            {/* Upload Logo */}
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <ImageUpload
                                    image={logo}
                                    onUpload={(e) => handleUpload(e, "logo")}
                                    placeholderText="Thêm logo sự kiện"
                                    dimensions="(720x958)"
                                    height="h-96"
                                    error={imageErrors.logo}
                                />
                            </div>

                            {/* Upload Background */}
                            <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                <ImageUpload
                                    image={background}
                                    onUpload={(e) => handleUpload(e, "background")}
                                    placeholderText="Thêm ảnh nền sự kiện"
                                    dimensions="(1280x720)"
                                    height="h-96"
                                    error={imageErrors.background}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            {/* Tên sự kiện */}
                            <div className="w-full px-3">
                                <InputField
                                    label="Tên sự kiện"
                                    placeholder="Nhập tên sự kiện"
                                    value={eventName}
                                    onChange={(e) => handleInputChange(e, "eventName")}
                                    error={errors.eventName}
                                    maxLength={100}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto"
                        style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                        <label className="block text-sm font-bold mb-2">
                            <span className="text-red-500">* </span> Địa điểm sự kiện
                        </label>

                        {/* Radio buttons */}
                        <div className="flex items-center gap-6 mt-2 text-sm mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="event_location"
                                    className="peer hidden"
                                    checked={eventTypeSelected === "offline"}
                                    onChange={() => setEventTypeSelected("offline")}
                                />
                                <div className="w-4 h-4 rounded-full border border-black bg-white flex items-center justify-center peer-checked:bg-[#9EF5CF] peer-focus:border-green-700">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <span>Sự kiện offline</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="event_location"
                                    className="peer hidden"
                                    checked={eventTypeSelected === "online"}
                                    onChange={() => setEventTypeSelected("online")}
                                />
                                <div className="w-4 h-4 rounded-full border border-black bg-white flex items-center justify-center peer-checked:bg-[#9EF5CF]">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <span>Sự kiện online</span>
                            </label>
                        </div>

                        {/* Chỉ hiển thị phần nhập địa chỉ khi chọn "Sự kiện offline" */}
                        {eventTypeSelected === "offline" && (
                            <div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    {/* Tên địa điểm */}
                                    <div className="w-full px-3">
                                        <InputField
                                            label="Tên địa điểm"
                                            placeholder="Nhập tên địa điểm"
                                            value={eventAddress}
                                            onChange={(e) => handleInputChange(e, "eventAddress")}
                                            error={errors.eventAddress}
                                            maxLength={80}
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
                                            maxLength={80}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
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

                    <div className="mt-3 p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                        {/* Thông tin sự kiện */}
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block text-sm font-bold mb-2">
                                    <span className="text-red-500">* </span> Thông tin sự kiện
                                </label>
                                <div className="relative">
                                    <input
                                        className={`text-sm block appearance-none w-full border py-3 px-4 pr-8 rounded leading-tight focus:outline-black-400`}
                                        type="text"
                                        value={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-3 p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            {/* Logo ban tổ chức */}
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block text-sm font-bold mb-2">
                                    <span className="text-red-500">* </span> Upload hình ảnh
                                </label>
                                <div className=" text-center">
                                    <ImageUpload
                                        image={logoOrg}
                                        onUpload={(e) => handleUpload(e, "logoOrg")}
                                        placeholderText="Thêm logo ban tổ chức"
                                        dimensions="(275x275)"
                                        height="h-56"
                                        error={imageErrors.logoOrg}
                                    />
                                </div>

                            </div>

                            {/* Tên ban tổ chức */}
                            <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                <InputField
                                    label="Tên ban tổ chức"
                                    placeholder="Nhập tên ban tổ chức"
                                    value={nameOrg}
                                    onChange={(e) => handleInputChange(e, "nameOrg")}
                                    error={errors.nameOrg}
                                    maxLength={80}
                                    required
                                />

                                {/* Thông tin ban tổ chức */}
                                <div className="mt-4">
                                    <label className="block text-sm font-bold mb-2">
                                        <span className="text-red-500">* </span> Thông tin ban tổ chức
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            className={`w-full h-32 text-sm block appearance-none w-full border py-3 px-4 pr-8 rounded leading-tight focus:outline-black-400 ${
                                                errors.infoOrg ? "border-red-500" : "border-gray-400"
                                            }`}
                                            placeholder="Nhập thông tin ban tổ chức"
                                            value={infoOrg}
                                            onChange={(e) => handleInputChange(e, "infoOrg")}
                                        />
                                        <p className="text-sm text-gray-400 pointer-events-none absolute inset-y-0 right-0 flex items-end px-2 mb-3">
                                            0/500
                                        </p>
                                    </div>
                                    {errors.infoOrg && <p className="text-red-500 text-sm mt-1">Vui lòng nhập thông tin ban tổ chức</p>}
                                </div>
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
        </>
    );
}
