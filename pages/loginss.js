import React from 'react'
import styles from "../styles/titleLogin.module.css";
import Cover from '../components/module/login/cover'
import Form from '../components/module/login/form'
import "bootstrap/dist/css/bootstrap.css";
import Title from '../components/base/TitleLogin/title';
const Login = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row no-gutter">
          <Cover></Cover>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <Title
                      classNametitle={`${styles.welcome} display-4 text-center`}
                      title="welcome"
                      subTitle="Log in into your exiting account"
                      classNameSub={`${styles.subtitle} text-muted mb-4 text-center`}
                    ></Title>
                    <Form></Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;