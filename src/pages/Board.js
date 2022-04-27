import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Tr from "../components/Board/Tr";
import Post from "../components/page/Post";
import Header from "components/headers/light";
import Modal from "../components/Board/Modal";
import Button from "@material-tailwind/react/Button";
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import { BeakerIcon } from "@heroicons/react/solid";
import { getCookie } from "utils/cookies";
import WriteBtn from "components/Board/WriteBtn";
import Pagination from "../components/Board/pagination";
import { message, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { axiosInstance } from "components/api";
function Board() {
  const [info, setInfo] = useState([]);
  const [selected, setSelected] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const nextId = useRef(11);
  const cookieId = getCookie("ID");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const history = useHistory();

  let config = {
    headers: { "X-AUTH-TOKEN": localStorage.getItem("Access_token") }, //반드시 헤더에 Access_Token을 담에서 보내야됨 그래야 Spring Security에서 확인
  };
  var path =
    "/auth/refreshtoken?token=" + localStorage.getItem("Refresh_token"); //Token 재발급을 위한 경로 미리 지정

  useEffect(() => {
    // console.log(cookieId);
    getPosts();
  }, []);

  function getPosts() {
    let config = {
      headers: { "X-AUTH-TOKEN": localStorage.getItem("Access_token") }, //반드시 헤더에 Access_Token을 담에서 보내야됨 그래야 Spring Security에서 확인
    };
    //  axios.get("http://k8s-default-ingresst-91fe9a8044-1507004944.ap-northeast-2.elb.amazonaws.com/api/v1/posts",config)
      axiosInstance.get("/api/v1/posts", config) //항상 헤더를 담아서
      .then((response) => {
        console.log("정상 처리 했습니다. ")
        console.log(response);
        setInfo(response.data); //제대로 받았으면 data를 Info에 넣어줌
        
      })
      .catch((error) => {
        
        //재발급 과정을 시작한다.
        axiosInstance.post("/auth/refreshtoken", localStorage.getItem("Refresh_token")) //에러 발생시 Access_token 재발급을 위해 Refresh Token을 담고 있는 path 경로로 post 요청
          .then((response) => {
            const token = response.data.data; // Token이 Access만 올수도, Access&Refresh가 같이 올수도있ㅇ듬
            console.log(token.charAt(0))
            if (token.charAt(0) =='[') {
              //Access 토큰보다 길면 Refresh랑 Access가 같이 온거이므로 Split 작업 실행
              const split_token = token.split(","); // access 토큰이랑 refresh 토큰이 주어진다. ,로 나눔
              //2 작업은 access token과 refresh 토큰의 정확한 값을 위해 사용
              split_token[0] = split_token[0].replace("[", "");
              split_token[1] = split_token[1].replace("]", "");
              localStorage.setItem("Access_token", split_token[1]);
              localStorage.setItem("Refresh_token", split_token[0]);
            } else {
              localStorage.setItem("Access_token", token);
            }
            let config = {
              headers: { "X-AUTH-TOKEN": localStorage.getItem("Access_token") }, //반드시 헤더에 Access_Token을 담에서 보내야됨 그래야 Spring Security에서 확인
            };
            window.location.reload();//새로 고침 해준다 getPosts가 랜더링 될때마다 호출되니깐 자동으로 get 요청 실행됨
          })
          .catch((error) => {
            notification.open({
              message: "인증 실패!",
              description: "Getpost를 확인해 주세요",
              icon: <FrownOutlined style={{ color: "#ff3333" }} />,
            });
          }); //재발급이 error가 난거면 진자 문제 생긴거임
      });
  }

  // const handleSave = () => {
  //   window.location.href = "/post";
  // };

  const handleRemove = (id) => {
    let config = {
      headers: { "X-AUTH-TOKEN": localStorage.getItem("Access_token") }, //반드시 헤더에 Access_Token을 담에서 보내야됨 그래야 Spring Security에서 확인
    };
    console.log(id);
    axiosInstance.delete( "/api/v1/post/" + id, config) //마찬 가지로 Header를 담아 보낸다.
    // axios.delete("http://k8s-default-ingresst-91fe9a8044-1507004944.ap-northeast-2.elb.amazonaws.com/api/v1/post/"+id, config)
      .then((response) => {
        setInfo((info) => info.filter((item) => item.post_id !== id));
      })
      .catch((error) => {
        console.log(error);
        axiosInstance.post("/auth/refreshtoken", localStorage.getItem("Refresh_token")) //에러 발생시 Access_token 재발급을 위해 Refresh Token을 담고 있는 path 경로로 post 요청
          .then((response) => {
            
            const token = response.data.data; // Token이 Access만 올수도, Access&Refresh가 같이 올수도있ㅇ듬
            console.log(token.charAt(0))
            if (token.charAt(0) =='[') {
              //Access 토큰보다 길면 Refresh랑 Access가 같이 온거이므로 Split 작업 실행
              const split_token = token.split(","); // access 토큰이랑 refresh 토큰이 주어진다. ,로 나눔
              //2 작업은 access token과 refresh 토큰의 정확한 값을 위해 사용
              split_token[0] = split_token[0].replace("[", "");
              split_token[1] = split_token[1].replace("]", "");
              localStorage.setItem("Access_token", split_token[1]);
              localStorage.setItem("Refresh_token", split_token[0]);
            } else {
              localStorage.setItem("Access_token", token);
            }
            let config = {
              headers: { "X-AUTH-TOKEN": localStorage.getItem("Access_token") }, //반드시 헤더에 Access_Token을 담에서 보내야됨 그래야 Spring Security에서 확인
            };
            //error나서 하지 못한 delete 작업 다시 적용
            axiosInstance.delete("/api/v1/post/" + id, config) //마찬 가지로 Header를 담아 보낸다.
            // axios.delete("http://k8s-default-ingresst-91fe9a8044-1507004944.ap-northeast-2.elb.amazonaws.com/api/v1/post/"+id, config)
                .then((response) => {
                setInfo((info) => info.filter((item) => item.post_id !== id));
                }).catch((error) => {
                  notification.open({
                    message: "인증 실패!",
                    description: "다시 로그인을 확인해 주세요",
                    icon: <FrownOutlined style={{ color: "#ff3333" }} />,
                  });
                });
          })
          .catch((error) => {
            notification.open({
              message: "인증 실패!",
              description: "다시 handleRemove를 확인해 주세요",
              icon: <FrownOutlined style={{ color: "#ff3333" }} />,
            });
          }); //재발급이 error가 난거면 진자 문제 생긴거임
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

    setSelected(selectedData);
  };

  return (
    <>
      <Header />
      <div className="container max-w-screen-lg mx-auto">
        <div className="text-xl font-bold mt-5 mb-3 text-center">
          <h1>게 시 판</h1>
        </div>
        {!cookieId ? <></> : <WriteBtn />}

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
