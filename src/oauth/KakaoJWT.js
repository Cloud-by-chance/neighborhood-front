import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";
import { message, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

const KakaoJWT = () => {
  const accessToken = window.localStorage.getItem("ACT");
  async function postData() {
    try {
      //응답 성공
      const response = await axios.post("/v1/kakaoLogin", {
        //보내고자 하는 데이터
        accessToken: accessToken,
      });
      console.log(response);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }
};
export default KakaoJWT;
