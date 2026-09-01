import React, { useState, useEffect } from "react";

const data = [
  { id: 1, name: "Item 1", age: 25, email: "item1@example.com", mobile: "1234567890", salary: 50000 },
  { id: 2, name: "Item 2", age: 30, email: "item2@example.com", mobile: "0987654321", salary: 60000 },
  { id: 3, name: "Item 3", age: 35, email: "item3@example.com", mobile: "1234567890", salary: 70000 },
  { id: 4, name: "Item 4", age: 40, email: "item4@example.com", mobile: "0987654321", salary: 80000 },
  { id: 5, name: "Item 5", age: 45, email: "item5@example.com", mobile: "1234567890", salary: 90000 },
  { id: 6, name: "Item 6", age: 50, email: "item6@example.com", mobile: "0987654321", salary: 100000 },
  { id: 7, name: "Item 7", age: 55, email: "item7@example.com", mobile: "1234567890", salary: 110000 },
  { id: 8, name: "Item 8", age: 60, email: "item8@example.com", mobile: "0987654321", salary: 120000 },
  { id: 9, name: "Item 9", age: 65, email: "item9@example.com", mobile: "1234567890", salary: 130000 },
  { id: 10, name: "Item 10", age: 70, email: "item10@example.com", mobile: "0987654321", salary: 140000 },
  { id: 11, name: "Item 11", age: 75, email: "item11@example.com", mobile: "1234567890", salary: 150000 },
  { id: 12, name: "Item 12", age: 80, email: "item12@example.com", mobile: "0987654321", salary: 160000 },
  { id: 13, name: "Item 13", age: 85, email: "item13@example.com", mobile: "1234567890", salary: 170000 },
  { id: 14, name: "Item 14", age: 90, email: "item14@example.com", mobile: "0987654321", salary: 180000 },
  { id: 15, name: "Item 15", age: 95, email: "item15@example.com", mobile: "1234567890", salary: 190000 },
];

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const itemPerPage = 3;

  // Proper Debounce Implementation using useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      // setCurrentPage(1); // Reset to page 1 whenever search changes
    }, 300);

    return () => clearTimeout(timer); // Cleanup previous timer on keystroke
  }, [searchTerm]);

  // 1. Filter data based on debounced search term
  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    item.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // 2. Calculate pagination metrics based on FILTERED data
  const totalPages = Math.ceil(filteredItems.length / itemPerPage) || 1;
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex); // Slicing filtered items!

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl text-gray-800 font-bold mb-5">Search & Pagination</h1>
      
      {/* Search Input */}
      <div className="mt-3 mb-4">
        <label htmlFor="search" className="mr-2 font-medium text-gray-700">Search : </label>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          id="search"
          placeholder="Search by name or email..."
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white text-sm uppercase tracking-wider">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Age</th>
              <th className="p-3">Email</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Salary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-600">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-900">{item.id}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.age}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.mobile}</td>
                  <td className="p-3">${item.salary.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          className="py-1.5 px-3 rounded text-white bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isActive = currentPage === page;

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`py-1 px-3 rounded text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          className="py-1.5 px-3 rounded text-white bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;