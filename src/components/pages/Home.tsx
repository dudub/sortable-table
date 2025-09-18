import { useRouter } from "../core/router/hooks";

export function Home() {
  const { navigate } = useRouter();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      <p>Welcome to the Sortable Table App</p>

      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => navigate("/table", {})}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ffc107",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to Table with Data
        </button>
      </div>
    </div>
  );
}
