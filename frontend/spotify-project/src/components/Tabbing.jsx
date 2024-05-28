import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SongList from './SongList';
import '../styles/tabbing.css'

function Tabbing(props) {
  return (
    <Tabs
      defaultActiveKey="fourweeks"
      className="tabbing"
    >
      <Tab eventKey="fourweeks" title="last four weeks">
        <SongList data = {props.short}></SongList>
      </Tab>
      <Tab eventKey="sixmonths" title="last six months">
        <SongList data = {props.medium}></SongList>
      </Tab>
      <Tab eventKey="twelvemonths" title="last twelve months">
        <SongList data = {props.long}></SongList>
      </Tab>
    </Tabs>
  );
}

export default Tabbing;