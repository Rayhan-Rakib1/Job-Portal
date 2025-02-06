import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';

const JobApply = () => {

    const { user } = UseAuth();

    const { id } = useParams();
    const navigate = useNavigate();


    const handleJobApply = e => {
        e.preventDefault();

        const form = e.target;
        const resume = form.resume.value;
        const github = form.github.value;
        const linkedin = form.linkedin.value;

        const jobApplication = {
            jobId: id,
            applicant_email: user.email,
            resume, github, linkedin
        }

        fetch('https://job-portal-server-wheat.vercel.app/job-applications', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobApplication)
        })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    Swal.fire({
                        title: "Submit successfully!",
                        icon: "success",
                        draggable: true
                      });
                      navigate('/myApplication')
                }
            })
    }


    return (
        <div>
            <div className="hero bg-base-200 ">
                <div className="hero-content flex-col ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Apply now!</h1>

                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleJobApply} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Resume URL</span>
                                </label>
                                <input type="url" name='resume' placeholder="Resume URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Github URL</span>
                                </label>
                                <input type="url" name='github' placeholder="Github URL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">linkedin URL</span>
                                </label>
                                <input type="url" name='linkedin' placeholder="LInkedin URL" className="input input-bordered" required />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Apply</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApply;