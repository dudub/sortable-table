import { useRouter } from "../core/router/hooks";
import "./Home.css";

export function Home() {
  const { navigate } = useRouter();

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <p>Welcome to the Sortable Table App</p>

      <div className="button-container">
        <button
          onClick={() => navigate("/table", {})}
          className="navigate-button"
        >
          Go to Table with Data
        </button>
      </div>
    </div>
  );
}
