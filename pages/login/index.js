import React, { useState } from "react";
import styles from "../../styles/titleLogin.module.css";
import Cover from "../../components/module/login/cover";
import Form from "../../components/module/login/form";
import "bootstrap/dist/css/bootstrap.css";
import Title from "../../components/base/TitleLogin/title";
import Link from "next/link";
import axios from "axios";
import Button from "../../components/base/Button/button";
import style from "../../components/module/login/form.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    console.log("user", user, process.env.NEXT_PUBLIC_API_URL);

    try {

      setLoading(true);
      const config = {
        withCredentials: true,
      };
      const result = await axios.post(
        ` ${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        user
        // config
      );
      console.log(result);
      const token = result.data.data.token;
      const data = {
        token: token,
      };
      const cookie = await fetch(`/api/loginnext`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(cookie);
      const isToken = await cookie.json();
      if (!isToken) {
        return Swal.fire("Caution!", "Log in Failed", "error");
      }
      Swal.fire("Good Job", "Log in Success", "success");
      router.push("/home");
    } catch (error) {
      router.push("/login");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Make sure the email and password are filled in correctly",
      });
      console.log(error);
    }
  };
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
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className={`${style.title} form-label`}
                        >
                          Email address
                        </label>
                        <div className="form-floating">
                          <input
                            type="email"
                            name="email"
                            className="form-control mb-3"
                            placeholder="email"
                            // value={user.email}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInput">Email address</label>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className={`${style.title} form-label`}
                        >
                          Password
                        </label>
                        <div className="form-floating">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            // value={user.password}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingPassword">Password</label>
                        </div>
                      </div>
                      <div
                        className={`${style.codisional} form-check mb-4 mt-2 float-start  ms-1`}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          name="terms"

                          id="flexCheckDefault"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          I agree to terms & conditions
                        </label>
                      </div>
                      <button
                        type="sumbit"
                        className={`${style.btnsign} w-100 btn`}
                        onClick={handleSubmit}
                      >
                        {" "}
                        {loading ? (
                          <>
                            <FontAwesomeIcon icon={faSpinner} spin />
                            &nbsp;loading
                          </>
                        ) : (
                          "Login"
                        )}
                      </button>
                      <div className={`${style.forgot} mb-4 mt-3 float-end`}>
                        <label> Forgot password ? </label>
                      </div>
                      <label
                        className={style.register + " mb-3 text-center"}
                        htmlFor=""
                      >
                        Don’t have an account?
                        <Link href="/register">
                          <a className={style.pageregister}>Sign Up</a>
                        </Link>
                      </label>
                    </form>
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
export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  console.log(token);
  if (token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        isLogin: false,
      },
    };
  }
};
export default Login;
