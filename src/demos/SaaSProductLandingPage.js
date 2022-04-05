import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithInput.js";
import Features from "components/features/ThreeColWithSideImage.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
import FeatureWithSteps from "components/features/TwoColWithSteps.js";
import Pricing from "components/pricing/ThreePlans.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndRating.js";
import FAQ from "components/faqs/SingleCol.js";
import GetStarted from "components/cta/GetStarted";
import Footer from "components/footers/FiveColumnWithBackground.js";
import heroScreenshotImageSrc from "images/hero-screenshot-1.png";
import macHeroScreenshotImageSrc from "images/hero-screenshot-2.png";
import prototypeIllustrationImageSrc from "images/prototype-illustration.svg";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";
// import BlogIndex from "pages/BlogIndex";

import Map from "pages/Maps";
import { Route } from "react-router-dom";
import Signup from "pages/Signup";
import Login from "pages/Login";
import PostNew from "pages/PostNew";
import AboutUs from "pages/AboutUs";
import Home from "pages/CommunityHome";
import PortfolioTwoCardsWithImage from "components/cards/PortfolioTwoCardsWithImage";
// import SearchPlace from "pages/SearchPlace";
import Test_MAP from "components/page/Test_MAP";
export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;

  return (

    <AnimationRevealPage>
      <Route exact path="/" component={Hero} />
      <Route exact path="/accounts/signup" component={Signup} />
      <Route exact path="/accounts/login" component={Login} />
      <Route exact path="/maps" component={Test_MAP} />
      <Route exact path="/community" component={Home} />
      <Route exact path="/about" component={AboutUs} />
      <Route exact path="/community/posts/new" component={PostNew} />
    </AnimationRevealPage>
    
  );
}
