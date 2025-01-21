/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Footer from "../../components/base/footer/footer";
import Navbars from "../../components/base/navbar/navbar";
import Profils from "../../components/module/profil/profil";
import styles from "../../styles/addreceiped.module.css";
import axios from "axios";
import style from "../../components/module/profil/style.module.css";
import NavbarLogin from "../../components/base/navbarLogin/navbarLogin";

const About = ({ isAuth }) => {
  return (
    <>
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
            href="/home"
          ></NavbarLogin>
        </>
      )}
      <div>
        <main className="mt-5">
          <div className="container slide">
            <div className="row">
              <div className="col-lg-12">
                <div className={`${style.profil}`}>
                  <img
                    src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Kurt&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Pale"
                    alt=""
                    style={{ borderRadius: "50%" }}
                    className={`${style.profilImage} rounded mt-5`}
                  />
                  <p className={`${style.textProfil} text-center mt-3`}>
                    Hai Perkenalkan,
                  </p>
                  <p className={`${style.textProfil} text-center mt-3 mb-5`}>
                    <span>
                      saya Wahyu Dwi Purwanto <span>(Developer)</span>
                    </span>
                  </p>

                  <p className={`${style.textProfil} text-center mt-5`}>
                    Selamat Datang di aplikasi resepin
                  </p>
                  <p
                    className={`${style.textProfil} text-center text-secondary`}
                  >
                    Anda dapat melihat bahan, video tutorial. maupun mengupload
                    video tutorial. <span>Yukkss mulai upload !!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer></Footer>
    </>
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
export default About;
