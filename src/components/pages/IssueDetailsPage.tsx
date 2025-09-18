import { Link } from "../core/router/Router";
import "./IssueDetailsPage.css";

interface IssueDetailsPageProps {
  routeData: any;
  params: Record<string, string>;
}

export function IssueDetailsPage({ routeData, params }: IssueDetailsPageProps) {
  const { id } = params;

  const issueData =
    routeData && Object.keys(routeData).length > 0 ? routeData : null;

  return (
    <div className="issue-details-container">
      <h1>Issue Details</h1>
      <nav className="issue-details-nav">
        <Link to={`/table?selectedId=${id}`} className="back-link">
          ← Back to Table
        </Link>
      </nav>

      {issueData ? (
        <div className="issue-details-content">
          <h1>Issue Details - #{issueData.id}</h1>

          <div className="json-display">
            <pre>{JSON.stringify(issueData, null, 2)}</pre>
          </div>
        </div>
      ) : (
        <div className="issue-details-content">
          <h1>Issue Details</h1>
          <div className="error-message">
            <p>Couldn't find the information to present</p>
            <p>Issue ID: {id}</p>
          </div>
        </div>
      )}
    </div>
  );
}
