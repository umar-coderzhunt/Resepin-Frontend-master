import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import style from "./register.module.css"
import Link from "next/link"
import { signUp } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";

const FormRegister = () => {

  const dispatch = useDispatch();
  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const handleInput = (e) => {
    e.persist();
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp(registerData))
  };


  return (
    <>
      <form className={`${style.formregister}`} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className={`${style.titleRegis} form-label `}
          >
            Name
          </label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="name"
            name="fullname"
            onChange={handleInput}
          />
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className={`${style.titleRegis} form-label `}
            >
              Email address *
            </label>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="email"
              name="email"
              onChange={handleInput}
            />
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className={`${style.titleRegis} form-label `}
              >
                Phone Number
              </label>
              <input
                type="number"
                className="form-control mb-3"
                placeholder="08xxxxxxxxxx"
                onChange={handleInput}
                name="phonenumber"
                id="phonenumber"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className={`${style.titleRegis} form-label `}
              >
                Create New Password
              </label>
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Create New Password"
                onChange={handleInput}
                name="password"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className={`${style.titleRegis} form-label `}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={handleInput}
                name="password"
              />
            </div>
            <div
              className={`${style.codisionalRegis} form-check mb-4 mt-2 float-start  ms-1`}
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
            <button className={`${style.btnSignup} w-100 btn `} type="submit">
              Register Account
            </button>
            <label className={`${style.loginPage} text-center"`} htmlFor="">
              Already have account ?
              <Link href="/login">
                <a className={`${style.pageRegister}`}>Log in Here</a>
              </Link>
            </label>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormRegister;
