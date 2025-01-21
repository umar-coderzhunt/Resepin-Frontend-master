import React from "react";
import styles from "../styles/titleLogin.module.css";
import Cover from "../components/module/login/cover";
import "bootstrap/dist/css/bootstrap.css";
import Title from "../components/base/TitleLogin/title";
import FormRegister from "../components/module/register/formRegister";
const Register = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row no-gutter">
          <Cover></Cover>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div
                    className={`${styles.formRegis} col-lg-10 col-xl-7 mx-auto `}
                  >
                    <Title
                      classNametitle={`${styles.start} display-4 text-center`}
                      title="Let’s Get Started !"
                      subTitle="Create new account to access all"
                      classNameSub={`${styles.subtitle} text-muted mb-4 text-center`}
                    ></Title>
                    <FormRegister></FormRegister>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
