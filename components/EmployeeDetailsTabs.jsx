'use client';

import { useState } from 'react';

export default function EmployeeDetailsTabs({ history }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <ul className="list-disc list-inside">
            {history.map((item, idx) => (
              <li key={idx}>
                Year {item.year}: {item.rating} ★
              </li>
            ))}
          </ul>
        );
      case 'Projects':
        return (
          <ul className="list-disc list-inside">
            <li>Project A - HR Automation</li>
            <li>Project B - Employee Portal Redesign</li>
            <li>Project C - Internal Analytics Tool</li>
          </ul>
        );
      case 'Feedback':
        return (
          <div>
            <p className="mb-2">"Always delivers on time and exceeds expectations!"</p>
            <p className="mb-2">"Very collaborative and proactive in team discussions."</p>
            <textarea
              placeholder="Leave feedback..."
              className="w-full p-2 border rounded mt-4"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      <div className="flex gap-4 border-b mb-4">
        {['Overview', 'Projects', 'Feedback'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-medium ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow">
        {renderContent()}
      </div>
    </div>
  );
}
