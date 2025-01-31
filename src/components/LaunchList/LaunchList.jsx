// src/views/LaunchList/LaunchList.js
import React, { useState, useEffect } from 'react';
import launchService from '../../services/launchService';
import LaunchListElement from '../../components/LaunchListElement/LaunchListElement';
import Spinner from '../../components/Spinner/Spinner';
import SearchBar from '../../components/SearchBar/SearchBar';

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setQuery] = useState('');

  const loadLaunches = async () => {
    setLoading(true);
    try {
      const newLaunches = await launchService.fetchLaunches(offset, 10);
      setLaunches((prev) => [...prev, ...newLaunches]);
      setFilteredLaunches((prev) => [...prev, ...newLaunches]);
      setHasMore(newLaunches.length > 0);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLaunches();
  }, [offset]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setOffset((prev) => prev + 10);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const handleSearchSubmit = () => {
    console.log('handleSearchSubmit called');
    const query = searchQuery;
    const filtered = launches.filter((launch) =>
      launch.mission_name.toLowerCase().includes(query.toLowerCase())
    );
    console.log('filtered:', filtered);
    setFilteredLaunches(filtered);
  };

  return (
    <div className="launch">
      <SearchBar onSearch={handleSearchSubmit} />
      <div className="launch__list">
        {filteredLaunches.map((launch) => (
          <LaunchListElement key={launch.id} launch={launch}/>
        ))}
        {loading && <Spinner />}
        {!hasMore && <div className="max-reached">No more launches to load</div>}
        {filteredLaunches.length === 0 && !loading && (
          <div className="no-content">No launches found.</div>
        )}
      </div>
    </div>
  );
};

export default LaunchList;