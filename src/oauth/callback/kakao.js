import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";
import KAKAO_KEY from "../../oauth/KAKAO_KEY";
import { message, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

const Auth = () => {
  const REST_API_KEY = KAKAO_KEY;
  const REDIRECT_URL = "http://localhost:3000/v1/kakao";

  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  const history = useHistory();

  const GetToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URL,
      code: code,
    });
    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      console.log("asdfasdfASDF");
      // access token 설정
      localStorage.setItem("ACT", res.data.access_token);
      history.replace("/v1/kakaoLogin");
    } catch (err) {
      console.log(err);
    }
    useEffect(() => {
      GetToken();
    }, []);
    
  };
  return null;
};

export default Auth;

// const GetToken = async () => {
//   const history = useHistory();
//   const accessToken = window.localStorage.getItem("ACT");
//   const payload = qs.stringify({
//     ACT: accessToken,
//   });
//   try {
//     // access token 가져오기
//     const res = await axios.post("http://localhost:8081/v1/kakao", payload);

//     console.log("response:", res.data.data);

//     const token = res.data.data;
//     localStorage.setItem("JWT", token);

//     notification.open({
//       message: "로그인 성공",
//       icon: <SmileOutlined style={{ color: "#108ee9" }} />,
//     });
//     history.push("/");
//   } catch (err) {
//     console.log(err);
//   }
//   useEffect(() => {
//     GetToken();
//   }, []);
//   return null;
// };
