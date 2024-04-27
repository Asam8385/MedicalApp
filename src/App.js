import { createContext } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import AdminAppointments from './components/Admin/Appointments/Appointments';
import Doctors from './components/Admin/Doctors/Doctors';
import UnDoctors from './components/Admin/Doctors/UnverifiedDoctors';
import Patients from './components/Admin/Patients/Patients';
import Profile from './components/Admin/Profile/Profile';
import Transactions from './components/Admin/Transactions/Transactions';
import Specialites from './components/Admin/Specialites/Specialites';
import AdminReviews from './components/Admin/Reviews/Reviews';

const router = createBrowserRouter([
  { path: '/', element: <AdminDashboard /> },

  // Dashboard
  { path: '/admin/dashboard', element: <AdminDashboard /> },
  { path: '/admin/appointments', element: <AdminAppointments /> },
  { path: '/admin/doctors', element: <Doctors /> },
  { path: '/admin/undoctors', element: <UnDoctors /> },
  { path: '/admin/patients', element: <Patients /> },
  { path: '/admin/profile', element: <Profile /> },
  { path: '/admin/reviews', element: <AdminReviews /> },
  { path: '/admin/transaction', element: <Transactions /> },
  { path: '/admin/specialites', element: <Specialites /> },

  // { path: '/appointment', element: <PrivateRoute><AppointMent /></PrivateRoute> },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
