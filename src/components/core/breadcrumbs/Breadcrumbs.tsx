import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

interface BreadcrumbLink {
  id: string;
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  links?: BreadcrumbLink[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ links }) => {
  if (!links || links.length === 0) return null;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb-list">
        {links.map((link, index) => (
          <li key={link.id} className="breadcrumb-item">
            <Link to={link.href}>{link.label}</Link>
            {index < links.length - 1 && <span>{'>'}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
