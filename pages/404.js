import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Link  from "next/link";

const Page404 = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <Link href="/home">
          <a className="btn btn-primary">Go Home</a>
        </Link>
      </div>
    </div>
  );
}

export default Page404