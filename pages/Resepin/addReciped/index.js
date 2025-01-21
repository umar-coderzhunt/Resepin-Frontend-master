import React, { useState, useEffect } from "react";
import Navbars from "../../../components/base/navbar/navbar";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../../../components/module/addRecipe/style.module.css";
import Footer from "../../../components/base/footer/footer";
import Form from "../../../components/base/form";
import axios from "axios";
import style from "../../../styles/addreceiped.module.css";
import Input from "../../../components/base/input/input";
import Router, { useRouter } from "next/router";
import Login from "../../../components/base/Login";
import Logout from "../../../components/base/Logout";
import Swal from "sweetalert2";

const AddReciped = ({ isAuth, idUser }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [ingrediens, setIngrediens] = useState("");
  const [video, setVideo] = useState("");
  const [previewImg, setImagePreview] = useState("");
  console.log(idUser);
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("ingrediens", ingrediens);
    formData.append("video", video);
    formData.append("iduser", idUser);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/food`, formData, {
        "content-type": "multipart/form-data",
      })
      .then((res) => {
        console.log(res);
        Router.push("/profil");
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupload resep",
          text: `resep : ${title}`,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "data yang anda inputkan salah",
        });
        console.log(error);
      });
  };
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const onVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    console.log(e.target.files[0]);
  };
  useEffect(() => {
    if (isAuth === false) {
      Swal.fire("belum login yaa ?", "silahkan login", "question");
      Router.push("/login");
    }
  }, [isAuth]);
  return (
    <>
      <Navbars
        classAdd={style.navActive}
        classHome={style.navNon}
        classProfil={style.navNon}
      >
        {isAuth && <Logout></Logout>}
        {!isAuth && <Login></Login>}
      </Navbars>
      <Form
        onSubmit={submit}
        style={{
          backgroundImage: `url(${previewImg})`,
          objectFit: "cover",
        }}
        contentImage={
          <>
            <input
              type="file"
              name="image"
              id={`${styles.uploadPhoto}`}
              multiple
              onChange={(e) => onImageUpload(e)}
            />
            <label htmlFor={`${styles.uploadPhoto}`}>Add Photo</label>
          </>
        }
        contentTitle={
          <Input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${styles.title} form-control `}
            id="exampleFormControlInput1"
            placeholder="Title"
          />
        }
        contentIngrediens={
          <textarea
            value={ingrediens}
            onChange={(e) => setIngrediens(e.target.value)}
            name="ingrediens"
            className={`${styles.ingredients} form-control `}
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Ingredients"
          ></textarea>
        }
        contentVideo={
          <Input
            type="file"
            multiple
            onChange={(e) => onVideoUpload(e)}
            className={`${styles.video} form-control `}
            placeholder="Title"
            accept="video/*"
          />
        }
      ></Form>
      <Footer></Footer>
    </>
  );
};


export const getServerSideProps = async (context) => {
  try {
    let isAuth = false;
    const cookie = context.req.headers.cookie;
    console.log(cookie)
    if (cookie === undefined) {
      context.res.writeHead(302, {
        Location: `https://resepin.vercel.app/login`,
      });
      return {};
    }
    if (!context.req.cookie) {
      isAuth = true;
    }
    console.log(isAuth)
    const { data: ProfilData } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profil`,
      {
        withCredentials: true,
        headers: {
          Cookie: cookie,
        },
      }
    );
    const idUser = ProfilData.data.iduser;
    console.log(ProfilData);
    return {
      props: { isAuth, idUser,cookie:cookie },
    };
  } catch (error) {
    console.log(error);
  }
};
export default AddReciped;
