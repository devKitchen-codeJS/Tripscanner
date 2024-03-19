/** @format */

import React from "react";
import styles from "./flight-durance.module.scss";
import flightSvg from "../../static/flight.svg";
import { Grid } from "semantic-ui-react";
import { animated, useSpring } from "@react-spring/web";
const FlightDurance = (obj1) => {
  const obj = obj1.obj;
  const springs = useSpring({
    from: { x: 0, opacity: 0, y: 5, transform: `scale(0.5)` },
    to: { x: 130, opacity: 1, y: 5, transform: `scale(1.5)` },
    config: {
      mass: 2,
      friction: 50,
      tension: 50,
    },
  });

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16} className={styles.row1}>
          <Grid>
            <Grid.Row className={styles.row2}>
              <Grid.Column className={styles.outbound} width={4}>
                <div>
                  <span className={styles.flightTo}>{obj.outbound.from}</span>
                  <span className={styles.countryName}>{obj.name_from}</span>
                </div>
              </Grid.Column>
              <Grid.Column className={styles.animate} width={8}>
                <div className={styles.f}>
                  <animated.div
                    style={{ ...springs }}
                    className={styles.flightsvg}>
                    <img src={flightSvg} />
                  </animated.div>

                  <div className={styles.divider} />
                </div>
                <span className={styles.time_flight}>
                  {obj.outbound.total_time}
                </span>
              </Grid.Column>
              <Grid.Column className={styles.arrive} width={4}>
                <div>
                  <span className={styles.flightFrom}>{obj.outbound.to}</span>
                  <span className={styles.countryName}>{obj.name_to}</span>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FlightDurance;
