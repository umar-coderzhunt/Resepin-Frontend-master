/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

const Content = () => {
  const [resep, setResep] = useState([]);
  const [counter, setCounter] = useState(1);
  // const { user } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState("");
  const [paginate, setPagination] = useState({
    currentPage: 1,
    limit: 6,
    sort: "",
    search: "",
  });


  const handleSearchInput = (e) => {
    e.persist();
    setSearchValue(e.target.value);
  };
  const router = useRouter();
  const onSubmitSearch = (e) => {
    e.preventDefault();

    router.push(`/searchPrams?keyword=${searchValue}`);
  };

  const [sort, setSort] = useState("ASC");
  // console.log(paginate);
  async function fetchData(counter, sort) {
    try {
      const result = await axios({
        method: "GET",
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        url: `/food/filter/?page=${counter}&type=${sort}`,
      });
      // console.log(result.data.pagination);
      setPagination(result.data.pagination);
      setResep(result.data.data);
    } catch (error) {
      // console.log(error);
    }
  }
  useEffect(() => {
    fetchData(counter, sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, sort]);

  const next = () => {
    setCounter(
      counter === paginate.totalPage ? paginate.totalPage : counter + 1
    );
    // console.log(counter);
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
      <main className="mt-5">
        <div className="container mt-5">
          <form className="d-flex " action="" onSubmit={onSubmitSearch}>
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
              <Dropdown.Toggle variant="warning" id="dropdown-basic">
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
                  <button className={`${styles.sortDsc} btn `} onClick={sortby}>
                    Judul Resep Z-A
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="row  row-cols-2 row-cols-lg-3 align-items-center g-3 mt-2">
            {!resep ? (
              <h4>Loading...</h4>
            ) : (
              resep.map((reseps) => (
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
                    <div className="card-img-overlay text-white d-flex justify-content-center align-items-end">
                      <Link href={`/detailResep/${reseps.idfood}`}>
                        <a className={`${styles.captionCard}`}>
                          {reseps.title}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            className={`${styles.pagination} row row-cols-4 row-cols-lg-12 align-items-center g-1 mt-5`}
          >
            <button
              className={`${styles.nexts} btn btn-primary`}
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
        </div>
      </main>
    </div>
  );
};
// export async function getServerSideProps(context) {
//   const cookie = context.req.headers.cookie;
//   console.log(cookie)
//   if (!cookie) {
//     // Router.replace('/login')
//     context.res.writeHead(302, {
//       Location: `http://localhost:3000/login`,
//     });
//     return {};
//   }
//   const { data: RespData } = await axios.get(
//     "http://localhost:5000/food",
//     {
//       withCredentials: true,
//       headers: {
//         Cookie: cookie,
//       },
//     }
//   );
//   // console.log(data);
//   const name = "Wahyu";
//   return {
//     props: {
//       name: name,
//       resepin: RespData.data,
//     }, // will be passed to the page component as props
//   };
// }
export default Content;
