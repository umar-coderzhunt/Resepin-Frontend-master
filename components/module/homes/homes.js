/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useSelector } from "react-redux";;

const Home = ({ resep, name, resepin }) => {
  const { user } = useSelector((state) => state.auths);
  console.log(resepin);
  return (
    <div>
      <main className="mt-5">
        <div className="row">
          <div className={`${styles.pageTitle} col-lg-4 `}>
            {user.name && <h5>Selamat Datang {user.name}</h5>}
            <h3 className={`${styles.titlePage}`}>
              Discover Recipe & Delicious Food
            </h3>
            <form className={`${styles.search} d-flex mt-3 `} role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
          <div className="col-lg-6">
            <div className={`${styles.latar}  float-end`}></div>
            <img
              src="/assets/Rectangle 313.png"
              className={`${styles.imagePage} `}
              height="500px"
              alt=""
            />
          </div>
        </div>
        <div className="row">
          <div className={`${styles.popular} col-lg-4 `}>
            <h4 className="mt-3">Popular For You !</h4>
          </div>
        </div>
        <div className="row">
          <div className={`${styles.imageTwo} col-lg-4 `}>
            <img src="/assets/Rectangle 313 (1).png" height="400px" alt="" />
            <div className={`${styles.garisTwo}`}></div>
          </div>
          <div className={`${styles.pageTitle} col-lg-4  `}>
            <h4 className={`${styles.slide}`}>
              Healthy Bone Broth Ramen (Quick & Easy)
            </h4>
            <hr />
            <p className={`${styles.subTitle}`}>
              Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a
              hurry? That’s right!
            </p>
            <button className={`${styles.btnMore} btn `}>Learn More</button>
          </div>
        </div>
        <div className="row">
          <div className={`${styles.popularTwo} col-lg-4 `}>
            <h4 className="mt-3">New Recipe !</h4>
          </div>
        </div>
        <div className="row mt-5">
          <div className={`${styles.bag} col-lg-2 `}></div>
          <div className={`${styles.imageThere} col-lg-4 `}>
            <img src="/assets/Rectangle 313 (2).png" height="400px" alt="" />
          </div>
          <div className={`${styles.pageTitle} col-lg-4 `}>
            <h4 className={`${styles.slide}`}>
              Healthy Bone Broth Ramen (Quick & Easy)
            </h4>
            <hr />
            <p className={`${styles.subTitle}`}>
              Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a
              hurry? That’s right!
            </p>
            <button className={`${styles.btnMore} btn `}>Learn More</button>
          </div>
        </div>
        <div className="row">
          <div className={`${styles.popularTwo} col-lg-4 `}>
            <h4 className="mt-3">Popular Recipe</h4>
          </div>
        </div>
      </main>
    </div>
  );
};


export async function getServerSideProps(context) {
  const { data: RespData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/food`
  );
  console.log(RespData)
  const name = "wahyu";
  console.log(name)
  return {
    props: {
      name: name,
      resep: RespData.data,
    },
  };
}

Home.getInitialProps = async (ctx) => {
  const { data: RespData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/food`,
  );
  // console.log(RespData);
  return { resepin: RespData.data };
};
export default Home;
