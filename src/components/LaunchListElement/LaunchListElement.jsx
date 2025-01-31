// LaunchListElement.js
import React, { useState } from 'react';

const LaunchListElement = ({ launch }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleViewClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="launch__item">
      <h2 className="launch__mission-name">
        {launch.mission_name}
        <span className={`launch__status--info ${
              launch.upcoming ? 'launch__upcoming-label--success' : 'launch__upcoming-label--info'
            }`}> Upcoming</span>
      </h2>
      <button className="launch__view-button btn btn--primary " onClick={handleViewClick}>
        {showDetails ? 'Hide' : 'View'}
      </button>
      {showDetails && (
        <div className="launch__details">
          <div className="launch__meta">
            <p>
              x Hours Ago | <a href={launch.links.video_link}> Video </a>
            </p>
          </div>
          <div className="container">
            <img src={launch.links.mission_patch_small} alt='Mission patch'></img>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchListElement;