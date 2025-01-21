/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../../module/addRecipe/style.module.css";
import Button from "../../../components/base/Button/button";

const Form = ({
  contentImage,
  contentIngrediens,
  contentTitle,
  contentVideo,
  onSubmit,
  style,
  videos,
}) => {
  return (
    <>
      <main className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form onSubmit={onSubmit}>
                <div className={`${styles.bgUpload} card `} style={style}>
                  <div className="card-body">
                    <div className={`${styles.add}  text-center`}>
                      <p className="mt-5">Image</p>
                      <img src="../assets/image.png" alt="" />
                      {contentImage}
                    </div>
                  </div>
                </div>
                <div className="mb-3">{contentTitle}</div>
                <div className="mb-3">{contentIngrediens}</div>

                <div className="mb-3">
                  <label className={`${styles.videos} `}>Video</label>
                  {contentVideo}
                </div>
                <Button
                  className={`${styles.btnAdd} btn`}
                  type="submit"
                  title="Post"
                ></Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Form;
