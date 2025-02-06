import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const {
    title,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange = {},
    company,
    requirements = [],
    company_logo,
    description,
    _id,
  } = job || {};

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="flex">
        <figure>
          <img
            src={company_logo || '/path/to/default-logo.png'}
            alt={company || 'Company Logo'}
          />
        </figure>
        <div>
          <h2 className="text-2xl">{company}</h2>
          <p className="flex items-center">
            <IoLocationOutline /> {location || 'Location not available'}
          </p>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm">{description || 'No description available.'}</p>
        <div className="flex gap-3 flex-wrap">
          {requirements.length > 0 ? (
            requirements.map((skills, index) => (
              <p
                key={index}
                className="border rounded-lg p-1 hover:text-purple-600 hover:bg-gray-500"
              >
                {skills}
              </p>
            ))
          ) : (
            <p>No requirements listed.</p>
          )}
        </div>
        <div className="card-actions items-center justify-end mt-4">
          <p>
            Salary: $
            {salaryRange?.min || 'N/A'} - ${salaryRange?.max || 'N/A'}{' '}
            {salaryRange?.currency || ''}
          </p>
          <Link to={`/jobs/${_id}`}>
            <button className="btn btn-primary">Apply</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
