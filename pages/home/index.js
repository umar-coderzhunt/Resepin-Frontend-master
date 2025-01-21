/* eslint-disable @next/next/no-img-element */
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbars from "../../components/base/navbar/navbar";
import Footer from "../../components/base/footer/footer";
import styles from "../../styles/addreceiped.module.css";
import Home from "../../components/module/homes/homes";
import Content from "../../components/module/homes/content";
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
