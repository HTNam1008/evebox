import { useState } from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 

const DatePicker = () => { 
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });

    return (
        <Datepicker
            placeholder="Từ ngày ~ Đến ngày"
            value={value} 
            onChange={newValue => setValue(newValue)}
        /> 
    );
};

export default DatePicker;
