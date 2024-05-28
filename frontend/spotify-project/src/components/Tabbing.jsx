import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SongList from './SongList';
import '../styles/tabbing.css'
import ArtistList from './ArtistList';

function Tabbing(props) {
  return (
    <Tabs
      defaultActiveKey="fourweeks"
      className="tabbing"
    >
      <Tab eventKey="fourweeks" title="last four weeks">
        <SongList data = {props.short}></SongList>
        <ArtistList data={props.short}/>

      </Tab>
      <Tab eventKey="sixmonths" title="last six months">
        <SongList data = {props.medium}></SongList>
        <ArtistList data={props.medium} />

      </Tab>
      <Tab eventKey="twelvemonths" title="last twelve months">
        <SongList data = {props.long}></SongList>
        <ArtistList data={props.long} />

      </Tab>
    </Tabs>
  );
}

export default Tabbing;