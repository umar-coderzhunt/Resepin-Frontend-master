/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import Navbars from "../../components/base/navbar/navbar";
import Footer from "../../components/base/footer/footer";
import styles from "../../styles/addreceiped.module.css";
import style from "../../components/base/navbar/navbar.module.css";
import axios from "axios";
import Router from "next/router";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import Home from "../../components/module/homes/homes";
import Content from "../../components/module/homes/content";
import Logout from "../../components/base/Logout";
import Login from "../../components/base/Login";
import NavbarLogin from "../../components/base/navbarLogin/navbarLogin";

const Hom = ({ isAuth }) => {
  return (
    <div>
      {isAuth && (
        <>
          <Navbars
            classAdd={styles.navNon}
            classHome={styles.navActive}
            classProfil={styles.navNon}
          ></Navbars>
        </>
      )}
      {!isAuth && (
        <>
          <NavbarLogin
            classAdd={styles.navNon}
            classHome={styles.navActive}
            classProfil={styles.navNon}
            href="#resep"
          ></NavbarLogin>
        </>
      )}
      <Home></Home>
      <div id="resep">
        <Content></Content>
      </div>
      <Footer></Footer>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    let isAuth = false;

    if (context.req.headers.cookie) {
      isAuth = true;
    }
    const cookie = context.req.headers.cookie;
    console.log(isAuth);
    return {
      props: { isAuth },
    };
  } catch (error) {
    console.log(error);
  }
};
export default Hom;
