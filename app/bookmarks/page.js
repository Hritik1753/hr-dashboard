'use client';

import useBookmarks from '../../hooks/useBookmarks';
import { useState } from 'react';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [message, setMessage] = useState('');

  const handlePromote = (employee) => {
    console.log(`${employee.firstName} promoted!`);
    setMessage(`🎉 ${employee.firstName} has been promoted!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAssign = (employee) => {
    console.log(`${employee.firstName} assigned to new project.`);
    setMessage(`📌 ${employee.firstName} assigned to a project.`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📌 Bookmarked Employees</h1>

      {message && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
          {message}
        </div>
      )}

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((emp) => (
            <div
              key={emp.id}
              className="p-4 border rounded-xl shadow-md bg-background text-foreground space-y-2"
            >
              <h2 className="text-lg font-semibold">
                {emp.firstName} {emp.lastName}
              </h2>
              <p className="text-sm">{emp.email}</p>
              <p className="text-sm">Age: {emp.age}</p>
              <p className="text-sm">Dept: {emp.department}</p>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < emp.performance ? 'text-yellow-400' : 'text-gray-400'}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => removeBookmark(emp.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
                <button
                  onClick={() => handlePromote(emp)}
                  className="px-3 py-1 bg-purple-600 text-white rounded"
                >
                  Promote
                </button>
                <button
                  onClick={() => handleAssign(emp)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Assign to Project
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
