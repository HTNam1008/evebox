"use client";

/* Package System */
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

/* Package Application */
import SelectField from "../../common/form/selectField";
import TextEditor from "./textEditor";
import { handleImageUpload } from "../../../libs/functions/imageUploadUtils";
import OrganizationInfoForm from "./organizationInfoForm";
import EventLocationInput from "./eventLocationInput";
import EventImageUpload from "./eventImageUpload";

export default function FormInformationEventClient({ onNextStep, btnValidate }: { onNextStep: () => void, btnValidate: string }) {
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
    const [imageLogoErrors, setImageLogoErrors] = useState<{ [key: string]: string }>({});

    //********Call api**********
    const provinces = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"]
    const districts = ["Quận 1", "Quận 3", "Quận 7"];
    const typeEvents = ["Nhạc sống", "Sân khấu & Nghệ thuật", "Thể thao", "Khác"];
    const wards = ["Phường 1", "Phường 2", "Phường 3"];

    //Nội dung sẵn trong Thông tin sự kiện
    const [post, setPost]
        = useState(`<p><strong>Giới thiệu sự kiện:</strong></p>
                <p>
                    [Tóm tắt ngắn gọn về sự kiện: Nội dung chính, điểm đặc sắc nhất
                    và lý do khiến người tham gia không nên bỏ lỡ]
                </p>

                <p><strong>Chi tiết sự kiện:</strong></p>
                <ul className="list-disc ml-5">
                    <li>
                        <span><strong>Chương trình chính:</strong></span> [Liệt kê
                        những hoạt động nổi bật trong sự kiện: các phần trình diễn, khách mời
                        đặc biệt, lịch trình các tiết mục cụ thể nếu có.]
                    </li>
                    <li>
                        <span><strong>Khách mời:</strong></span> [Thông tin về các khách
                        mời đặc biệt, nghệ sĩ, diễn giả sẽ tham gia sự kiện.]
                    </li>
                    <li>
                        <span><strong>Trải nghiệm đặc biệt:</strong></span> [Nếu có
                        các hoạt động đặc biệt như workshop, khu trải nghiệm, photo booth,
                        khu check-in hay ưu đãi dành riêng cho người tham dự.]
                    </li>
                </ul>

                <p><strong>Điều khoản và điều kiện:</strong></p>
                <p>[TnC] sự kiện</p>
                <p>Lưu ý về điều khoản trẻ em</p>
                <p>Lưu ý về điều khoản VAT</p>`);

    //Lấy nội dung đã lưu trong LocalStorage
    useEffect(() => {
        const savedEvent = localStorage.getItem("event_1"); //Nếu không phải gán cứng thì sẽ là event_id

        if (savedEvent) {
            const eventData = JSON.parse(savedEvent);
            setEventName(eventData.eventName);
            setNameOrg(eventData.nameOrg);
            setInfoOrg(eventData.infoOrg);
            setEventTypeSelected(eventData.eventTypeSelected);
            setEventAddress(eventData.eventAddress);
            setProvince(eventData.province);
            setDistrict(eventData.district);
            setWard(eventData.ward);
            setStreet(eventData.street);
            setTypeEvent(eventData.typeEvent);
            setPost(eventData.post);
            setLogo(eventData.logo);
            setBackground(eventData.background);
            setLogoOrg(eventData.logoOrg);
        }
    }, []);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        handleImageUpload(event, type, setImageErrors, setLogo, setBackground, setLogoOrg);
    };

    const handleUploadLogo = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        handleImageUpload(event, type, setImageLogoErrors, setLogo, setBackground, setLogoOrg);
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

    const onChange = (content: string) => {
        setPost(content);
    }

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

        if (!typeEvent) newErrors.typeEvent = true;
        if (!eventName.trim()) newErrors.eventName = true;
        if (!nameOrg.trim()) newErrors.nameOrg = true;
        if (!infoOrg.trim()) newErrors.infoOrg = true;


        if (!background) {
            setImageErrors((prev) => ({ ...prev, background: "Vui lòng tải lên ảnh nền sự kiện" }));
            toast.error("Vui lòng tải lên ảnh nền sự kiện!", { duration: 5000 });
        }

        if (!logoOrg) {
            setImageLogoErrors((prev) => ({ ...prev, background: "Vui lòng tải lên logo ban tổ chức" }));
            toast.error("Vui lòng tải lên logo ban tổ chức!", { duration: 5000 });
        }

        if (eventTypeSelected === "offline") {
            if (!eventAddress.trim()) newErrors.eventAddress = true;
            if (!province) newErrors.province = true;
            if (!street.trim()) newErrors.street = true;
        }

        setErrors(newErrors);

        // Lưu dữ liệu vào LocalStorage
        const eventData = {
            id: 1,  // ID đang tạm thời gán cứng
            eventName,
            nameOrg,
            infoOrg,
            eventTypeSelected,
            eventAddress,
            province,
            district,
            ward,
            street,
            typeEvent,
            post,
            logo,
            background,
            logoOrg,
        };

        localStorage.setItem("event_1", JSON.stringify(eventData));

        if (Object.keys(newErrors).length === 0) {

            if (btnValidate === "Save") {
                alert("Form hợp lệ!");
            } else if (btnValidate === "Continue") {
                alert("Form hợp lệ! Gửi dữ liệu...");
                onNextStep();
            }
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <div className="flex justify-center mb-6">
                <form className="w-full max-w-4xl mx-auto mb-6" onSubmit={handleSubmit} id="event-form">
                    <EventImageUpload
                        logo={logo}
                        background={background}
                        handleUpload={handleUpload}
                        imageErrors={imageErrors}
                        eventName={eventName}
                        handleInputChange={handleInputChange}
                        errors={errors}
                    />

                    <EventLocationInput
                        eventTypeSelected={eventTypeSelected} eventAddress={eventAddress}
                        province={province} district={district} ward={ward} street={street}
                        errors={errors} provinces={provinces} districts={districts} wards={wards}
                        handleInputChange={handleInputChange}
                        handleSelectChange={handleSelectChange}
                        setEventTypeSelected={setEventTypeSelected}
                    />

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

                                <div className="boder ">
                                    <TextEditor content={post} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <OrganizationInfoForm
                        logoOrg={logoOrg}
                        nameOrg={nameOrg}
                        infoOrg={infoOrg}
                        handleUpload={handleUploadLogo}
                        handleInputChange={handleInputChange}
                        errors={errors}
                        imageLogoErrors={imageLogoErrors}
                    />
                </form>
            </div>
        </>
    );
}
