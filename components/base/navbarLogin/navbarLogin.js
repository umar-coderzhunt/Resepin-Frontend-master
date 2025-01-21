/* eslint-disable @next/next/no-img-element */
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import style from "./navbar.module.css";
import Login from "../Login";
const NavbarLogin = ({ classAdd, classHome, classProfil, children, href }) => {

  //  const cookie = req.headers.cookie;
  //  console.log(cookie);

  return (
    <>
      <header>
        <Navbar className="fixed-top" bg="light" expand="lg">
          <Container>
            <Link href="/home">
              <Navbar.Brand>Food-Recipe</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <ul className="navbar-nav justify-content-start flex-grow-1 pe-5">
                  <Link href="/home">
                    <li className={`${style.text} nav-item ms-5`}>
                      <a className={classHome} aria-current="page" href="#">
                        Home
                      </a>
                    </li>
                  </Link>
                  <li className={`${style.text} nav-item ms-5`}>
                    <a className={classAdd} href={href}>
                      Resep
                    </a>
                  </li>
                  <Link href="/aboutMe">
                    <li className={`${style.text} nav-item ms-5`}>
                      <a className={classProfil} href="#">
                        About Website
                      </a>
                    </li>
                  </Link>
                </ul>
              </Nav>
              <Nav className="ms-auto">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-5">
                  <Login />
                </ul>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavbarLogin;
