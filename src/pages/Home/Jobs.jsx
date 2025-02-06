import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('https://job-portal-server-wheat.vercel.app/jobs')
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [])

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                {
                    jobs.map(job => <JobCard key={job._id} job={job}></JobCard>)
                }
            </div>
        </div>
    );
};

export default Jobs;