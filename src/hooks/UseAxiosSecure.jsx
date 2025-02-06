import axios from 'axios';
import { useEffect } from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    baseURL: 'https://job-portal-server-wheat.vercel.app',
    withCredentials: true
})
const UseAxiosSecure = () => {
    const { signOutUser } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response
        }, error => {
            console.log('error status', error.status);
            console.log('api response error status');
            if (error.status === 401 || error.status === 403) {
                signOutUser()
                    .then(() => {
                        navigate('/signIn')
                    })
                    .catch(error => console.log(error))
            }
            return Promise.reject(error)
        })
    }, [])

    return axiosInstance;
};

export default UseAxiosSecure;