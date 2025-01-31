import React from 'react';
import LaunchListElement from '../LaunchListElement/LaunchListElement';

const LaunchList = ({ searchResults, launches, loading, hasMore }) => {

  return (
    <div class="launch">
      <div class="launch__list launch__body launch__wrapper">
      {searchResults.length > 0 ? (
        searchResults.map((launch, index) => (
          <LaunchListElement key={index} launch={launch} />
        ))
      ) : (
        <>
          {launches.map((launch) => (
            <LaunchListElement key={launch.flight_number} launch={launch} />
          ))}
          {loading && <p>Loading...</p>}
          {!hasMore && <p>No more launches to load.</p>}
        </>
      )}
      </div>
    </div>
  );
};


export default LaunchList;