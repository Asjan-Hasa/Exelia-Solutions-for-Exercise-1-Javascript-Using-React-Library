import React from 'react';
import Select from 'react-select';

const SortDropdown = ({ sort, setSort }) => {
  const options = [
    { value: 'latest', label: 'Latest' },
    { value: 'highestrated', label: 'Highest Rated' },
    { value: 'lowestrated', label: 'Lowest Rated' },
    { value: 'oldest', label: 'Oldest' },
  ];

  return (
    <Select
      options={options}
      value={options.find(option => option.value === sort)}
      onChange={option => setSort(option.value)}
      placeholder="Sort By"
      className="flex-1"
      classNamePrefix="select"
    />
  );
};

export default SortDropdown;
