import React, { useState } from "react";
import style from "./form.module.css";
import Image from "next/image";
import Button from "../../base/Button/button";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import axios from "axios";
import { loginUser } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";

const Form = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    e.persist();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
   dispatch(loginUser(loginData));
  };

  return (
    <form onSubmit={handlesubmit}>
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
            value={loginData.email}
            onChange={handleInput}
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
            value={loginData.password}
            onChange={handleInput}
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
          id="flexCheckDefault"
          required
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          I agree to terms & conditions
        </label>
      </div>
      <Button
        type="sumbit"
        className={`${style.btnsign} w-100 btn`}
        title="Login"
       
      >
        {" "}
      </Button>
      <div className={`${style.forgot} mb-4 mt-3 float-end`}>
        <label> Forgot password ? </label>
      </div>
      <label className={style.register + " mb-3 text-center"} htmlFor="">
        Don’t have an account?
        <Link href="/register">
          <a className={style.pageregister}>Sign Up</a>
        </Link>
      </label>
    </form>
  );
};

export default Form;
