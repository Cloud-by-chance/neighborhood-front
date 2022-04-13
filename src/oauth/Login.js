import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { KAKAO_AUTH_URL } from "../oauth/OAuth";

const Login = () => {
  return (
    <>
      <KaKaoBtn href={KAKAO_AUTH_URL} type="primary">
        카카오 로그인
      </KaKaoBtn>
    </>
  );
};

export default Login;

const KaKaoBtn = styled(Button)`
  padding: 0;
  width: 190px;
  height: 32px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;
