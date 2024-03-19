/** @format */

import React, { useEffect } from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useState } from "react";
import AuthModal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reqLogout } from "../../redux/actions";
import AdminModal from "../admin-modal/adminModal";

import styles from "./header.module.scss";

function CustomHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [open1, setOpen1] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [open_admin_modal, setOpenAdmMod] = useState(false);
  const isAuth = useSelector((state) => state.login.isAuth);
  const name = useSelector((state) => state.auth.email);
  const key = useSelector((state) => state.auth.key);
  // useEffect(() => {
  //   console.log("key =", key);
  // }, [key]);

  const handleLogOut = () => {
    localStorage.setItem("token", null);
    window.location.replace("/");
    dispatch(reqLogout);
  };

  return (
    <Grid className={styles.header}>
      <Grid.Row
        className={styles.headerRow}
        verticalAlign={"middle"}
        centered
        columns={16}>
        <Grid.Column width={9} className={styles.logo}>
          <span onClick={() => navigate("/")}>Tripscanner</span>
        </Grid.Column>

        <Grid.Column width={5} className={styles.groupBtn1}>
          <Grid>
            <Grid.Row verticalAlign={"middle"} className={styles.groupBtnRow}>
              <Grid.Column
                width={8}
                textAlign={"right"}
                floated={"right"}
                className={styles.help}>
                <a href='#'>Help</a>
              </Grid.Column>

              <Grid.Column
                width={5}
                textAlign={"right"}
                className={styles.settingsBtn}>
                <Button className={styles.settings}>
                  English(UK) {getUnicodeFlagIcon("ua")} Ukraine $USD
                </Button>
              </Grid.Column>

              <Grid.Column width={3} textAlign={"right"}>
                {isAuth ? (
                  // <Button className={styles.login}>
                  <Dropdown text={name} className={styles.login1}>
                    <Dropdown.Menu>
                      <Dropdown.Item text='Profile' />
                      {key ? (
                        <Dropdown.Item
                          text='Admin Profile'
                          onClick={() => navigate("/admin-profile")}
                        />
                      ) : (
                        <Dropdown.Item
                          text='Get Admin'
                          onClick={() => setOpenAdmMod(true)}
                        />
                      )}
                      <Dropdown.Item
                        text='Log Out'
                        onClick={() => handleLogOut()}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  // </Button>
                  <Button
                    className={styles.login}
                    onClick={() => {
                      setOpen1(true);
                      setType("signin");
                    }}>
                    Log in
                  </Button>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <AuthModal setOpen1={setOpen1} open1={open1} type={type} />
          <AdminModal setOpenAdm={setOpenAdmMod} openAdm={open_admin_modal} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default CustomHeader;
