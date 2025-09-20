import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" role="main" aria-labelledby="home-title">
      <h1 id="home-title">Home Page</h1>
      <p id="home-description">Welcome to the Sortable Table App</p>

      <div
        className="button-container"
        role="navigation"
        aria-label="Main navigation"
      >
        <button
          onClick={() => navigate('/issues')}
          className="navigate-button"
          aria-describedby="home-description"
          aria-label="Navigate to Issues Table page"
        >
          Go to Issues Table
        </button>
      </div>
    </div>
  );
};
