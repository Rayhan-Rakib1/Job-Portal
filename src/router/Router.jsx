import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../main/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register-SignIn/Register";
import SignIn from "../pages/Register-SignIn/SignIn";
import Details from "../pages/details/Details";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/jobApply/JobApply";
import MyApplications from "../pages/myApplication/MyApplications";
import AddJob from "../pages/addJobs/AddJob";
import MyPostedJobs from "../pages/myPostedJobs/MyPostedJobs";
import ViewApplications from "../pages/viewApplications/ViewApplications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>
      },
      {
        path: '/jobs/:id',
        element: <PrivateRoute><Details></Details></PrivateRoute>,
        loader: ({ params }) => fetch(`https://job-portal-server-wheat.vercel.app/jobs/${params.id}`)
      },
      {
        path: '/jobApply/:id',
        element: <PrivateRoute><JobApply></JobApply></PrivateRoute>,
      },
      {
        path: '/myApplication',
        element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>,
      },
      {
        path: '/addJob',
        element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
      },
      {
        path: '/myPostedJobs',
        element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
      },
      {
        path: '/viewApplications/:jobId',
        element: <PrivateRoute><ViewApplications></ViewApplications></PrivateRoute>,
        loader: ({params}) => fetch(`https://job-portal-server-wheat.vercel.app/job-applications/jobs/${params.jobId}`)
      }
    ]
  },
]);


export default router;