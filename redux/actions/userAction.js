import axios from "axios";
import Router from "next/router";
import Swal from "sweetalert2";


export const loginUser = (dataForm) => async (dispatch) => {
  try {
    console.log("hi");

    console.log("dataform", dataForm);

    dispatch({ type: "USER_LOGIN_PENDING" });
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      dataForm,
      { withCredentials: true }
    );
    const user = {
      name: result.data.data.fullname,
      id: result.data.data.iduser,
      email: result.data.data.email,
      status: result.data.data.active,
      token: result.data.data.token,
      refreshToken: result.data.data.refreshToken,
    };
    // console.log(user.status == 0)
    // if (user.status == 0) {
    //   alert("maaf anda belum activasi");
    //   Router.push("/login");
    // }
    // // console.log(result.data.data.token);
    // if (user.status == 1) {
    //   const token = result.data.data.token;
    //   localStorage.setItem("Resep", JSON.stringify(user));
    //   dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });

    //   dispatch({
    //     type: "USER_LOGIN_SUCCESS",
    //     token: token.data,
    //     payload: user,
    //   });
    //   Router.push("/home");
    //   alert("berhasil login");
    // }

    const token = result.data.data.token;
    localStorage.setItem("Resep", JSON.stringify(user));
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      token: user.token,
      payload: user,
    });
    const data = {
      token: token,
    };
    const cookie = await fetch("/api/loginnext", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const isToken = await cookie.json();
    if (!isToken) {
      return Swal.fire("Caution!", "Log in Failed", "error");
    }
    Swal.fire("Good Job", "Log in Success", "success");
    Router.push("/home");
    Swal.fire({
      icon: "success",
      title: "Selamat anda berhasil Login",
      text: `Hallo ${user.name}`,
    });
  } catch (error) {
    Router.push("/login");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Make sure the email and password are filled in correctly ",
    });
    console.log(error);
  }
};

export const signUp = (dataForm) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_PENDING" });
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      dataForm
    );
    const user = result.data.data;

    localStorage.setItem("token", user.token);
    localStorage.setItem("refreshToken", user.refreshToken);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
    Router.push("/login");
    Swal.fire({
      icon: "success",
      title: "Successful registration, please login",
    });
  } catch (error) {
    Router.push("/register");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "you failed to register, fill it in correctly ",
    });
    console.log(error);
  }
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_PRODUCT",
    });

    dispatch({
      type: "SIGN_OUT",
    });
  };
};
