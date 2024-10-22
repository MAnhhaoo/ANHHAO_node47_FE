import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom"; // Đổi từ Navigate sang useNavigate
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI, loginFBAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";

import ReactFacebookLogin from "react-facebook-login";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate(); // Sử dụng useNavigate hook

  useEffect(() => {

  }, []);

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input className="form-control" id="pass" />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary"
            onClick={() => {
              let email = document.getElementById("email").value;
              let pass_word = document.getElementById("pass").value;
              let payload = { email, pass_word };
              loginAPI(payload)
                .then((res) => {
                  console.log("login success");
                  toast.success(res.message);
                  localStorage.setItem("LOGIN_USER", res.token);
                  navigate("/"); // Sử dụng navigate để chuyển trang
                })
                .catch((error) => {
                  toast.error(error.response.massage);
                })
            }}
          >Login</button>
          <Link 
          className="text-primary"
          to='/forgot-password'
          >
            forgot password
          </Link>
         <ReactFacebookLogin 
            appId="3575985979211510"
            fields="name,email,picture"
            callback={(response)=> {
              console.log(response);
              let { email, name, id } = response;
              let payload = { email, name, id };
              loginFBAPI(payload)
                .then((res) => {
                  console.log(res);
                  localStorage.setItem("LOGIN_USER", res.token);
                  toast.success(res.massage);
                  navigate("/"); // Điều hướng về trang chủ
                })
                .catch((error) => {
                  console.log(error);
                  toast.error(error.response.data.massage);
                });
            }}
            
          />
        </div>
      </form>
    </div>
  </div>
};

export default Login;
