import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";

const Content = () => {
  const [resep, setResep] = useState([]);
  const [counter, setCounter] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [paginate, setPagination] = useState({ currentPage: 1, limit: 6, totalPage: 1 });
  const [sort, setSort] = useState("ASC");
  const router = useRouter();

  useEffect(() => {
    fetchData(counter, sort);
  }, [counter, sort]);

  async function fetchData(counter, sort) {
    try {
      const result = await axios({
        method: "GET",
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        url: `/food/filter/?page=${counter}&type=${sort}`,
      });
      setPagination(result.data.pagination || {});
      setResep(result.data.data || []);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  }

  const handleSearchInput = (e) => setSearchValue(e.target.value);

  const onSubmitSearch = (e) => {
    e.preventDefault();
    router.push(`/searchPrams?keyword=${searchValue}`);
  };

  const next = () => setCounter(Math.min(counter + 1, paginate.totalPage));
  const previous = () => setCounter(Math.max(counter - 1, 1));

  const sortAsc = () => setSort("ASC");
  const sortDesc = () => setSort("DESC");

  return (
    <div>
      <main className="mt-5">
        <div className="container mt-5">
          <form className="d-flex" onSubmit={onSubmitSearch}>
            <input
              type="search"
              className="form-control search-input"
              style={{ width: "75%" }}
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearchInput}
            />
            <button className="btn btn-outline-warning" type="submit">
              Search
            </button>
          </form>
          <Dropdown className="mt-3">
            <Dropdown.Toggle variant="warning">Sorting</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={sortAsc}>Title A-Z</Dropdown.Item>
              <Dropdown.Item onClick={sortDesc}>Title Z-A</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="row row-cols-2 row-cols-lg-3 mt-4">
            {resep.length === 0 ? (
              <h4>No Recipes Found</h4>
            ) : (
              resep.map((reseps) => (
                <div className="col" key={reseps.idfood}>
                  <div className={`${styles.categories} card text-center`}>
                    <Image
                      width="350px"
                      height="355px"
                      layout="responsive"
                      src={reseps.image || "/placeholder.jpg"}
                      alt={reseps.title || "Recipe"}
                      className="img-fluid"
                    />
                    <div className="card-img-overlay d-flex justify-content-center align-items-end">
                      <Link href={`/detailResep/${reseps.idfood}`}>
                        <a className={`${styles.captionCard}`}>{reseps.title}</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 d-flex justify-content-between">
            <button className="btn btn-primary" onClick={previous}>
              <BsFillArrowLeftSquareFill />
            </button>
            <span>
              {paginate.currentPage}/{paginate.totalPage}
            </span>
            <button className="btn btn-primary" onClick={next}>
              <BsFillArrowRightSquareFill />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Content;
