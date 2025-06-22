'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    async function fetchEmployee() {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();

      // Enrich with mock data
      const enriched = {
        ...data,
        performance: Math.floor(Math.random() * 5) + 1,
        pastPerformance: Array.from({ length: 5 }, (_, i) => ({
          year: 2019 + i,
          rating: Math.floor(Math.random() * 5) + 1,
        })),
      };

      setEmployee(enriched);
    }

    fetchEmployee();
  }, [id]);

  if (!employee) return <div className="p-6">Loading...</div>;

  const tabs = ['Overview', 'Projects', 'Feedback'];

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <img src={employee.image} alt={employee.firstName} className="w-32 h-32 rounded-full border" />
        <div>
          <h1 className="text-2xl font-bold">
            {employee.firstName} {employee.lastName}
          </h1>
          <p className="text-gray-500">{employee.company?.title} • {employee.company?.department}</p>
          <p>{employee.email}</p>
          <p>📞 {employee.phone}</p>
        </div>
      </div>

   <div
      className="mt-6 rounded-xl shadow p-6 space-y-4"
      style={{ backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
  >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p><strong>Age:</strong> {employee.age}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>
          <p><strong>Birth Date:</strong> {employee.birthDate}</p>
          <p><strong>Eye Color:</strong> {employee.eyeColor}</p>
          <p><strong>Height:</strong> {employee.height} cm</p>
          <p><strong>Weight:</strong> {employee.weight} kg</p>
          <p><strong>Blood Group:</strong> {employee.bloodGroup}</p>
        </div>

        <div>
          <h2 className="font-semibold mt-4 mb-2">📍 Address</h2>
          <p>
            {employee.address?.address}, {employee.address?.city}, {employee.address?.state} - {employee.address?.postalCode}, {employee.address?.country}
          </p>
        </div>

        <div>
          <h2 className="font-semibold mt-4 mb-2">🏢 Company Info</h2>
          <p>{employee.company?.name} - {employee.company?.title} ({employee.company?.department})</p>
        </div>

        <div>
          <h2 className="font-semibold mt-4 mb-2">💳 Bank Info</h2>
          <p>{employee.bank.cardType} - ****{employee.bank.cardNumber.slice(-4)} (Exp: {employee.bank.cardExpire})</p>
        </div>

        <div>
          <h2 className="font-semibold mt-4 mb-2">💰 Crypto Wallet</h2>
          <p>{employee.crypto.coin} on {employee.crypto.network}</p>
          <p className="break-all text-xs">{employee.crypto.wallet}</p>
        </div>

        <div>
          <h2 className="font-semibold mt-4 mb-2">⭐ Performance</h2>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < employee.performance ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            ))}
            <span className="ml-2 text-sm text-gray-500">(Current)</span>
          </div>

          <div className="mt-2 text-sm">
            <p className="font-medium">Past Ratings:</p>
            <ul className="list-disc pl-4">
              {employee.pastPerformance.map((p, i) => (
                <li key={i}>{p.year}: {p.rating} ★</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex gap-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1 rounded ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

    {/* Tab Content */}
 <motion.div
  key={activeTab}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
          <div className="text-sm border-t pt-4">
            {activeTab === 'Overview' && (
              <p>This is an overview tab. You can add charts, summaries, or team affiliations here.</p>
            )}
            {activeTab === 'Projects' && (
              <ul className="list-disc pl-5">
                <li>Project Phoenix – Lead Developer</li>
                <li>Sales Dashboard – Contributor</li>
              </ul>
            )}
            {activeTab === 'Feedback' && (
              <ul className="list-disc pl-5">
                <li>"Great team player!" - Manager</li>
                <li>"Excellent problem-solving skills." - Peer</li>
              </ul>
            )}
          </div>
  </motion.div>

        </div>
      </div>
    </main>
  );
}

