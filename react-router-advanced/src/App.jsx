import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost';
import ProtectedRoute from './components/ProtectedRoute';
import Details from './components/Details';
import Settings from './components/Settings';

function App() {
  const isAuthenticated = false; // Replace with real authentication logic

  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<h1>Welcome to the App</h1>} />

        {/* Protected Profile Route with Nested Routes */}
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="details" element={<Details />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Dynamic Blog Route */}
        <Route path="/blog/:postId" element={<BlogPost />} />

        {/* Catch-All Route */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;