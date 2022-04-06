// 리다이렉트될 화면
// 여기서 처리..

import axios from "axios";

const Kakao = async () => {
  try {
    let code = new URL(window.location.href).searchParams.get("code");
    const result = await axios
      .get(`http://localhost:8081/oauth/callback/kakako?code=${code}`, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        console.log(res.data["access_token"]);
        // To Do : 토큰 활용로직
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log("Login error", error);
    window.alert("Login failed...");
  }
};

export default Kakao;
