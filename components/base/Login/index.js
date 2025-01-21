/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import Link from "next/link";
import style from "../navbar/navbar.module.css";

const Login = () => {
  return (
    <>
      <Link href="/login">
        <li className="nav-item">
          <a
            className={`${style.navLink} nav-link`}
            aria-current="page" href="#"
          >
            Login
          </a>
        </li>
      </Link>
    </>
  );
}

export default Login