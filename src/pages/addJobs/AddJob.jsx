import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";

const AddJob = () => {
  const navigate = useNavigate();

  const { user } = UseAuth();
  const handleAddJob = (event) => {
    event.preventDefault();
   

    const formData = new FormData(event.target);
    const initialData = Object.fromEntries(formData.entries());

    const { salaryMin, salaryMax, currency, ...newJob } = initialData;
    newJob.salaryRange = { salaryMin, salaryMax, currency };

    newJob.requirements = newJob.requirements.split(",");

    newJob.responsibilities = newJob.responsibilities.split(",");
    console.log(newJob);

    fetch('https://job-portal-server-wheat.vercel.app/jobs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            title: "Job added successfully!",
            icon: "success",
            draggable: true
          });
          navigate('/myPostedJobs');
        }
      })
  };

  return (
    <form
      onSubmit={handleAddJob}
      className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded-md space-y-6"
    >
      <h1 className="text-3xl font-semibold text-gray-700 mb-4">Create Job Posting</h1>

      {/* Job Title */}
      <div>
        <label htmlFor="title" className="block text-gray-600 font-medium mb-1">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          placeholder="e.g., Software Engineer"
          required
        />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-gray-600 font-medium mb-1">
          Job Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          placeholder="e.g., Halishohor, Chittagong"
          required
        />
      </div>

      {/* Job Type */}
      <div>
        <label htmlFor="jobType" className="block text-gray-600 font-medium mb-1">
          Job Type
        </label>
        <select
          id="jobType"
          name="jobType"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          required
        >
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-gray-600 font-medium mb-1">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          placeholder="e.g., Engineering"
          required
        />
      </div>

      {/* Application Deadline */}
      <div>
        <label htmlFor="applicationDeadline" className="block text-gray-600 font-medium mb-1">
          Application Deadline
        </label>
        <input
          type="date"
          id="applicationDeadline"
          name="applicationDeadline"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          required
        />
      </div>

      {/* Salary Range */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="salaryMin" className="block text-gray-600 font-medium mb-1">
            Minimum Salary
          </label>
          <input
            type="number"
            id="salaryMin"
            name="salaryMin"
            className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            placeholder="e.g., 40000"
            required
          />
        </div>
        <div>
          <label htmlFor="salaryMax" className="block text-gray-600 font-medium mb-1">
            Maximum Salary
          </label>
          <input
            type="number"
            id="salaryMax"
            name="salaryMax"
            className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            placeholder="e.g., 60000"
            required
          />
        </div>
        <div>
          <label htmlFor="currency" className="block text-gray-600 font-medium mb-1">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            required
          >
            <option value="bdt">BDT - Bangladeshi Taka</option>
            <option value="usd">USD - US Dollar</option>
            <option value="eur">EUR - Euro</option>
            <option value="inr">INR - Indian Rupee</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-gray-600 font-medium mb-1">
          Job Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          rows="4"
          placeholder="Write a brief job description..."
          required
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-gray-600 font-medium mb-1">
          Company Name
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          placeholder="e.g., Favorite IT"
          required
        />
      </div>

      {/* Company Logo */}
      <div>
        <label htmlFor="company_logo" className="block text-gray-600 font-medium mb-1">
          Company Logo URL
        </label>
        <input
          type="url"
          id="company_logo"
          name="company_logo"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          placeholder="e.g., https://example.com/logo.png"
          required
        />
      </div>

      {/* HR Name */}
      <div>
        <label htmlFor="hr_name" className="block text-gray-600 font-medium mb-1">
          HR Name
        </label>
        <input
          type="text"
          id="hr_name"
          name="hr_name"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          placeholder="e.g., Farhan Rahman"
          required
        />
      </div>

      {/* HR Email */}
      <div>
        <label htmlFor="hr_email" className="block text-gray-600 font-medium mb-1">
          HR Email
        </label>
        <input
          defaultValue={user.email}
          type="email"
          id="hr_email"
          name="hr_email"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          placeholder="e.g., hr@company.com"
          required
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-gray-600 font-medium mb-1">
          Job Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Responsibilities */}
      <div>
        <label htmlFor="responsibilities" className="block text-gray-600 font-medium mb-1">
          Responsibilities (Comma-separated)
        </label>
        <input
          type="text"
          id="responsibilities"
          name="responsibilities"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          placeholder="e.g., Develop software, Review code"
          required
        />
      </div>

      {/* Requirements */}
      <div>
        <label htmlFor="requirements" className="block text-gray-600 font-medium mb-1">
          Requirements (Comma-separated)
        </label>
        <input
          type="text"
          id="requirements"
          name="requirements"
          className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          placeholder="e.g., React, Node.js, MongoDB"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gray-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  );
};

export default AddJob;
