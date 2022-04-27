import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";
import { message, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { axiosInstance } from "components/api";

const KakaoJWT = () => {
  const history = useHistory();
  const accessToken = this.props.location.state.access_token;
  console.log(accessToken);
  const payload = qs.stringify({
    accessToken: accessToken,
  });
  axiosInstance
    .post("/v1/kakaologin", payload)
    .then((response) => {
      console.log("갓성결");
      history.push("/");
    })
    .catch(console.log("error!"));
};

export default KakaoJWT;
