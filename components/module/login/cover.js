/* eslint-disable @next/next/no-img-element */

import React from 'react'
import style from './cover.module.css'
import "bootstrap/dist/css/bootstrap.css";
import background from '../../../public/assets/image 15.png'
const Cover = () => {
  return (
    <div
      className={`${style.bgimage} col-md-6 d-none d-md-flex d-flex flex-colum`}
    >
      <div className={`${style.bgcolor}`}>
        <img src="/assets/Group 697.png " className={style.logo} alt="" />
      </div>
    </div>
  );
}

export default Cover