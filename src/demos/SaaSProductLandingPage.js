import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithInput.js";
import "@material-tailwind/react/tailwind.css";
// import Features from "components/features/ThreeColWithSideImage.js";
// import MainFeature from "components/features/TwoColWithButton.js";
// import MainFeature2 from "components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
// import FeatureWithSteps from "components/features/TwoColWithSteps.js";
// import Pricing from "components/pricing/ThreePlans.js";
// import Testimonial from "components/testimonials/TwoColumnWithImageAndRating.js";
// import FAQ from "components/faqs/SingleCol.js";
// import GetStarted from "components/cta/GetStarted";
// import Footer from "components/footers/FiveColumnWithBackground.js";
// import heroScreenshotImageSrc from "images/hero-screenshot-1.png";
// import macHeroScreenshotImageSrc from "images/hero-screenshot-2.png";
// import prototypeIllustrationImageSrc from "images/prototype-illustration.svg";
// import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
// import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";
// import BlogIndex from "pages/BlogIndex";

import Map from "pages/Maps";
import { Route } from "react-router-dom";
import Signup from "pages/Signup";
import Login from "pages/Login";
import Auth from "oauth/callback/kakao";
import PostNew from "pages/PostNew";
import AboutUs from "pages/AboutUs";
import Home from "pages/CommunityHome";
import Board from "../pages/Board";
import Post from "../pages/Posting";
import PortfolioTwoCardsWithImage from "components/cards/PortfolioTwoCardsWithImage";
// import SearchPlace from "pages/SearchPlace";

import Test_MAP from "components/page/Test_MAP";
import LoginRequiredRouter from "utils/LoginRequiredRouter";
export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;

  var lat, lon;
  if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude; // 위도
      lon = position.coords.longitude; // 경도

      // setLocPosition(new kakao.maps.LatLng(lat, lon)) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다;

      sessionStorage.setItem("lat", JSON.stringify(lat));
      sessionStorage.setItem("lon", JSON.stringify(lon));

      // setMap(map.setCenter(locPosition));
    });

    // console.log(locPosition)
  } else {
    // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    console.log("위치를 사용할 수 없습니다.");
  }
  return (
    <AnimationRevealPage>
      <Route exact path="/" component={Hero} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/v1/kakao" component={Auth} />
      {/* <Route exact path="/v1/kakaoLogin" component={KakaoJWT} /> */}
      <Route exact path="/maps" component={Test_MAP} />
      <LoginRequiredRouter exact path="/community" component={Home} /> 
      <Route exact path="/about" component={AboutUs} />
      <Route exact path="/board" component={Board} />
      <Route exact path="/post" component={Post} />
      <Route exact path="/community/posts/new" component={PostNew} />
    </AnimationRevealPage>
  );
};
