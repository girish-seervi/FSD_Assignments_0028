import React from 'react';

const StatisticsCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  iconBg = '#eef2ff',
  iconColor = '#6366f1'
}) => {
  return (
    <div className="stat-card">
      <div>
        <div className="stat-label">{title}</div>
        <div className="stat-value">{value}</div>
        {subtext && <div className="stat-subtext">{subtext}</div>}
      </div>
      {Icon && (
        <div
          className="stat-icon-wrapper"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;
