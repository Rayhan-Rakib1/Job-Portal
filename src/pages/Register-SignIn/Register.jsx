import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import RegisterAnimation from '../../assets/lottie.json';
import { AuthContext } from '../../context/AuthProvider';
import SocialLogin from '../Shared/SocialLogin';


const Register = () => {

  const {createUser} = useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    createUser(email, password)
    .then(res => {
      const user = res.user;
      console.log(user);
    })
    .catch(err => console.log(err.message))

  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left w-96">

            <Lottie animationData={RegisterAnimation}></Lottie>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <h className="text-5xl font-bold">Register now!</h>
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

export default Register;