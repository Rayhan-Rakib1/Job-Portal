import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplications = () => {
    const applications = useLoaderData();

    const handleStatusUpdate = (e, id) => {
        const data = {
            status:  e.target.value
        }
        fetch(`https://job-portal-server-wheat.vercel.app/job-applications/${id}`, {
            method: 'PATCH',
            headers : {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(data)

        })
        .then(res => res.json())
        .then(data => {
             if (data.modifiedCount) {
                      Swal.fire({
                        title: "Status has been updated successfully!",
                        icon: "success",
                        draggable: true
                      });
                    }
        })

        }
    return (
        <div>
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        applications.map((application, index) => <tr key={application._id}>
        <th>{index + 1}</th>
        <td>{application.applicant_email}</td>
        <td>Quality Control Specialist</td>
        <td>
        <select onChange={(e) => handleStatusUpdate(e, application._id)}  defaultValue={application.status || 'Change status'} className="select select-bordered select-xs w-full max-w-xs">
  <option disabled selected>Change status</option>
  <option>Under review</option>
  <option>Set interview</option>
  <option>rejected</option>
  <option>Hired</option>
</select>
        </td>
      </tr>)
      }
   
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ViewApplications;