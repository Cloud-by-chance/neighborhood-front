import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import kakaoIconImageSrc from "images/kakao-icon.png";
import { KAKAO_AUTH_URL } from "../oauth/OAuth";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { axiosInstance } from "components/api";
import { message, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Container = tw(
  ContainerBase 
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;
function Login() {
  // const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
  const [inputs, setInputs] = useState({ id: "", password: "" });
  const history = useHistory();

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs, //이전 inputs 값을 받아와서 이어써주기 위해 사용한다
      [name]: value, //여기서 []은 리스트 ,array가 아니라 이 식을 평가하라는 뜻이다(in javascript)
    });
  };

  const onSubmit = (values) => {
    async function fn() {
      values.preventDefault();
      console.log(values);
      const { id, password } = values; //submit시 보내지는 data를 username, password로 저장
      const data = { id, password };
      console.log(data);

      var headers = {
        "Content-Type": "application/json",
      };
      await axiosInstance
        .post("/v1/login", JSON.stringify(inputs), { headers })
        .then((response) => {
          console.log("response:", response.data.data);
          const token = response.data.data;
          localStorage.setItem("JWT", token);
          // history.push("/accounts/login");
          notification.open({
            message: "로그인 성공",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          });
          history.push("/");
        })
        .catch((error) => {
          notification.open({
            message: "로그인 실패",
            description: "아이디/암호를 확인해 주세요",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        });
    }
    // const jwtToken = response.data.data; //respone 응답으로오는 데이터의 data 필드를 받아온다
    // localStorage.setItem("jwt",jwtToken)
    // console.log(jwtToken)
    // notification.open({
    //   message: "로그인 성공",
    //   icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    // });
    fn();
  };

  const logoLinkUrl = "/",
    illustrationImageSrc = illustration,
    headingText = "Sign In To 우리동네 정보통",
    socialButtons = [
      {
        iconImageSrc: googleIconImageSrc,
        text: "Sign In With Google",
        url: "https://google.com",
      },
      {
        iconImageSrc: kakaoIconImageSrc,
        text: "Sign In With Kakao",
        url: KAKAO_AUTH_URL,
      },
    ],
    submitButtonText = "Sign In",
    SubmitButtonIcon = LoginIcon,
    forgotPasswordUrl = "#",
    signupUrl = "/signup";

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <SocialButtonsContainer>
                  {socialButtons.map((socialButton, index) => (
                    <SocialButton key={index} href={socialButton.url}>
                      <span className="iconContainer">
                        <img
                          src={socialButton.iconImageSrc}
                          className="icon"
                          alt=""
                        />
                      </span>
                      <span className="text">{socialButton.text}</span>
                    </SocialButton>
                  ))}
                </SocialButtonsContainer>
                <DividerTextContainer>
                  <DividerText>Or Sign in with your e-mail</DividerText>
                </DividerTextContainer>
                <Form onSubmit={onSubmit}>
                  <Input
                    type="text"
                    name="id"
                    placeholder="ID를 입력하세요"
                    onChange={onChange}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}
                  />
                  <SubmitButton type="submit">
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                </Form>
                {/* <p tw="mt-6 text-xs text-gray-600 text-center">
                <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                  Forgot Password ?
                </a>
              </p> */}
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?{" "}
                  <a
                    href={signupUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    Sign Up
                  </a>
                </p>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}
export default Login;
