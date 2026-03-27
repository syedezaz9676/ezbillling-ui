import React from 'react';
import './Skeleton.css';

const Skeleton = ({ variant = 'text', width, height, className = '' }) => {
  const style = {
    width: width || (variant === 'circular' ? '40px' : variant === 'rectangular' ? '100%' : 'auto'),
    height: height || (variant === 'circular' ? '40px' : variant === 'rectangular' ? '200px' : '1.2em'),
  };

  return (
    <div
      className={`skeleton skeleton-${variant} ${className}`}
      style={style}
    />
  );
};

// Predefined skeleton components
export const SkeletonText = ({ lines = 1, width }) => (
  <div className="skeleton-text">
    {Array.from({ length: lines }, (_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={width}
        className={index < lines - 1 ? 'mb-2' : ''}
      />
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 4 }) => (
  <div className="skeleton-table">
    {/* Table Header */}
    <div className="skeleton-table-header">
      {Array.from({ length: columns }, (_, index) => (
        <Skeleton key={`header-${index}`} variant="text" width="80%" />
      ))}
    </div>
    {/* Table Rows */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="skeleton-table-row">
        {Array.from({ length: columns }, (_, colIndex) => (
          <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" width="70%" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonCard = ({ showAvatar = true, lines = 3 }) => (
  <div className="skeleton-card">
    {showAvatar && <Skeleton variant="circular" width="48px" height="48px" />}
    <div className="skeleton-card-content">
      <Skeleton variant="text" width="60%" className="mb-2" />
      <SkeletonText lines={lines} />
    </div>
  </div>
);

export const SkeletonForm = ({ fields = 4 }) => (
  <div className="skeleton-form">
    {Array.from({ length: fields }, (_, index) => (
      <div key={`field-${index}`} className="skeleton-form-field">
        <Skeleton variant="text" width="30%" height="1em" className="mb-1" />
        <Skeleton variant="rectangular" height="40px" />
      </div>
    ))}
    <div className="skeleton-form-actions">
      <Skeleton variant="rectangular" width="120px" height="40px" />
      <Skeleton variant="rectangular" width="100px" height="40px" />
    </div>
  </div>
);

export default Skeleton;