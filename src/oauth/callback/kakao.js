// 리다이렉트될 화면

import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../modules/user";

const Kakao = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  React.useEffect(async () => {
    dispatch(userActions.kakaoLogin(code));
  }, []);
};

export default Kakao;
