import React from "react";
import {Slider} from "@nextui-org/react";

export default function RangeSlider() {
  const [value, setValue] = React.useState([100, 300]);

  return (
    <div className="flex flex-col gap-1 w-full h-full max-w-sm items-start justify-center">
      <Slider
        className="max-w-sm"
        style={{ width: "20vw" }}
        formatOptions={{style: "currency", currency: "VND"}}
        label="Chọn khoảng giá "
        maxValue={20000000}
        minValue={0}
        step={1000}
        value={value}
        onChange={setValue}
      />
      <p className="text-default-500 mb-0 font-medium text-small">
        Khoảng giá: {Array.isArray(value) && value.map((b) => `${b}`).join(" – ")}
      </p>
    </div>
  );
}

