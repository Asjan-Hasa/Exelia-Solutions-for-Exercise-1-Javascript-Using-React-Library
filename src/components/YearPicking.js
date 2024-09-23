import React from 'react';
import Select from 'react-select';

const YearPicker = ({ selectedYear, setSelectedYear }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => ({
    value: currentYear - index,
    label: currentYear - index,
  }));

  return (
    <Select
      options={years}
      value={selectedYear}
      onChange={setSelectedYear}
      placeholder="Select a Year"
      isSearchable
      className="basic-single min-w-[150px] flex-1"
      classNamePrefix="select"
    />
  );
};

export default YearPicker;
