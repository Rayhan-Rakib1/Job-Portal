import React, { useEffect, useState } from 'react';
import UseAuth from '../../hooks/UseAuth';
import { Link } from 'react-router-dom';

const MyPostedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const {user} = UseAuth ();

    useEffect(() => {
        fetch(`https://job-portal-server-wheat.vercel.app/jobs?email=${user.email}`)
        .then(res => res.json())
        .then(data => setJobs(data))
    }, [])

    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Job title</th>
        <th>Deadline</th>
        <th>Application count</th>
        <th>Application</th>

      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        jobs.map((job, index) => <tr className="bg-base-200">
        <th>{index + 1}</th>
        <td>{job.title}</td>
        <td>{job.applicationDeadline}</td>
        <td>{job.applicationCount}</td>
        <td>
          <Link to={`/viewApplications/${job._id}`}>
          <button className='btn btn-link'>View applications</button></Link>
        </td>
      </tr>)
      }
     
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyPostedJobs;