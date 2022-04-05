import React from "react";
import "./AppLayout.scss";
import Header from "components/headers/community_h";
import { Input, Menu } from "antd";
function AppLayout({ children, sidebar }) {
  let style1 = {
    display: "inline-block",
    width: "150px",
    height: "50px",
  };

  return (
    
    <>
      <Header />
        
  

      <div className="contents">{children}</div>
      <div className="sidebar">
        {sidebar}
 
      </div>
      <div className="footer">&copy; 2021. Gyeol</div>
    </>
  );
}
export default AppLayout;

