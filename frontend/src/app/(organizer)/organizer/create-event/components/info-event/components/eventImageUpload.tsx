import React from 'react';
import ImageUpload from '../../../[id]/components/common/form/imageUpload';
import InputField from '../../../[id]/components/common/form/inputCountField';
import { EventImageUploadProps } from '../../../[id]/libs/interface/infoevent.interface';

const EventImageUpload: React.FC<EventImageUploadProps> = ({
    logo,
    background,
    handleUpload,
    imageErrors,
    eventName,
    handleInputChange,
    errors,
}) => {
    return (
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
    );
};

export default EventImageUpload;
