import { Link } from "../core/router/Router";
import { useRouter } from "../core/router/hooks";
import "./TablePage.css";

export function TablePage() {
  const { getParams } = useRouter();
  const urlParams = getParams();

  return (
    <div className="table-page-container">
      <h1>Table Page</h1>

      <nav className="table-nav">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </nav>

      {/*{routeData && Object.keys(routeData).length > 0 && (*/}
      {/*  <div className="info-card">*/}
      {/*    <h3>Route Data:</h3>*/}
      {/*    <pre className="code-block">{JSON.stringify(routeData, null, 2)}</pre>*/}
      {/*  </div>*/}
      {/*)}*/}

      {Object.keys(urlParams).length > 0 && (
        <div className="params-card">
          <h3>URL Parameters:</h3>
          <pre className="params-code-block">
            {JSON.stringify(urlParams, null, 2)}
          </pre>
        </div>
      )}

      <div className="table-card">
        <h3>Sample Table Data</h3>
        <table className="data-table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">ID</th>
              <th className="table-cell">Name</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Created</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-cell">1</td>
              <td className="table-cell">John Doe</td>
              <td className="table-cell">Active</td>
              <td className="table-cell">2024-01-15</td>
            </tr>
            <tr>
              <td className="table-cell">2</td>
              <td className="table-cell">Jane Smith</td>
              <td className="table-cell">Inactive</td>
              <td className="table-cell">2024-01-10</td>
            </tr>
            <tr>
              <td className="table-cell">3</td>
              <td className="table-cell">Bob Johnson</td>
              <td className="table-cell">Active</td>
              <td className="table-cell">2024-01-12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
