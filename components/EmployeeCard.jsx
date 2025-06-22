'use client';

import React from 'react';
import Link from 'next/link';

export default function EmployeeCard({ employee, onBookmark, bookmarked = false, onPromote }) {
  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    age,
    department,
    performance,
    image,
  } = employee;

  return (
    <div className="p-4 border rounded-xl shadow-md bg-background text-foreground space-y-2 relative">
      {/* Top-right Image */}
      <img
        src={image || '/default-user.png'}
        alt={`${firstName} ${lastName}`}
        className="w-14 h-14 rounded-full object-cover absolute top-4 right-4 border"
      />

      {/* Info */}
      <h2 className="text-lg font-semibold">
        {firstName} {lastName}
      </h2>
      <p className="text-sm text-gray-500">{email}</p>
      <p className="text-sm">🎂 Age: {age}</p>
      <p className="text-sm">🗂 Dept: {department}</p>

      {/* Performance Stars */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < performance ? 'text-yellow-400' : 'text-gray-400'}>
            ★
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2 flex-wrap">
        <Link href={`/employee/${id}`}>
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            View
          </button>
        </Link>

        {bookmarked ? (
          <button
            disabled
            className="px-3 py-1 bg-gray-400 text-white rounded cursor-not-allowed"
          >
            Bookmarked
          </button>
        ) : (
          <button
            onClick={() => onBookmark(employee)}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Bookmark
          </button>
        )}

        <button
                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  onClick={()=> onPromote(employee)}
        >
          Promote
        </button>
      </div>
    </div>
  );
}

