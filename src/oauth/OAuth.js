import KAKAO_KEY from "../oauth/KAKAO_KEY";

const CLIENT_ID = KAKAO_KEY;
// const REDIRECT_URI = "http://localhost:3000/auth/kakao";
const REDIRECT_URI = "https://www.cloudbychance.com/auth/kakao";


export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
