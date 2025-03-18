import React from 'react';
import InputField from '../../../[id]/components/common/form/inputCountField';
import SelectField from '../../../[id]/components/common/form/selectField';
import { EventLocationInputProps } from '../../../[id]/libs/interface/infoevent.interface';

const EventLocationInput: React.FC<EventLocationInputProps > = ({ 
    eventTypeSelected, 
    eventAddress, 
    province, 
    district, 
    ward, 
    street, 
    errors, 
    provinces, 
    districts, 
    wards, 
    handleInputChange, 
    handleSelectChange,
    setEventTypeSelected,
 }) => {
  return (
    <div className="mt-3 p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
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
          {/* Tên địa điểm */}
          <div className="flex flex-wrap -mx-3 mb-6">
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

          {/* Tỉnh/Thành */}
          <div className="flex flex-wrap -mx-3 mb-6">
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

          {/* Phường/Xã */}
          <div className="flex flex-wrap -mx-3 mb-6">
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
  );
};

export default EventLocationInput;
