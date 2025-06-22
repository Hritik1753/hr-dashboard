'use client';

import { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import useBookmarks from '../hooks/useBookmarks';
import SearchFilter from '../components/SearchFilter';
import toast from 'react-hot-toast';
import ThemeToggle from '@/components/ThemeToggle';
import Modal from '@/components/ui/Modal';

export default function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 6;

  const departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Design'];
  const addToBookmarks = useBookmarks((state) => state.addBookmark);
  const bookmarks = useBookmarks((state) => state.bookmarks);

  // 🔍 Search & Filter Logic
  const filterEmployees = ({ query, ratingFilter, departmentFilter }) => {
    let result = [...employees];
    if (query) {
      result = result.filter((emp) =>
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
        emp.email.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (departmentFilter) {
      result = result.filter((emp) => emp.department === departmentFilter);
    }
    if (ratingFilter) {
      result = result.filter((emp) => emp.performance == ratingFilter);
    }
    setFilteredEmployees(result);
  };

  // 🌐 Fetch Employees (Paginated)
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`);
      const data = await res.json();
      const enriched = data.users.map((user) => ({
        ...user,
        department: departments[Math.floor(Math.random() * departments.length)],
        performance: Math.floor(Math.random() * 5) + 1,
      }));
      setEmployees(enriched);
    }

    fetchUsers();
  }, [page]);

  const handleBookmark = (employee) => {
    addToBookmarks(employee);
  };

  const handlePromote = (employee) => {
    toast.success(`${employee.firstName} has been promoted!`);
  };

  // 👤 Add New User (via Modal)
  const handleCreateUser = (newUser) => {
    setEmployees((prev) => [{ ...newUser, id: Date.now(), performance: 3 }, ...prev]);
    setFilteredEmployees([]);
    toast.success(`User ${newUser.firstName} created!`);
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">📊 HR Dashboard</h1>
        <div className="flex gap-2">
          <ThemeToggle />
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ➕ Create User
          </button>
        </div>
      </div>

      <SearchFilter onSearch={filterEmployees} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {(filteredEmployees.length ? filteredEmployees : employees).map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            bookmarked={!!bookmarks.find((b) => b.id === emp.id)}
            onPromote={handlePromote}
            onBookmark={handleBookmark}
          />
        ))}
      </div>

      {/* 📄 Pagination Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          ⬅️ Prev
        </button>
        <span className="text-sm mt-1">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-300 text-black rounded"
        >
          Next ➡️
        </button>
      </div>

      {/* 🧾 Modal for Creating New User */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <CreateUserForm onCreate={handleCreateUser} onClose={() => setShowModal(false)} />
      </Modal>
    </main>
  );
}

// 👉 CreateUserForm inside same file or import
function CreateUserForm({ onCreate, onClose }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    department: 'Engineering',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.age || !form.phone) {
      toast.error('Please fill all fields');
      return;
    }
    onCreate(form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">🧍 Create New Employee</h2>
      {['firstName', 'lastName', 'email', 'phone', 'age'].map((field) => (
        <input
          key={field}
          type="text"
          placeholder={field}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          className="w-full border p-2 rounded"
        />
      ))}
      <select
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
        className="w-full border p-2 rounded"
      >
        {['HR', 'Engineering', 'Marketing', 'Sales', 'Design'].map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
