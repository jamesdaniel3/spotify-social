import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ArtistList from './ArtistList';
import '../styles/tabbing.css';

function TabbingArtists(props) {
  return (
    <Tabs defaultActiveKey="fourweeks" className="tabbing">
      <Tab eventKey="fourweeks" title="last four weeks">
        <ArtistList data={props.short} />
      </Tab>
      <Tab eventKey="sixmonths" title="last six months">
        <ArtistList data={props.medium} />
      </Tab>
      <Tab eventKey="twelvemonths" title="last twelve months">
        <ArtistList data={props.long} />
      </Tab>
    </Tabs>
  );
}

export default TabbingArtists;
