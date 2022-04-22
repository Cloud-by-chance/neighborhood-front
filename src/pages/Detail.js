import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
// toast ui
import '@toast-ui/chart/dist/toastui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import '@toast-ui/editor/dist/toastui-editor.css';
// import CustomViewer from '../components/Board/CustomViewer';
import {Viewer} from '@toast-ui/react-editor';
// import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
// tailwind
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";

import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const viewerRef = useRef();
    const location = useLocation();
    const [selectedData, setSelectedData] = useState(location.state.selectedData);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    // useLayoutEffect(() => {

        
    // }, [])

    useLayoutEffect(() => {
        // const viewerInstance = viewerRef.current.getInstance();

        // console.log(selectedData)
        // console.log(content)

        async function setInitialValue() {
            const result = await axios
            .get("http://localhost:8081/api/v1/post/" + selectedData.post_id);

            setContent(result.data.content)
            setTitle(result.data.post_name)
        }
        
        setInitialValue();
    }, [])

    useEffect(() => {
        // console.log("content : ", content);
    }, [content])

    useEffect(() => {
        // console.log("title : ", title);
    }, [title])
    return (
        <>
        <div className='text-xl font-bold mt-5 mb-2 text-center'>게시글</div>

            <div style={{width: '30%'}} >
                <h3>{title}</h3>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <div className="mt-5 w-5/6 flex justify-start" sylte={{height: "50%"}}>
            {/* <Viewer initialValue={content}
                        height="600px"
                        plugins={[[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]]}                        
             /> */}
                {/* <Viewer initialValue="게시물 읽기 페이지"
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
                        ref={editorRef}
                        viewer= {true}
                        name="content"
                        /> */}
                {/* <CustomViewer content={content} /> */}
            </div>
            </div>
        </>
    )
}

export default Detail;