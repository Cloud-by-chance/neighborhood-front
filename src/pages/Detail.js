import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
// toast ui plugin
import "@toast-ui/chart/dist/toastui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";
import "highlight.js/styles/github.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "tui-color-picker/dist/tui-color-picker.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
// toast ui viewer
import { Viewer } from "@toast-ui/react-editor";
import { Editor } from "@toast-ui/editor";

import { useLocation } from "react-router-dom";
import axios from "axios";
import CustomViewer from "components/Board/CustomViewer";
//ssr
import NoSSR from "@mpth/react-no-ssr";
import TestContent from "components/Board/TestContent";
import { axiosInstance } from "components/api";

import Header from "../components/headers/light";
import Input from "@material-tailwind/react/Input";

function Detail() {
  const location = useLocation();
  const [selectedData, setSelectedData] = useState(location.state.selectedData);

  const viewerRef = useRef();
  // const viewerInstance = viewerRef.current.viewerInst;

  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");

  const [testCon, setTestCont] = useState("This is Test");

  // const viewer = Editor.factory({
  //     el: document.querySelector('#viewer'),
  //     viewer: true,
  //     initialValue: content
  // })

  useLayoutEffect(() => {
    // console.log(viewerRef.current.viewerInst.options.initialValue);
    // console.log(viewerRef.current.viewerInst);
    // console.log(viewerRef.current.viewerInst.setHTML("Hello"));

    // console.log(selectedData);
    let config = {
      headers: { "X-AUTH-TOKEN": localStorage.getItem("Access_token") }, //반드시 헤더에 Access_Token을 담에서 보내야됨 그래야 Spring Security에서 확인
    };
    async function initialValue() {
      const result =  
      axiosInstance.get("/api/v1/post/" + selectedData.post_id,config)
        // axios.get("http://k8s-default-ingresst-91fe9a8044-1507004944.ap-northeast-2.elb.amazonaws.com/api/v1/post/"+selectedData.post_id, config)
        .then(function (res) {
          console.log(res.data.content);
          console.log(typeof res.data.content);

          setContent({
            ...content,
            // content: JSON.stringify(res.data.content)
            content: res.data.content,
          });
          setTitle(res.data.post_name);
        }).
        catch(
          axiosInstance
          .post("/auth/refreshtoken", localStorage.getItem("Refresh_token")) //에러 발생시 Access_token 재발급을 위해 Refresh Token을 담고 있는 path 경로로 post 요청
          .then((response) => {
            
            const token = response.data.data; // Token이 Access만 올수도, Access&Refresh가 같이 올수도있ㅇ듬
            console.log(token.charAt(0))
            if (token.charAt(0) =='[') {
              //맨앞에 괄호가 있으면 토큰이 2개 온것이므로 split 작업
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
            // 실패한 작업 재실행
            // axios.get("http://k8s-default-ingresst-91fe9a8044-1507004944.ap-northeast-2.elb.amazonaws.com/api/v1/post/"+selectedData.post_id, config)
            axiosInstance.get("/api/v1/post/" + selectedData.post_id,config).then(function (res) {
              console.log(res.data.content);
              console.log(typeof res.data.content);
    
              setContent({
                ...content,
                // content: JSON.stringify(res.data.content)
                content: res.data.content,
              });
              setTitle(res.data.post_name);
            })
          })
        );

      // console.log(result.data.content);

      // viewerRef.current.viewerInst.options.initialValue=result.data.content;
      // viewerRef.current.viewerInst.toastMark.lineTexts=[result.data.content]
    }

    initialValue();
  }, []);

  useEffect(() => {
    // document.querySelector('#viewer').insertAdjacentHTML('beforeend', content)
    // document.querySelector('#viewer').innerHTML(content)
    // document.querySelector('#viewer').insertBefore(content, document.querySelector('#title'));
    console.log(content);
    console.log(content.content);
    console.log("type is : ", typeof content);
  }, [content]);

  // Rendering 시간 지연시키기
  // useEffect(() => {
  //     const delayFunc = setTimeout(() => {
  //         console.log(1)
  //     }, 10)

  //     return () => clearTimeout(delayFunc);
  // }, [])

  // useEffect(() => {
  //     setContent({ ...content })
  // }, [title])

  // function onLoading () {
  //     console.log(content)
  // }

  return (
    <>
    <Header />
    <div id="pageCon" className="flex justify-center">
        <div className="flex justify-center flex-col" style={{width: '60%'}}>
            <h1 className="font-bold text-xl mt-10">{title}</h1>
            {/* <div id="titleCon" className="flex justify-start rounded border"
                style={{height: '35px', verticalAlign: 'middle'}}
            > */}
        {/* <h1>Title</h1>
            <h1>{content}</h1> */}
                {/* <div id="title" className="flex" style={{verticalAlign: 'middle'}}>
                    
                    <h1>{title}</h1>
                </div> */}
            {/* </div> */}
            <div id="viewerCon" className="flex justify-start mt-5 border border-solid rounded"
                style={{height: '650px'}}
            >
                {/* style={{border: 'solid 1px',
                        borderRadius: '40px'
                        }}> */}
                <div id="viewer" dangerouslySetInnerHTML={{ __html: content.content }}>
                    {/* <Viewer initialValue='<h1>안녕하세요.</h1>' /> */}
                    {/* <NoSSR>
                            <Viewer initialValue={content} 
                                    ref={viewerRef}
                            />
                        </NoSSR> */}
                    {/* { !content ? <></> : <Viewer initialValue={content} />}
                        <Viewer initialValue={content}
                                // onLoadUI={ onLoading() }
                                // onShow={onLoading()}
                                ref={viewerRef} /> */}
                    {/* <h1>{content}</h1> */}
                    {/* <CustomViewer content={content}/> */}
                    {/* <TestContent content={content} /> */}
                </div>
            </div>
      </div>
    </div>
    </>
  );
}

export default Detail;
