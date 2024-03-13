import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/coups-de-coeur"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Coups de coeur <span>🩷</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <h1>React Movies</h1>
      <div className="empty"></div>
    </div>
  );
};

export default Header;
