import axios from "axios";

const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://localhost:3000/oauth/callback/kakako?code=${code}`,
    })
      .then((res) => {
        //get token
        console.log(res);

        const ACCESS_TOKEN = res.data.accessToken;

        //local store (temp)
        localStorage.setItem("token", ACCESS_TOKEN);

        window.alert("Login success...");
        //get token -> change page to HOME
        history.replace("/");
      })
      .catch((err) => {
        console.log("Login error", err);
        window.alert("Login failed...");
        history.replace("/oauth/Login");
      });
  };
};

const actionCreators = { kakaoLogin };

export { actionCreators };
