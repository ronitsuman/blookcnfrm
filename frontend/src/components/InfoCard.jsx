import React from 'react';
import PropTypes from 'prop-types';

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105">
      <div className="mb-4 text-indigo-500">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

InfoCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default InfoCard;