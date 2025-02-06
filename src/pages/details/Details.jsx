import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Details = () => {
    const job= useLoaderData();
    const {title, location, jobType, category, applicationDeadline, salaryRange, company, requirements, company_logo, description, _id,} = job;
    return (
        <div className='m-10'>
            <h1>{company}</h1>
            <h2>{jobType}</h2>
            <p>deadline: {applicationDeadline}</p>
       <Link to={`/jobApply/${_id}`}>
       <button className='btn btn-primary'>Apply</button></Link>
        </div>
    );
};

export default Details;