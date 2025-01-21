import React from 'react'
import styles from './style.module.css'
import "bootstrap/dist/css/bootstrap.css";
const Footer = () => {
    return (
      <>
        <footer className="py-3 bg-warning mt-5 footer-dekstop">
          <div className="container">
            <h1 className="m-0 text-center text-white">Eat, Cook, Repeat</h1>
          </div>
          <div className="container">
            <p className="m-0 mt-5 text-center text-white">
              Share your best recipe by uploading here !
            </p>
          </div>
          <div className={`${styles.product} container`}>
            <a href="" className="m-0 text-center text-white ">
              Product
            </a>
            <a href="" className="m-0 text-center text-white ms-3">
              Company
            </a>
            <a href="" className="m-0 text-center text-white ms-3">
              Learn more{" "}
            </a>
            <a href="" className="m-0 text-center text-white ms-3">
              {" "}
              Get in touch
            </a>
          </div>
        </footer>
      </>
    );
}

export default Footer