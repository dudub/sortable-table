import { Link } from "../core/router/Router";
import "./IssueDetailsPage.css";
import type { DataItem } from "./TablePage";
import data from "../../data.json";

interface IssueDetailsPageProps {
  routeData: DataItem;
  params: Record<string, string>;
}

export function IssueDetailsPage({ routeData, params }: IssueDetailsPageProps) {
  const { id } = params;

  const issueData =
    routeData && Object.keys(routeData).length > 0
      ? routeData
      : data.find((item) => item.id.toString() === id);

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
          <h2>Issue - #{issueData.id}</h2>

          <ul>
            <li>
              <div className="list-item">
                <strong>Issue Type:</strong> {issueData.issueType}
              </div>
            </li>
            <li>
              <div className="list-item">
                <strong>Severity:</strong> {issueData.severity}
              </div>
            </li>
            <li>
              <div className="list-item">
                <strong>Component:</strong> {issueData.component}
              </div>
            </li>
            <li>
              <div className="list-item">
                <strong>Description:</strong> {issueData.description}
              </div>
            </li>
            <li>
              <div className="list-item">
                <strong>URL:</strong>{" "}
                <a
                  href={issueData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="url-link"
                >
                  {issueData.url}
                </a>
              </div>
            </li>
            <li>
              <div className="list-item column">
                <strong>Code Snippet:</strong>
                <pre>{issueData.codeSnippet}</pre>
              </div>
            </li>
            <li>
              <div className="list-item column">
                <strong>Selector:</strong>
                <pre>{issueData.selector}</pre>
              </div>
            </li>
            <li>
              <div className="list-item column">
                <strong>Screenshot:</strong>
                <img src={issueData.screenshot} alt="" width="100%" />
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div className="issue-details-content">
          <h1>Issue Details</h1>
          <div className="error-message">
            <p>Couldn't find the Issue information, please try again.</p>
            <p>Issue ID: {id}</p>
          </div>
        </div>
      )}
    </div>
  );
}
