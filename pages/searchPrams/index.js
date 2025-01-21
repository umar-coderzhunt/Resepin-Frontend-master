import Footer from "../../components/base/footer/footer";
import Navbars from "../../components/base/navbar/navbar";
import React, { useState, useEffect } from "react";
import styles from "../../components/module/homes/style.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/router";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import style from "../../styles/addreceiped.module.css";
import Logout from "../../components/base/Logout";
import Login from "../../components/base/Login";

const Search = ({ isAuth }) => {
  const router = useRouter();
  const [resep, setResep] = useState([]);
  const [counter, setCounter] = useState(1);
  const { user } = useSelector((state) => state.auths);
  console.log(user);
  const [paginate, setPagination] = useState({
    currentPage: 1,
    limit: 6,
    sort: "",
    search: "",
  });
  const [sort, setSort] = useState("ASC");
  const key = router.query.keyword;
  async function fetchData(counter, sort, key) {
    try {
      const result = await axios({
        method: "GET",
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        url: `/food/filter/?page=${counter}&type=${sort}&search=${key}`,
      });
      // console.log(result.data.pagination);
      setPagination(result.data.pagination);
      setResep(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const [searchValue, setSearchValue] = useState("");
  const handleSearchInput = (e) => {
    e.persist();
    setSearchValue(e.target.value);
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();

    router.push(`/searchPrams?keyword=${searchValue}`);
  };
  console.log(router.query.keyword);
  useEffect(() => {
    fetchData(counter, sort, key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, sort, key]);
  console.log(resep);
  const next = () => {
    setCounter(
      counter === paginate.totalPage ? paginate.totalPage : counter + 1
    );
    console.log(counter);
  };
  const previos = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
  };
  const sortby = () => {
    setSort("DESC");
  };
  const sortAsc = () => {
    setSort("ASC");
  };
  return (
    <div>
      <Navbars
        classAdd={style.navNon}
        classHome={style.navActive}
        classProfil={style.navNon}
      >
        {isAuth && (
          <>
            <Logout></Logout>
          </>
        )}
        {!isAuth && (
          <>
            <Login></Login>
          </>
        )}
      </Navbars>
      <div>
        <main className="mt-5">
          <div className="container mt-5">
            <form
              className={`${styles.searhFrom} d-flex `}
              action=""
              onSubmit={onSubmitSearch}
            >
              <input
                type="search"
                className="form-control search-input"
                style={{ width: "75%" }}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                name="search"
                onChange={handleSearchInput}
              />
              <button className="btn btn-outline-warning" type="submit">
                Search
              </button>
            </form>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 mt-5">
              <Dropdown>
                <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                  Sorting Name
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <button
                      className={`${styles.sortAsc} btn me-3`}
                      onClick={sortAsc}
                    >
                      Judul Resep A-Z
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <button
                      className={`${styles.sortDsc} btn `}
                      onClick={sortby}
                    >
                      Judul Resep Z-A
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {resep.length <= 0 ? (
              <h4 className="mt-5">resep dengan keyword : {key} tidak ada</h4>
            ) : (
              <h4 className="mt-5">resep dengan keyword : {key} </h4>
            )}
            <div className="row  row-cols-2 row-cols-lg-3 align-items-center g-3 mt-2">
              {resep.map((reseps) => (
                <div className="col " key={reseps.idfood}>
                  <div
                    className={`${styles.categories} card text-center d-flex `}
                  >
                    <Image
                      width="350px"
                      height="355px"
                      layout="responsive"
                      src={reseps.image}
                      alt="Bootstrap"
                      className="img-fluid"
                    />
                    <div className="card-img-overlay text-white d-flex justify-content-start align-items-end">
                      <Link href={`/detailResep/${reseps.idfood}`}>
                        <a className={`${styles.captionCard}`}>
                          {reseps.title}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {paginate.totalPage <= resep.length && (
              <div
                className={`${styles.pagination} row row-cols-4 row-cols-lg-12 align-items-center g-1 mt-5`}
              >
                <button
                  className="btn btn-primary"
                  style={{ width: 40, height: 40 }}
                  onClick={previos}
                >
                  <BsFillArrowLeftSquareFill />
                </button>
                <p className={`${styles.curent}`}>
                  {paginate.currentPage}/{paginate.totalPage}
                </p>
                <button
                  className={`${styles.next} btn btn-primary`}
                  style={{ width: 40, height: 40 }}
                  onClick={next}
                >
                  <BsFillArrowRightSquareFill />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
};
export const getServerSideProps = async (context) => {
  try {
    let isAuth = false;

    if (context.req.headers.cookie) {
      isAuth = true;
    }
    const cookie = context.req.headers.cookie;
    console.log(cookie);
    return {
      props: { isAuth },
    };
  } catch (error) {
    console.log(error);
  }
};
export default Search;
