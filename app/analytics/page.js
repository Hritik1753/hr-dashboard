'use client';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import useBookmarks from '../../hooks/useBookmarks';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

export default function AnalyticsPage() {
  const { bookmarks } = useBookmarks();

  const [departmentData, setDepartmentData] = useState({
    labels: [],
    datasets: [],
  });

  const [bookmarkTrendData, setBookmarkTrendData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch all employees and calculate department-wise ratings
    const fetchEmployees = async () => {
      const res = await fetch('https://dummyjson.com/users?limit=20');
      const json = await res.json();
      const users = json.users;

      // Add random performance rating (1 to 5)
      const usersWithRatings = users.map((u) => ({
        ...u,
        performance: Math.floor(Math.random() * 5) + 1,
      }));

      // Group by department
      const departmentMap = new Map();
      for (const user of usersWithRatings) {
        const dept = user.company?.department || 'Unknown';
        if (!departmentMap.has(dept)) {
          departmentMap.set(dept, []);
        }
        departmentMap.get(dept).push(user.performance);
      }

      const labels = Array.from(departmentMap.keys());
      const data = labels.map((dept) => {
        const scores = departmentMap.get(dept);
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        return avg.toFixed(2);
      });

      setDepartmentData({
        labels,
        datasets: [
          {
            label: 'Avg Performance Rating',
            data,
            backgroundColor: '#3b82f6',
          },
        ],
      });
    };

    fetchEmployees();

    // Mock Bookmark Trend Chart (Last 7 Days)
    const days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    });

    const trendData = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * (bookmarks.length + 2))
    );

    setBookmarkTrendData({
      labels: days,
      datasets: [
        {
          label: 'Bookmarks over time (mock)',
          data: trendData,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    });
  }, [bookmarks]);

 return (
  <div className="p-6 space-y-10 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold text-center">📊 Analytics Dashboard</h1>

    <div className="grid gap-10 md:grid-cols-2">
      {/* Department Ratings */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">📌 Avg Rating by Department</h2>
        <div className="w-full h-64">
          {departmentData.labels.length ? (
            <Bar data={departmentData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <p className="text-gray-500">Loading department analytics...</p>
          )}
        </div>
      </div>

      {/* Bookmark Trends */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4 text-green-600">📈 Bookmark Trends</h2>
        <div className="w-full h-64">
          {bookmarkTrendData.labels.length ? (
            <Line data={bookmarkTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <p className="text-gray-500">Loading bookmark trend...</p>
          )}
        </div>
      </div>
    </div>
  </div>
);
}