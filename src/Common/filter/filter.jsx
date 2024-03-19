/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Grid, Icon, Dropdown } from "semantic-ui-react";
import styles from "./filter.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  reqGetFindedCitiesFrom,
  reqGetFindedCitiesTo,
} from "../../redux/search_actions";
import {
  UPDATE_SELECTION_FROM,
  UPDATE_SELECTION_TO,
} from "../../redux/redux-types";
import { reqGetAllClassesFlight } from "../../redux/classFlight_actions";
import { reqFindFlight } from "../../redux/flight_actoins";

const radioBtn = [
  {
    type: "radio",
    id: "both-way",
    name: "way",
    for: "both-way",
    content: "Roundtrip",
  },
  {
    type: "radio",
    id: "one-way",
    name: "way",
    for: "one-way",
    content: "One way",
  },
  {
    type: "radio",
    id: "complex-route",
    name: "way",
    for: "complex-route",
    content: "Multi-city",
  },
];

const Filter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosInstance = useSelector((state) => state.axios_instance.instance);

  const valueFrom = useSelector((state) => state.search.valueFrom);
  const valueTo = useSelector((state) => state.search.valueTo);

  const resultFrom = useSelector((state) => state.search.resultsFrom);
  const resultTo = useSelector((state) => state.search.resultsTo);

  const resAllClasses = useSelector((state) => state.classFlight.res);
  const [temp, setTemp] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const [selectedOptionFrom, setSelectedOptionFrom] = useState(null);
  const [selectedOptionTo, setSelectedOptionTo] = useState(null);
  const [selectedOptionClass, setSelectedOptionClass] = useState(null);

  const [resFromState, setResFromState] = useState([]);
  const [resToState, setResToState] = useState([]);

  const handleSearch = () => {
    let params = {
      from: selectedOptionFrom,
      to: selectedOptionTo,
      type: selectedOptionClass,
    };
    const allFieldsHaveValue = Object.values(params).every(
      (value) => value !== undefined && value !== null
    );

    if (axiosInstance && allFieldsHaveValue) {
      dispatch(reqFindFlight(axiosInstance, params));
    } else {
      console.log("error", params);
    }
  };

  useEffect(() => {
    // dispatch(reqGetAllClassesFlight(axiosInstance));
  }, [axiosInstance]);

  useEffect(() => {
    console.log("[resAllClasses]", resAllClasses);
  }, [resAllClasses]);

  useEffect(() => {
    setResFromState([]);
    setResFromState(resultFrom);
  }, [resultFrom]);

  useEffect(() => {
    setResToState([]);
    setResToState(resultTo);
  }, [resultTo]);

  useEffect(() => {
    if (!temp.length) return;
    dispatch(reqGetFindedCitiesFrom(axiosInstance, temp));
  }, [temp]);

  useEffect(() => {
    if (!searchTo.length) return;
    dispatch(reqGetFindedCitiesTo(axiosInstance, searchTo));
  }, [searchTo]);

  useEffect(() => {
    console.log("[selectedOptionFrom]", selectedOptionFrom);
    dispatch({
      type: UPDATE_SELECTION_FROM,
      selectionFrom: selectedOptionFrom,
    });
  }, [selectedOptionFrom]);

  useEffect(() => {
    dispatch({ type: UPDATE_SELECTION_TO, selectionTo: selectedOptionTo });
  }, [selectedOptionTo]);

  return (
    <Grid style={{ background: "#111236" }}>
      {/* <Grid.Row centered>
        <Grid.Column width={8} className={styles.radioBtnGroup}>
          {radioBtn.map((item) => (
            <div className={styles.filterGroup}>
              <input type={item.type} id={item.id} name={item.name} />
              <label className={styles.radioLabel} for={item.for}>
                {item.content}
              </label>
            </div>
          ))}
        </Grid.Column>
      </Grid.Row> */}

      <Grid.Row className={styles.block}>
        <Grid.Column width={4} className={styles.filter}>
          <p className={styles.label}>From</p>
          <Dropdown
            fluid
            placeholder='Country, city or airport'
            search
            selection
            defaultUpward
            options={resFromState}
            onChange={(e, data) => {
              let finded = resFromState.find((item) => {
                if (item.value === data.value) return item;
              });
              setSelectedOptionFrom(finded);
            }}
            onSearchChange={(e, data) => {
              setTemp(data.searchQuery);
              setResFromState([]);
            }}
            value={valueFrom?.value}
          />
        </Grid.Column>

        <Grid.Column width={4} className={styles.filter}>
          <p className={styles.label}>To</p>
          <Dropdown
            fluid
            placeholder='Country, city or airport'
            search
            selection
            defaultUpward
            options={resToState}
            onChange={(e, data) => {
              let finded = resToState.find((item) => {
                if (item.value === data.value) return item;
              });
              setSelectedOptionTo(finded);
            }}
            onSearchChange={(e, data) => {
              setSearchTo(data.searchQuery);
              setResToState([]);
            }}
            value={valueTo?.value}
          />
        </Grid.Column>

        <Grid.Column width={4} className={styles.filter}>
          <p className={styles.label}>Cabin Class & Travelers</p>
          <Dropdown
            fluid
            placeholder='Type'
            selection
            options={resAllClasses}
            onChange={(e, data) => {
              setSelectedOptionClass(data.value);
            }}
          />
        </Grid.Column>

        <Grid.Column width={4} className={styles.filter}>
          <Button
            className={styles.findBtn1}
            onClick={() => navigate("/flight-search")}
            icon
            labelPosition='right'>
            Search
            <Icon name='right arrow' className={styles.btnIcon} />
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Filter;
