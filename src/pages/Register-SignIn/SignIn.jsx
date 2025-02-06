import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import SocialLogin from '../Shared/SocialLogin';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignIn = () => {

  const {signInUser, user}= useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';


  const handleSignIn = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
    .then(res => {
      const user1 = {email: res.user.email};
      axios.post('https://job-portal-server-wheat.vercel.app/jwt', user1, {withCredentials:true})
      .then(res => {
        console.log(res.data);
      })

      navigate(from)
     
    })
    .catch(err => console.log(err.message))
 
  }
    return (
      <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left w-96">

            <Lottie></Lottie>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSignIn} className="card-body">
              <h1 className="text-5xl font-bold">sign in now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email </span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <div className='divider'>OR</div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
    );
};

export default SignIn;