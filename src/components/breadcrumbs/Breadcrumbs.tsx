import React from 'react';
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
            <a href={link.href}>{link.label}</a>
            {index < links.length - 1 && <span>{'>'}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
