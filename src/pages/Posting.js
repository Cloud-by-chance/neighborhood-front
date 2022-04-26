import Input from "@material-tailwind/react/Input";
import React, { useEffect, useState, useRef } from "react";
import { Editor, EditorProps } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import Button from "@material-tailwind/react/Button";
import { useHistory, useLocation } from "react-router-dom";

// TOAST UI Editor Plugin
import "@toast-ui/chart/dist/toastui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";
import "highlight.js/styles/github.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "tui-color-picker/dist/tui-color-picker.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";

import axios from "axios";
import { getCookie } from "utils/cookies";

import { message, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
let config = {
  headers: { "X-AUTH-TOKEN": localStorage.getItem("Access_token") }, //반드시 헤더에 Access_Token을 담에서 보내야됨 그래야 Spring Security에서 확인
};
var path = "/auth/refreshtoken?token=" + localStorage.getItem("Refresh_token"); //Token 재발급을 위한 경로 미리 지정

// const Post = ({onSaveData}) => {
function Post() {
  const history = useHistory();
  const editorRef = useRef();
  const location = useLocation();
  // const [isEdit, setIsEdit] = useState(location.state.isEdit);
  const [isEdit, setIsEdit] = useState(location.state.isEdit);
  const [selectedData, setSelectedData] = useState(location.state.selectedData);
  const [postId, setPostId] = useState(null);

  const [editorCon, setEditorCon] = useState("");
  const [form, setForm] = useState({
    user_id: getCookie("ID"),
    post_name: "",
    content: "",
    board_id: 5,
  });

  let config = {
    headers: { "X-AUTH-TOKEN": localStorage.getItem("Access_token") }, //반드시 헤더에 Access_Token을 담에서 보내야됨 그래야 Spring Security에서 확인
  };
  var path = "/v1/refreshtoken?token=" + localStorage.getItem("Refresh_token"); //Token 재발급을 위한 경로 미리 지정

  // 데이터를 보낼 Form 처리
  const handleChange = (e) => {
    const { name, value } = e.target; // 우선 e.target 에서 user_id와 value 를 추출

    setForm({
      ...form, // 기존의 form 객체 복사
      [name]: value, // name 키를 갖는 값을 value로 설정
      // content: "hello"
    });
  };
  // Editor가 변경할 때마다 값을 읽어오게 함.
  const contentChange = () => {
    setEditorCon(editorRef.current.getInstance().getHTML());
  };

  // 최초 한 번만 실행(Constructor 역할)
  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    console.log(editorInstance);

    async function initializingEditor() {
      if (isEdit) {
        const result = await axios.get(
          "http://localhost:8081/api/v1/post/" + selectedData.post_id
          ,config
        );

        setForm({
          ...form,
          user_id: result.data.user_id,
          post_name: result.data.post_name,
          content: result.data.content,
        });

        setPostId(result.data.post_id);

        editorInstance.setHTML(result.data.content);
      }
    }

    initializingEditor();

    console.log(form);
    const getContent_html = editorInstance.getHTML();

    setEditorCon(getContent_html);
  }, []);

  // editorCon값이 변경될 때마다 실행
  useEffect(() => {
    setForm({
      ...form,
      content: editorCon,
    });
  }, [editorCon]);

  function handleSubmit(e) {
    e.preventDefault();

    // console.log(form);
    if (isEdit) {
      axios
        .put("http://localhost:8081/api/v1/post/" + postId, form, config) //"주소", "데이터", "헤더"
        .then(() => {
          history.push("/board");
        })
        .catch((error) => {
          console.log(error);
          axios
            .post("/auth/refreshtoken",localStorage.getItem("Refresh_token")) //에러 발생시 Access_token 재발급을 위해 Refresh Token을 담고 있는 path 경로로 post 요청
            .then((response) => {
              const token = response.data.data; // Token이 Access만 올수도, Access&Refresh가 같이 올수도있ㅇ듬
              if (
                token.length() > localStorage.getItem("Access_token").length
              ) {
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
              //재발급 받은 토큰으로 다시 실행
              let config = {
                headers: {
                  "X-AUTH-TOKEN": localStorage.getItem("Access_token"),
                }, //반드시 헤더에 Access_Token을 담에서 보내야됨 그래야 Spring Security에서 확인
              };
              axios
                .put(
                  "http://localhost:8081/api/v1/post/" + postId,
                  form,
                  config
                ) //"주소", "데이터", "헤더"
                .then(() => {
                  history.push("/board");
                });
            })
            .catch((error) => {
              notification.open({
                message: "인증 실패!",
                description: "다시 로그인을 확인해 주세요",
                icon: <FrownOutlined style={{ color: "#ff3333" }} />,
              });
            }); //재발급이 error가 난거면 진자 문제 생긴거임
        });
    } else {
      console.log(form);
      axios
        .post("http://localhost:8081/api/v1/post", form, config)
        .then(() => {
          setForm({
            ...form,
            user_id: "",
            post_name: "",
            content: "",
            board_id: 5,
          });

          history.push("/board");
        })
        .catch((error) => {
          console.log(error);
          axios
            .post("/auth/refreshtoken",localStorage.getItem("Refresh_token"))//에러 발생시 Access_token 재발급을 위해 Refresh Token을 담고 있는 path 경로로 post 요청
            .then((response) => {
              const token = response.data.data; // Token이 Access만 올수도, Access&Refresh가 같이 올수도있ㅇ듬
              if (
                token.length() > localStorage.getItem("Access_token").length
              ) {
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
              //재발급 받은 토큰으로 다시 실행
              let config = {
                headers: {
                  "X-AUTH-TOKEN": localStorage.getItem("Access_token"),
                }, //반드시 헤더에 Access_Token을 담에서 보내야됨 그래야 Spring Security에서 확인
              };
              //post를 재 실행
              axios
                .post("http://localhost:8081/api/v1/post", form, config)
                .then(() => {
                  setForm({
                    ...form,
                    user_id: "",
                    post_name: "",
                    content: "",
                    board_id: 5,
                  });

                  history.push("/board");
                });
            })
            .catch((error) => {
              notification.open({
                message: "인증 실패!",
                description: "다시 로그인을 확인해 주세요",
                icon: <FrownOutlined style={{ color: "#ff3333" }} />,
              });
            }); //재발급이 error가 난거면 진자 문제 생긴거임
        });
    }
  }
  return (
    <>
      <div className="text-xl font-bold mt-5 mb-2 text-center">
        게시글 추가하기
      </div>
      <form
        className="mt-5 flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        <div style={{ width: "30%" }}>
          {/* <Input className="w-24 mr-5" type="text" color="lightBlue" size="regular" outline={true} required placeholder="작성자"
                            name='user_id' value={form.user_id} onChange={handleChange}/> */}
          <Input
            className="w-18 ml-5"
            type="text"
            color="lightBlue"
            size="regular"
            outline={true}
            required
            placeholder="제목"
            name="post_name"
            value={form.post_name}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5 w-5/6 flex justify-center">
          <Editor
            initialValue={isEdit ? form.content : ""}
            previewStyle="vertical"
            placeholder="새로운 소식을 전하세요!"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            plugins={[
              chart,
              codeSyntaxHighlight,
              colorSyntax,
              tableMergedCell,
              uml,
            ]}
            ref={editorRef}
            name="content"
            value={form.content}
            onChange={contentChange}
          />
        </div>
        <div className="text-center flex justify-end">
          <Button
            color="lightBlue"
            buttonType="outline"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            type="submit"
          >
            저장
          </Button>
          <Button
            color="gray"
            buttonType="outline"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={() => history.goBack()}
          >
            취소
          </Button>
        </div>
      </form>
    </>
  );
}

export default Post;
