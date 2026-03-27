import React from 'react';
import './EmptyState.css';

const EmptyState = ({
  icon = '📭',
  title = 'No Data Found',
  description = 'There are no items to display at the moment.',
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state-icon">
        {icon}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionText && onAction && (
        <button className="empty-state-action" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

// Predefined empty states for common scenarios
export const NoInvoicesEmptyState = ({ onAction }) => (
  <EmptyState
    icon="🧾"
    title="No Invoices Yet"
    description="You haven't created any invoices yet. Start by generating your first invoice."
    actionText="Generate Invoice"
    onAction={onAction}
  />
);

export const NoCustomersEmptyState = ({ onAction }) => (
  <EmptyState
    icon="👥"
    title="No Customers Found"
    description="You haven't added any customers yet. Add your first customer to get started."
    actionText="Add Customer"
    onAction={onAction}
  />
);

export const NoProductsEmptyState = ({ onAction }) => (
  <EmptyState
    icon="📦"
    title="No Products Available"
    description="You haven't added any products yet. Add your first product to start billing."
    actionText="Add Product"
    onAction={onAction}
  />
);

export const NoSearchResultsEmptyState = ({ searchTerm, onClear }) => (
  <EmptyState
    icon="🔍"
    title="No Results Found"
    description={`We couldn't find any results for "${searchTerm}". Try adjusting your search terms.`}
    actionText="Clear Search"
    onAction={onClear}
  />
);

export const NoDataEmptyState = ({ onRefresh }) => (
  <EmptyState
    icon="📊"
    title="No Data Available"
    description="There's no data to display right now. This could be because no records exist or data is still loading."
    actionText="Refresh"
    onAction={onRefresh}
  />
);

export default EmptyState;