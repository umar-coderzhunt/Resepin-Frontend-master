import Footer from "../../../components/base/footer/footer";
import Form from "../../../components/base/form";
import Navbars from "../../../components/base/navbar/navbar";
import style from "./addreceiped.module.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../../../components/module/addRecipe/style.module.css";
import axios from "axios";
import Router from "next/router";
import { useRouter } from "next/router";
import Login from "../../../components/base/Login";
import Logout from "../../../components/base/Logout";
import Swal from "sweetalert2";


const EditReciped = ({ resep, isAuth, img, videos }) => {
  console.log(img);
  const [image, setImage] = useState(
    img ||
      "http://res.cloudinary.com/dwdpjepcr/image/upload/v1656516752/kyr46k6zvanumeppj4w2.png"
  );
  const [title, setTitle] = useState("");
  const [ingrediens, setIngrediens] = useState("");
  const [video, setVideo] = useState(videos);
  console.log(image);
  const [previewImg, setImagePreview] = useState(img);

  const router = useRouter();
  const id = router.query.id;
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("ingrediens", ingrediens);
    formData.append("video", video);
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/food/${id}`, formData, {
        "content-type": "multipart/form-data",
      })
      .then((res) => {
        // console.log(res);
        Router.push("/profil");
        Swal.fire({
          icon: "success",
          title: "Berhasil mengupdate resep",
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
    // console.log(file);
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const onVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    // console.log(e.target.files[0]);
  };

  useEffect(() => {
    setTitle(resep.title);
    setIngrediens(resep.ingrediens);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resep]);

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
          <input
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
          <input
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

export async function getServerSideProps(context) {
  try {
    const cookie = context.req.headers.cookie;
    console.log(cookie);
    if (!cookie) {
      context.res.writeHead(302, {
        Location: `https://resepin.vercel.app/login`,
      });
      return {};
    }
    let isAuth = false;

    if (cookie) {
      isAuth = true;
    }
    const id = context.params.id;
    console.log(id);
    const { data: RespData } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/food/${id}`,
      {
        withCredentials: true,
        headers: {
          Cookie: cookie,
        },
      }
    );
    const img = RespData.data[0].image;
    const video = RespData.data[0].video;
    return {
      props: {
        resep: RespData.data[0],
        isAuth: isAuth,
        img: img,
        videos: video,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
export default EditReciped;
