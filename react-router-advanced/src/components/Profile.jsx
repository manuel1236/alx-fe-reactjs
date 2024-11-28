import { NavLink, Outlet } from 'react-router-dom';

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <NavLink
          to="details"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Profile Details
        </NavLink>{' '}
        |{' '}
        <NavLink
          to="settings"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Profile Settings
        </NavLink>
      </nav>

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Profile;