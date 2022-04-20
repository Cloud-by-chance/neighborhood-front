import { useState } from "react";
import tw from "twin.macro";

export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

//TODO
//1. 로그인 후 "로그인 버튼" "회원가입 버튼" 없애기
//2. 유저 정보 띄우기

function LoginForm() {
  const [loginState, setLoginState] = useState({
    isLogined: false,
    userName: "",
  });

  const login = () => {
    <>
      <NavLink href="/login" tw="lg:ml-12!">
        Login
      </NavLink>

      <PrimaryLink css={tw`rounded-full`} href="/accounts/signup">
        Sign Up
      </PrimaryLink>
    </>;
  };

  const logout = () => {
    <NavLink id="logout" to="/">
      Logout
    </NavLink>;
  };

  function render() {
    let loginObject = {};
    if (!loginState.isLogined) {
      loginObject = {
        ...loginState,
        isLogined: true,
      };
    } else {
      loginObject = {
        isLogined: false,
        userName: "",
      };
    }
    setLoginState(loginObject);
  }

  return (
    <div>
      {}
      {loginState.isLogined ? <logout /> : <login />};
    </div>
  );
}

export default LoginForm;
