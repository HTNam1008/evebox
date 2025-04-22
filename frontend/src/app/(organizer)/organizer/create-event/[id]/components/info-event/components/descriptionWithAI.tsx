'use client';

import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface DescriptionWithAIProps {
  isValid: boolean;
}

export default function DescriptionWithAI({ isValid }: DescriptionWithAIProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex justify-end mt-3 relative">
      {/* Button Generate AI */}
      <button className="absolute bottom-5 right-2 border-none bg-transparent focus:outline-none"
        onClick={() => {
          if (!isValid) {
            toast.error("Vui lòng hoàn tất các thông tin trước khi sử dụng tính năng này!");
          }
          setShowPopup(!showPopup)
        }}
        title="Generate with AI" type="button"
      >
        <img className="w-12 h-12 rounded-full object-cover shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-110"
          alt="Generate with AI"
          src="https://res.cloudinary.com/de66mx8mw/image/upload/v1745247540/490290816_1085201386703010_7136785208945294009_n_liydh6.png?fbclid=IwY2xjawJzPNtleHRuA2FlbQIxMAABHiM5FBlgU0A6X_OeLF7Z8jD0nuAJiZPUH-d1ABorLq6ISwTX99sKCvTLgmNr_aem_s1PPSAKKFIP8jHpIQOeHrQ"
        />
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="absolute bottom-20 right-2 w-80 bg-white border rounded-2xl shadow-xl p-4 z-50 space-y-4">
          {/* Header popup */}
          <div className="flex justify-between items-start">
            <p className="text-base font-medium text-gray-800">
              Generate AI content cho phần mô tả?
            </p>
            <button onClick={() => setShowPopup(false)}
              className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Button Đồng ý */}
          <button className={`w-full rounded-full py-2 font-semibold transition-colors 
              ${ isValid ? 'bg-sky-600 text-white hover:bg-sky-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={() => {
              if (!isValid) return;
              alert('Đã gửi yêu cầu generate');
              setShowPopup(false);
            }}
            disabled={!isValid}
          >
            Đồng ý
          </button>
        </div>
      )}
    </div>
  );
}
