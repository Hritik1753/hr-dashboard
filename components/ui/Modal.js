// components/ui/Modal.js
'use client';
import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
   <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        backdropFilter: 'blur(2px)', 
      }}
    >
      <div
        className="p-6 rounded-lg w-full max-w-md relative shadow-xl"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        <button
          className="absolute top-4 right-4 text-lg"
          onClick={onClose}
        >
          ❌
        </button>
        {children}
      </div>
    </div>
  );
}
