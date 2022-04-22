import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Tr from "../components/Board/Tr";
import Post from "../components/page/Post";
import Header from "components/headers/light";
import Modal from "../components/Board/Modal";
import Button from "@material-tailwind/react/Button";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { BeakerIcon } from "@heroicons/react/solid";
import { getCookie } from "utils/cookies";
import WriteBtn from "components/Board/WriteBtn";

function Board() {
  const [info, setInfo] = useState([]);
  const [selected, setSelected] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const nextId = useRef(11);
  const cookieId = getCookie("ID");

  // const [postList, setPostList] = useState(null);

  const baseUrl = "http://localhost:8081";

  useEffect(() => {
    // console.log(cookieId);
    getPosts();
  }, []);

  async function getPosts() {
    await axios
      .get(baseUrl + "/api/v1/posts")
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const handleSave = () => {
  //   window.location.href = "/post";
  // };

  const handleRemove = (id) => {
    console.log(id);
    axios
      .delete(baseUrl + "/api/v1/post/" + id)
      .then((response) => {
        setInfo((info) => info.filter((item) => item.post_id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (item) => {
    const selectedData = {
      post_id: item.post_id,
      post_name: item.post_name,
      user_id: item.user_id,
      content: item.content,
      update_dt: item.update_dt,
    };

    
    // console.log(selectedData);
    setSelected(selectedData);
  };

  return (
    <>
      <Header />
      <div className="container max-w-screen-lg mx-auto">
        <div className="text-xl font-bold mt-5 mb-3 text-center">
          <h1>게 시 판</h1>
        </div>
        { !cookieId ? <></> : <WriteBtn />}
        <table className="min-w-full table-auto text-gray-800">
          <thead className="justify-between">
            <tr className="bg-gray-800">
              <th className="text-gray-300 px-4 py-3">번호</th>
              <th className="text-gray-300 px-4 py-3">제목</th>
              <th className="text-gray-300 px-4 py-3">작성자</th>
              <th className="text-gray-300 px-4 py-3">최종 수정일</th>
              <th className="text-gray-300 px-4 py-3">수정</th>
              <th className="text-gray-300 px-4 py-3">삭제</th>
            </tr>
          </thead>
          <Tr info={info} handleRemove={handleRemove} handleEdit={handleEdit}/>
        </table>
      </div>
    </>
  );
}

export default Board;
