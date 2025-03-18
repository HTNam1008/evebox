/* Package System */
import { useState } from 'react';

/* Package Application */
import InputCountField from '../../common/form/inputCountField';
import InputField from '../../common/form/inputField';
import SelectField from '../../common/form/selectField';

export default function FormInfoPaymentClient() {
    const [accName, setAccName] = useState("");
    const [accNum, setAccNum] = useState("0");
    const [bankName, setBankName] = useState("");
    const [bankBranch, setBankBranch] = useState("");
    const [typeBusiness, setTypeBusiness] = useState("Cá nhân");
    const [perName, setPerName] = useState("");
    const [perAddress, setPerAddress] = useState("");
    const [taxCode, setTaxCode] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyTaxCode, setCompanyTaxCode] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const value = e.target.value;
        if (field === "accName") setAccName(value);
        if (field === "accNum") setAccNum(value);
        if (field === "bankName") setBankName(value);
        if (field === "bankBranch") setBankBranch(value);
        if (field === "perName") setPerName(value);
        if (field === "perAddress") setPerAddress(value);
        if (field === "taxCode") setTaxCode(value);
        if (field === "companyName") setCompanyName(value);
        if (field === "companyAddress") setCompanyAddress(value);
        if (field === "companyTaxCode") setCompanyTaxCode(value);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
        const value = e.target.value;

        if (field === "typeBusiness") setTypeBusiness(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: boolean } = {};

        if (Object.keys(newErrors).length === 0) {
            alert("Form hợp lệ! Gửi dữ liệu...");
        }
    };

    return (
        <>
            <div className="flex justify-center w-full mb-4">
                <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit}>
                    <div className="p-6 lg:p-8 rounded-lg shadow-sm w-full max-w-5xl mx-auto" style={{ backgroundColor: "rgba(158, 245, 207, 0.2)", border: "1.5px solid #9EF5CF" }}>
                        <label className="text-base font-bold">
                            Thông tin thanh toán
                        </label>
                        <br></br>
                        <span className="text-sm mt-3">
                            Evebox sẽ chuyển tiền bán vé đến tài khoản của bạn <br></br>
                            Tiền bán vé (sau khi trừ phí dịch vụ cho Evebox) sẽ vào tài khoản của bạn sau khi xác nhận sale report từ 7 - 10 ngày. Nếu bạn
                            muốn nhận được tiền sớm hơn, vui lòng liên hệ chúng tôi qua số 1900.6408 hoặc info@evebox.vn
                        </span>

                        <div className="flex flex-wrap items-center -mx-3 mb-6 mt-4">
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block text-sm font-bold mb-2 text-right">
                                    Chủ tài khoản:
                                </label>
                            </div>

                            <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                <InputCountField
                                    label=""
                                    placeholder=""
                                    value={accName}
                                    onChange={(e) => handleInputChange(e, "accName")}
                                    maxLength={100}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center -mx-3 mb-6">
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block text-sm font-bold mb-2 text-right">
                                    Số tài khoản:
                                </label>
                            </div>

                            <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                <InputField
                                    label=""
                                    placeholder=""
                                    value={accNum}
                                    onChange={(e) => handleInputChange(e, "accNum")}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center -mx-3 mb-6">
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block text-sm font-bold mb-2 text-right">
                                    Tên ngân hàng:
                                </label>
                            </div>

                            <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                <InputCountField
                                    label=""
                                    placeholder=""
                                    value={bankName}
                                    onChange={(e) => handleInputChange(e, "bankName")}
                                    maxLength={100}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center -mx-3 mb-6">
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block text-sm font-bold mb-2 text-right">
                                    Chi nhánh:
                                </label>
                            </div>

                            <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                <InputCountField
                                    label=""
                                    placeholder=""
                                    value={bankBranch}
                                    onChange={(e) => handleInputChange(e, "bankBranch")}
                                    maxLength={100}
                                />
                            </div>
                        </div>


                        <label className="text-base font-bold">
                            Hoá đơn đỏ
                        </label>

                        <div className="flex flex-wrap items-center -mx-3 mb-6 mt-4">
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label className="block text-sm font-bold mb-2 text-right">
                                    Loại hình kinh doanh:
                                </label>
                            </div>

                            <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                <SelectField
                                    label=""
                                    options={["Cá nhân", "Doanh nghiệp/Tổ chức"]}
                                    value={typeBusiness}
                                    onChange={(e) => handleSelectChange(e, "typeBusiness")}
                                />
                            </div>
                        </div>

                        {/* Hiển thị khi Loại hình kinh doanh là Cá nhân */}
                        {typeBusiness === "Cá nhân" && (
                            <div className='infoOfPersonal'>
                                <div className="flex flex-wrap items-center -mx-3 mb-6">
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <label className="block text-sm font-bold mb-2 text-right">
                                            Họ tên:
                                        </label>
                                    </div>

                                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                        <InputCountField
                                            label=""
                                            placeholder=""
                                            value={perName}
                                            onChange={(e) => handleInputChange(e, "perName")}
                                            maxLength={100}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center -mx-3 mb-6">
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <label className="block text-sm font-bold mb-2 text-right">
                                            Địa chỉ:
                                        </label>
                                    </div>

                                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                        <InputCountField
                                            label=""
                                            placeholder=""
                                            value={perAddress}
                                            onChange={(e) => handleInputChange(e, "perAddress")}
                                            maxLength={100}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center -mx-3 mb-6">
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <label className="block text-sm font-bold mb-2 text-right">
                                            Mã số thuế:
                                        </label>
                                    </div>

                                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                        <InputField
                                            label=""
                                            placeholder=""
                                            value={taxCode}
                                            onChange={(e) => handleInputChange(e, "taxCode")}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hiển thị khi Loại hình kinh doanh là Doanh nghiệp/Tổ chức */}
                        {typeBusiness === "Doanh nghiệp/Tổ chức" && (
                            <div className='infoOfCompany'>
                                <div className="flex flex-wrap items-center -mx-3 mb-6">
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <label className="block text-sm font-bold mb-2 text-right">
                                            Tên công ty:
                                        </label>
                                    </div>

                                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                        <InputCountField
                                            label=""
                                            placeholder=""
                                            value={companyName}
                                            onChange={(e) => handleInputChange(e, "companyName")}
                                            maxLength={100}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center -mx-3 mb-6">
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <label className="block text-sm font-bold mb-2 text-right">
                                            Địa chỉ công ty:
                                        </label>
                                    </div>

                                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                        <InputCountField
                                            label=""
                                            placeholder=""
                                            value={companyAddress}
                                            onChange={(e) => handleInputChange(e, "companyAddress")}
                                            maxLength={100}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center -mx-3 mb-6">
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <label className="block text-sm font-bold mb-2 text-right">
                                            Mã số thuế:
                                        </label>
                                    </div>

                                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                                        <InputField
                                            label=""
                                            placeholder=""
                                            value={companyTaxCode}
                                            onChange={(e) => handleInputChange(e, "companyTaxCode")}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

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
    )
}