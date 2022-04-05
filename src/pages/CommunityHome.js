import React from "react";

import AppLayout from "components/page/AppLayout";
import { Route } from "react-router-dom";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import PostNew from "./PostNew";
import PostList from "components/page/PostList";
import test from "components/page/test";

function Home() {
  const history = useHistory();
  const handleClick = () => {
    history.push("community/posts/new");
  };
  const sidebar = (
    <>
      <Button
        type="primary"
        block
        style={{ marginBottom: "3rem" }}
        onClick={handleClick}
      >
        {" "}
        새 포스팅 쓰기
      </Button>

      
    </>
  );
  return (
    <AppLayout sidebar={sidebar}>
      <PostList />
     

      {/* <Route exact path="/community" component={Home} /> */}
      
    </AppLayout>
    
  );
}
export default Home;