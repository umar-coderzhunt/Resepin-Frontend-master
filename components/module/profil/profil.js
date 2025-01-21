/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import Router from "next/router";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";

const Profils = () => {
  const [resep, setResep] = useState([]);
  async function fetchData() {
    try {
      const result = await axios({
        method: "GET",
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        url: "/food",
      });
      console.log(result.data.data);
      setResep(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);


  const router = useRouter();

  const refreshData = () => {
    // router.replace(router.asPath);
    Router.push("/profil");
  };

  const deletePost = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/food/${id}`);
    alert("berhasil menghapus yaa")

    refreshData();
  };
  return (
    <div>
      <main className="mt-5">
        <div className="container slide">
          <div className="row">
            <div className="col-lg-12">
              <div className={`${style.profil}`}>
                <img
                  src="/assets/Ellipse 127.png"
                  alt=""
                  className={`${style.profilImage}`}
                />
                <p className={`${style.textProfil} text-center `}>
                  Garneta Sharina
                </p>
              </div>
            </div>
            <hr />
            <div className="col-lg-12 mt-3">
              <ul className="list-group list-group-horizontal">
                <li className={`${style.choase} list-group-item`}>
                  <a href="">My Recipe</a>
                </li>
                <li className={`${style.choase} list-group-item`}>
                  <a href="" className="text-secondary">
                    Saved Recipe
                  </a>
                </li>
                <li className={`${style.choase} list-group-item`}>
                  <a href="" className="text-secondary">
                    Liked Recipe
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-12 mt-5">
              <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4 g-2">
                {resep.map((item) => (
                  <div className="col" key={item.idfood}>
                    <div className="card shadow-sm ms-1">
                      <Link href={`/Resepin/editReciped/${item.idfood}`}>
                        <a className={style.iconedit}>
                          {" "}
                          <BsFillPencilFill className={style.pen} />
                        </a>
                      </Link>
                      <Link href="/profil">
                        <a
                          onClick={() => deletePost(item.idfood)}
                          className={style.icondel}
                        >
                          <BsTrashFill className={style.del} />
                        </a>
                      </Link>
                      <Image
                        width="300px"
                        height="240px"
                        layout="responsive"
                        src={item.image}
                        className="image-fluid"
                        alt="..."
                      />
                      <h4 className={`${style.captionImage}`}>{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profils;
