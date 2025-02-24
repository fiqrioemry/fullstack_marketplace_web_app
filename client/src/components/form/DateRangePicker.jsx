import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">Pilih Rentang Tanggal</h2>
      <div className="flex gap-2">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd MMMM yyyy"
          className="border p-2 rounded text-center"
          placeholderText="Dari Tanggal"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd MMMM yyyy"
          className="border p-2 rounded text-center"
          placeholderText="Sampai Tanggal"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
