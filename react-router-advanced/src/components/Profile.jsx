import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Details from './Details';
import Settings from './Settings';

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
      <Link to="details" activeClassName="active-link">Profile Details</Link> 
      <Link to="settings" activeClassName="active-link">Profile Settings</Link>
      </nav>

      {/* Outlet for future nested routes */}
      <Outlet />
    </div>
  );
};

export default Profile;