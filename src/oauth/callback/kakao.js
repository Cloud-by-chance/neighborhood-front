import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";
import KAKAO_KEY from "../../oauth/KAKAO_KEY";
import { axiosInstance } from "components/api";
import { message, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { getCookie, setCookie } from "../../utils/cookies";

const Auth = () => {
  const REST_API_KEY = KAKAO_KEY;
  const REDIRECT_URL = "http://localhost:3000/v1/kakao";
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const history = useHistory();
  const payload = qs.stringify({
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URL,
    code: code,
  });

  // access token 가져오기
  axios
    .post("https://kauth.kakao.com/oauth/token", payload)
    .then((respone) => {
      localStorage.setItem("ReTok", respone.data.refresh_token);

      const token = {
        accessToken: respone.data.access_token,
        refreshToken: respone.data.refresh_token,
        jwt: localStorage.getItem("JWT"),
      };

      var headers = {
        "Content-Type": "application/json",
      };
      axiosInstance
        .post("/v1/kakaoLogin", JSON.stringify(token), { headers })
        .then((res) => {
          console.log(res.data);

          var user = {
            token: res.data.list[0],
            userName: res.data.list[1],
            ID: res.data.list[2],
            email: res.data.list[3],
            image: res.data.list[4],
          };

          let date = new Date(); //쿠키를 생성한 그 날의 날짜, 시간 생성
          date.setDate(date.getDate() + 10);

          setCookie("userName", encodeURIComponent(user.userName), {
            path: "/",
            expires: date,
          });

          setCookie("ID", encodeURIComponent(user.ID), {
            path: "/",
            expires: date,
          });

          setCookie("image", encodeURIComponent(user.image), {
            path: "/",
            expires: date,
          });

          localStorage.setItem("JWT", user.token);

          notification.open({
            message: "로그인 성공",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          });

          history.replace("/");
        })
        .catch((e) => {
          alert(e);
        });
    })
    .catch((error) => {
      notification.open({
        message: "로그인 실패",
        description: "아이디/암호를 확인해 주세요",
        icon: <FrownOutlined style={{ color: "#ff3333" }} />,
      });
    });

  return null;
};

export default Auth;
