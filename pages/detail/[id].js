/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Footer from "../../components/base/footer/footer";
import Navbars from "../../components/base/navbar/navbar";
import styles from "../../components/module/detail/style.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import style from "../../styles/addreceiped.module.css";
import NavbarLogin from "../../components/base/navbarLogin/navbarLogin";

const Detail = ({ resepin, isAuth }) => {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState("");
  const [create, setCreate] = useState("");
  // const data = new Date().toISOString().slice(0, 19).replace("T", " ");
  console.log(isAuth);
  useEffect(() => {
    setTitle(resepin.title);
    // setVideo((resepin.video.slice(1,-1).split(",")[0]).slice(1,-1))
    setVideo(resepin.video);
    setCreate(resepin.created_at);
  }, [resepin]);

  const router = useRouter();
  const titles = title.slice(0, 1).toUpperCase() + title.substr(1);
  if (router.isFallback) {
    return <h3>loading......</h3>;
  }

  return (
    <>
      {isAuth && (
        <>
          <Navbars
            classAdd={style.navNon}
            classHome={style.navActive}
            classProfil={style.navNon}
          ></Navbars>
        </>
      )}
      {!isAuth && (
        <>
          <NavbarLogin
            classAdd={style.navNon}
            classHome={style.navActive}
            classProfil={style.navNon}
            href="#resep"
          ></NavbarLogin>
        </>
      )}
      <main className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mt-5 ">
              <h5 className="mb-2">{titles}</h5>
              {video && (
                <video
                  // autoPlay
                  width="700"
                  className={`${styles.videos} mt-2`}
                  controls
                >
                  <source src={video} />
                </video>
              )}
              <h3 className={`${styles.titleVideo} mt-3 `}>{title}</h3>
              <p className="text-secondary mt-2">
                {moment(create).format("LLLL")}
              </p>
            </div>
            <div className={`${styles.sugestion} col-lg-3 mb-5 `}>
              <h3 className={`${styles.next}`}>Next </h3>
              <div className={`${styles.imageStep} mt-3`}>
                <img src="/assets/Rectangle 90.png" alt="" />
                <h4 className={`${styles.step}  text-white`}>[Step 5]</h4>
                <p className={`${styles.caption} `}>
                  Beef Steak with Curry Sauce - [Step 5] Saute condiments
                  together until turn brown
                </p>
                <p className={`${styles.subCaption}  text-secondary`}>
                  HanaLohana - 3 month ago
                </p>
              </div>
              <div className={`${styles.imageStep} mt-5`}>
                <img src="/assets/Rectangle 330.png" alt="" />
                <h4 className={`${styles.step}`}>[Step 5]</h4>
                <p className={`${styles.caption} `}>
                  Beef Steak with Curry Sauce - [Step 5] Saute condiments
                  together until turn brown
                </p>
                <p className={`${styles.subCaption}  text-secondary`}>
                  HanaLohana - 3 month ago
                </p>
              </div>
              <div className={`${styles.imageStep} mt-5`}>
                <img src="/assets/Rectangle 91.png" alt="" />
                <h4 className={`${styles.step}  text-white`}>[Step 5]</h4>
                <p className={`${styles.caption} `}>
                  Beef Steak with Curry Sauce - [Step 5] Saute condiments
                  together until turn brown
                </p>
                <p className={`${styles.subCaption}  text-secondary`}>
                  HanaLohana - 3 month ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

// export async function getStaticPaths() {
//   const { data: newData } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/food`
//   );
//   const paths = newData.data.map((item) => ({
//     params: { id: item.idfood.toString() },
//   }));

//   return { paths, fallback: true };
// }

// export async function getStaticProps({ params}) {
//   console.log(params.id);
//   const { data: newData } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/food/${params.id}`
//   );
//   console.log(newData.data[0]);
//   return {
//     props: {
//       resepin: newData.data[0],
//     },
//   };
// }
export async function getServerSideProps(context) {
  try {
    const cookie = context.req.headers.cookie;
    console.log(cookie);
    const recipeID = context.params.id;
    console.log(recipeID);

    let isAuth = false;

    if (context.req.headers.cookie) {
      isAuth = true;
    }
    const { data: RespData } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/food/${recipeID}`
    );
    console.log(RespData.data[0]);
    return {
      props: {
        isAuth: isAuth,
        resepin: RespData.data[0],
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default Detail;
