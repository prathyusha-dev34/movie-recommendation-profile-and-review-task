import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">🏠 Home</Link>
      <Link to="/search">🔍 Search</Link>
      <Link to="/favorites">💖 Favorites</Link>
      <Link to="/history">🕒 History</Link>
      <Link to="/watched">✅ Watched</Link>
      <Link to="/profile">👤 Profile</Link>
    </div>
  );
}

export default Sidebar;