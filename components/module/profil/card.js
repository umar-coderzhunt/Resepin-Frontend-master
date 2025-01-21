import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";

const Card = () => {
  const [resep, setResep] = useState([]);
  async function fetchData() {
    try {
      const result = await axios({
        method: "GET",
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        url: "/food",
      });
      console.log(result);
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
    try {
      await axios.delete(`http://localhost:6000/food/${id}`, {
        withCredentials: true,
      });
      alert("berhasil menghapus yaa");

      refreshData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
  );
};

export default Card;
