/** @format */

import React, { useState } from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Accordion } from "semantic-ui-react";
import { Airlines } from "../../mock/mockdata";

import styles from "./filter_flight_search.module.scss";

const FilterSearch = () => {
  const [openStops, setOpenStops] = useState(true);
  const [airlines, setAirlines] = useState(true);
  const [greener, setGreener] = useState(true);

  return (
    <Accordion fluid>
      <Accordion.Title
        className={styles.titleStops}
        onClick={() => setOpenStops(!openStops)}>
        Stops
        <Icon name='dropdown' />
      </Accordion.Title>

      <Accordion.Content active={openStops}>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={16}>
              <div className={styles.nonStop}>
                <label className={styles.label1}>
                  <input type={"checkbox"} className={styles.customCheckbox} />
                  <span>Non-stop</span>
                  <span className={styles.price}>from 8,163 грн.</span>
                </label>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className={styles.rowOneStop}>
            <Grid.Column>
              <div className={styles.oneStop}>
                <label className={styles.label1}>
                  <input type={"checkbox"} className={styles.customCheckbox} />
                  <span>1 stop</span>
                  <span className={styles.price}>from 8,163 грн.</span>
                </label>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className={styles.rowTowStop}>
            <Grid.Column>
              <div className={styles.twoStop}>
                <label className={styles.label1}>
                  <input type={"checkbox"} className={styles.customCheckbox} />
                  <span>2+ stops</span>
                  <span className={styles.price}>from 8,163 грн.</span>
                </label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Accordion.Content>

      <Accordion.Title
        className={styles.titleAirlines}
        onClick={() => setAirlines(!airlines)}>
        Airlines
        <Icon name='dropdown' />
      </Accordion.Title>

      <Accordion.Content active={airlines}>
        <Grid>
          <Grid.Row className={styles.rowF1}>
            <Grid.Column width={16} className={styles.filterOption}>
              <span className={styles.selctAll}>Select all</span>
              <div className={styles.divider} />
              <span className={styles.clearAll}>Clear all</span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} className={styles.airlineOption}>
              <span>Star Alliance</span>
              <span>SkyTeam</span>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {Airlines.map((item) => (
          <div className={styles.airlines}>
            <input type={"checkbox"} className={styles.customCheckbox} />
            <span className={styles.nameAirline}>{item.name}</span>
            <span className={styles.priceAirline}>from {item.price}</span>
          </div>
        ))}
      </Accordion.Content>

      <Accordion.Title
        className={styles.titleGreenFlights}
        onClick={() => setGreener(!greener)}>
        Greener flights
        <Icon name='dropdown' />
      </Accordion.Title>

      <Accordion.Content active={greener} className={styles.greenChoise}>
        <input type={"checkbox"} className={styles.customCheckbox} />
        <div className={styles.greenerT}>
          <span>Only show flights with lower CO₂ emissions</span>
        </div>
      </Accordion.Content>
    </Accordion>
  );
};

export default FilterSearch;
