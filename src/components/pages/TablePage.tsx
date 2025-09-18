import { Link } from '../core/router/Router';
import { useRouter } from '../core/router/hooks';


interface TablePageProps {
  routeData?: Record<string, any>;
}

export function TablePage({ routeData }: TablePageProps) {
  const { getParams } = useRouter();
  const urlParams = getParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Table Page</h1>
      
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          ← Back to Home
        </Link>
      </nav>

      {routeData && Object.keys(routeData).length > 0 && (
        <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
          <h3>Route Data:</h3>
          <pre style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(routeData, null, 2)}
          </pre>
        </div>
      )}

      {Object.keys(urlParams).length > 0 && (
        <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
          <h3>URL Parameters:</h3>
          <pre style={{ backgroundColor: '#cce7ff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(urlParams, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '4px' }}>
        <h3>Sample Table Data</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>ID</th>
              <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Status</th>
              <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>1</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>John Doe</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>Active</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>2024-01-15</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>2</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>Jane Smith</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>Inactive</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>2024-01-10</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>3</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>Bob Johnson</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>Active</td>
              <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>2024-01-12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
