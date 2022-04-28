import KAKAO_KEY from "../oauth/KAKAO_KEY";

const CLIENT_ID = KAKAO_KEY;
export const REDIRECT_URL = "https://www.cloudbychance.com/auth/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;
