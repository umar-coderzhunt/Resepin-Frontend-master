/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import style from "../navbar/navbar.module.css";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const result = await fetch("/api/logout");
      const { logout } = await result.json();
      if (logout) {
        Swal.fire("Success", "User Logout", "success");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link href="/profil">
        <li className="nav-item">
          <button className={`${style.iconLogin} btn btn-light`}>
            <img src="/assets/User icon.png" alt="" />
          </button>
        </li>
      </Link>
      <Link href="/login">
        <li className="nav-item">
          <button
            className={`${style.navLink} btn btn-light`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </Link>
    </>
  );
};

export default Logout;
