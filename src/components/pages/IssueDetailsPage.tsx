import React from 'react';
import type { DataItem } from './TablePage';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import data from '../../data.json';
import './IssueDetailsPage.css';

interface IssueDetailsPageProps {
  routeData: DataItem;
  params: Record<string, string>;
}

export const IssueDetailsPage: React.FC<IssueDetailsPageProps> = ({
  routeData,
  params,
}) => {
  const { id } = params;

  const issueData =
    routeData && Object.keys(routeData).length > 0
      ? routeData
      : data.find((item) => item.id.toString() === id);

  return (
    <div className="issue-details-container">
      <h1>Issue Details</h1>
      <Breadcrumbs
        links={[
          { label: 'Home', href: '/' },
          { label: 'Issues', href: `/issues?selectedId=${id}` },
          { label: `Issue #${id}`, href: `/issues/${id}` },
        ]}
      />

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
                <strong>URL:</strong>
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
};
