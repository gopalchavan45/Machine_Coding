import React, { useState } from "react";

const EnterpriseForm = () => {
  // 1. Dynamic Form Field Configuration
  // This defines the blueprint. To add a new field (e.g., 'department'), just add it here!
  const formFields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "e.g. John Doe",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "e.g. john@example.com",
    },
    {
      name: "role",
      label: "Job Role",
      type: "text",
      placeholder: "e.g. Frontend Engineer",
    },
    {
      name: "salary",
      label: "Expected Salary",
      type: "number",
      placeholder: "e.g. 75000",
    },
  ];

  // 2. State Management
  // Dynamically generate initial state object based on configuration keys
  const initialFormState = formFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submittedDataList, setSubmittedDataList] = useState([]);

  // 3. Handle Input Changes Dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for the field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

 
  // 4. Form Validation Logic
  const validateForm = () => {
    let newErrors = {};
    formFields.forEach((field) => {
      if (!formData[field.name].toString().trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 5. Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Create a new submission item with a unique ID and timestamp
    const newEntry = {
      id: Date.now(),
      ...formData,
      submittedAt: new Date().toLocaleTimeString(),
    };

    // Append to list, then reset form state
    setSubmittedDataList((prev) => [newEntry, ...prev]);
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dynamic Enterprise Form
        </h1>
        <p className="text-sm text-gray-500">
          Filled records render dynamically below upon submission.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {formFields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label
                htmlFor={field.name}
                className="text-sm font-semibold text-gray-700"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors[field.name]
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors[field.name] && (
                <span className="text-xs text-red-500 font-medium">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}

          {/* Submit Action spans full width on md screens */}
          <div className="md:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow transition-all text-sm"
            >
              Submit Record
            </button>
          </div>
        </form>
      </div>

      {/* Dynamic Submissions Feed */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Submitted Records ({submittedDataList.length})
        </h2>

        {submittedDataList.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            No records submitted yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                  {formFields.map((field) => (
                    <th key={field.name} className="p-3">
                      {field.label}
                    </th>
                  ))}
                  <th className="p-3">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {submittedDataList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {formFields.map((field) => (
                      <td key={field.name} className="p-3">
                        {field.name === "salary"
                          ? `$${Number(item[field.name]).toLocaleString()}`
                          : item[field.name]}
                      </td>
                    ))}
                    <td className="p-3 text-xs text-gray-400">
                      {item.submittedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterpriseForm;
