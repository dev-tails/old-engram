import React from 'react';
import { Link } from 'react-router-dom';

type HelpPageProps = {};

export const HelpPage: React.FC<HelpPageProps> = (props) => {
  return (
    <div className="help-page">
      <div className="container" style={{ marginTop: 64 }}>
        <Link to={"/help/zapier"}>Zapier</Link>
      </div>
    </div>
  );
};
