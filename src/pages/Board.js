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
import Pagination from "../components/Board/pagination";

function Board() {
  const [info, setInfo] = useState([]);
  const [selected, setSelected] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const nextId = useRef(11);
  const cookieId = getCookie("ID");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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

        {/* <label>
          페이지 당 표시할 게시물 수:&nbsp;
          <select
            type="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label> */}

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-700 dark:text-gray-400">
            <thead class="text-xs  text-gray-700  bg-gray-6000 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-gray-300 px-6 py-3">
                  번호
                </th>
                <th scope="col" className="text-gray-300 px-6 py-3">
                  제목
                </th>
                <th scope="col" className="text-gray-300 px-6 py-3">
                  작성자
                </th>
                <th scope="col" className="text-gray-300 px-6 py-3">
                  최종 수정일
                </th>
                <th scope="col" className="text-gray-300 px-6 py-3">
                  수정
                </th>
                <th scope="col" className="text-gray-300 px-6 py-3">
                  삭제
                </th>
              </tr>
            </thead>
            <Tr
              info={info.slice(offset, offset + limit)}
              handleRemove={handleRemove}
              handleEdit={handleEdit}
            />
          </table>
        </div>

      </div>
      <footer>
        <Pagination
          total={info.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </>
  );
}

export default Board;
