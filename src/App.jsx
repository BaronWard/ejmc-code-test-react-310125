import React, { useState, useEffect, useCallback  } from 'react';
import LaunchList from './components/LaunchList';
import SearchBar from './components/SearchBar';
import launchService from './services/launchService';
import './assets/scss/styles.scss';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [launches, setLaunches] = useState([]); // Define setLaunches here
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const handleSearch = async (data) => {
    try {
        const searchResults = await launchService.searchLaunches(data);
        setSearchResults(searchResults);
    } catch (error) {
        console.error(error);
    }
};

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      try {
        const data = await launchService.fetchLaunches(offset);
        setLaunches((prevLaunches) => [...prevLaunches, ...data]); // Use setLaunches here
        setHasMore(data.length === 15);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLaunches();
  }, [offset]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.body.offsetHeight;

    if (scrollPosition >= documentHeight && !loading && hasMore) {
        setOffset((prevOffset) => prevOffset + 15);
    }
  }, [loading, hasMore, setOffset]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <LaunchList
        searchResults={searchResults}
        launches={launches}
        loading={loading}
        hasMore={hasMore}
      />
    </div>
  );
};

export default App;