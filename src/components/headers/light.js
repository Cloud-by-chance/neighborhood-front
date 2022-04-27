import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import AboutUs from "pages/AboutUs.js";
import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

// import logo from "../../images/logo.svg";
import logo from "../../images/logo_team.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { Button } from "antd";
import { getCookie } from "../../utils/cookies";
import axios from "axios";
import { axiosInstance } from "components/api.js";

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const Username = tw.p`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent 
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1  items-center justify-between
`; //justify-between

export default ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
}) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Access_token") !== null) {
      setIsLogin(true);
    }
  });

  const tokens = {
    refreshToken: localStorage.getItem("Refresh_token"),
    accessToken: localStorage.getItem("k_Actok"),
    jwt: localStorage.getItem("Access_token"),
  };
  var headers = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": localStorage.getItem("Access_token"),
  };
  const onLogout = () => {
    axiosInstance.post("/auth/logout", JSON.stringify(tokens), { headers });

    localStorage.removeItem("Refresh_token");
    localStorage.removeItem("Access_token");
    localStorage.removeItem("k_Actok");
    localStorage.removeItem("k_Retok");

    document.location.href = "/";
  };

  const defaultLinks = [
    <NavLinks key={1}>
      <NavLink href="/maps">Maps</NavLink>
      <NavLink href="/board">Community</NavLink>
      {/* <NavLink href="/board">Board</NavLink> */}
      <NavLink href="/login">Login</NavLink>
    </NavLinks>,
  ];
  const userLinks = [
    <NavLinks key={1}>
      <div className="flex items-center">
        <img
          className="bg-white shadow-md border-gray-200 rounded-lg"
          height="30px"
          width="30px"
          src={decodeURIComponent(getCookie("image"))}
        ></img>
        {/* <NavLink>{decodeURIComponent(getCookie("userName"))}</NavLink> */}
        <Username>{decodeURIComponent(getCookie("userName"))}</Username>
        <NavLink href="/maps">Maps</NavLink>
        <NavLink href="/board">Community</NavLink>
        {/* <NavLink href="/board">Board</NavLink> */}
        {/* <Button onClick={onLogout}>Logout</Button> */}
        <NavLink href="/" onClick={onLogout}>
          Logout
        </NavLink>
      </div>
    </NavLinks>,
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();

  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (    
    <LogoLink href="/">
      <img src={logo} alt="logo" />
      우리동네 정보
    </LogoLink>
  );

  https: logoLink = logoLink || defaultLogoLink;

  return (
    <Header className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {isLogin ? userLinks : defaultLinks}
      </DesktopNavLinks>
      <MobileNavLinksContainer
        css={collapseBreakpointCss.mobileNavLinksContainer}
      >
        {logoLink}
        <MobileNavLinks
          initial={{ x: "150%", display: "none" }}
          animate={animation}
          css={collapseBreakpointCss.mobileNavLinks}
        >
          {isLogin ? userLinks : defaultLinks}
        </MobileNavLinks>
        <NavToggle
          onClick={toggleNavbar}
          className={showNavLinks ? "open" : "closed"}
        >
          {showNavLinks ? (
            <CloseIcon tw="w-6 h-6" />
          ) : (
            <MenuIcon tw="w-6 h-6" />
          )}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
};
