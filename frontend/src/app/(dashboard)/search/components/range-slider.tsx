import React from "react";
import { Slider } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function RangeSlider({ onChange }: { onChange?: (value: number[]) => void }) {
  const [value, setValue] = React.useState<number[]>([100, 300]);
  const handleChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
      if (onChange) onChange(newValue);
    }
  }

  return (
    <div className="flex flex-col w-full items-start p-2 bg-white rounded shadow-md max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        key={value.join(",")}
        className="mt-2 text-base font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-xl w-full text-center"
      >
        Khoảng giá:{" "}
        {value.map((b) =>
          b.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
        ).join(" – ")}
      </motion.div>
      <Slider
        style={{ width: "100%" }}
        formatOptions={{ style: "currency", currency: "VND" }}
        maxValue={20000000}
        minValue={0}
        step={1000}
        value={value}
        onChange={handleChange}
        color="primary"
        classNames={{
          track: "bg-gray-200 h-2 rounded-full",
          thumb: "bg-[#0C4762] w-5 h-5 shadow-lg hover:scale-110 transition-transform",
          labelWrapper: "text-gray-700 font-medium",
        }}
      />
      
    </div>
  );
}
