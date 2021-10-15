import React from 'react';

import { BottomNavigation } from '../../components/BottomNavigation/BottomNavigation';

type SearchPageProps = {};

export const SearchPage: React.FC<SearchPageProps> = (props) => {
  function handleSubmit() {}

  function handleBottomNavChanged() {}

  return (
    <div className="search-page">
      <div className="search-page__footer">
        <BottomNavigation value={"search"} onChange={handleBottomNavChanged} />
      </div>
    </div>
  );
};
