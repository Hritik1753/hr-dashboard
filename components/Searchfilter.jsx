'use client';
import { useState } from 'react';

export default function SearchFilter({ onSearch }) {
  const [query, setQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const handleSearch = () => {
    onSearch({ query, ratingFilter, departmentFilter });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        className="border p-2 rounded w-60"
        type="text"
        placeholder="Search by name/email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        onChange={(e) => setDepartmentFilter(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Design">Design</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={(e) => setRatingFilter(e.target.value)}
      >
        <option value="">All Ratings</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>{r} Stars</option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Filter
      </button>
    </div>
  );
}
