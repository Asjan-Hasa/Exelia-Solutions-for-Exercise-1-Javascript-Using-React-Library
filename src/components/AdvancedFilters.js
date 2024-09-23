import React from 'react';
import YearPicker from './YearPicking';
import SortDropdown from './SortDropdown';
import Search from './Search';

const AdvancedFilters = ({
  startYear,
  setStartYear,
  endYear,
  setEndYear,
  minImdb,
  setMinImdb,
  sort,
  setSort,
  search,
  setSearch
}) => {
  return (
    <div className="flex flex-wrap gap-4 p-2 bg-white rounded-lg shadow-md">
      <YearPicker selectedYear={startYear} setSelectedYear={setStartYear} />
      <YearPicker selectedYear={endYear} setSelectedYear={setEndYear} />
      <input
        type="number"
        placeholder="Min IMDB"
        value={minImdb}
        onChange={(e) => setMinImdb(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />
      <SortDropdown sort={sort} setSort={setSort} />
      <Search search={search} setSearch={setSearch} />
    </div>
  );
};

export default AdvancedFilters;
