import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
// toast ui plugin
import '@toast-ui/chart/dist/toastui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
// toast ui viewer
import { Viewer } from '@toast-ui/react-editor';
import { Editor } from '@toast-ui/editor'

import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CustomViewer from 'components/Board/CustomViewer';
//ssr
import NoSSR from '@mpth/react-no-ssr';
import TestContent from 'components/Board/TestContent';

function Detail() {
    const location = useLocation();
    const [selectedData, setSelectedData] = useState(location.state.selectedData);

    const viewerRef = useRef();
    // const viewerInstance = viewerRef.current.viewerInst;

    const[content, setContent] = useState([]);
    const[title, setTitle] = useState("");

    const[testCon, setTestCont] = useState("This is Test");

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
        
        async function initialValue() {
            const result = await axios
            .get("http://localhost:8081/api/v1/post/" + selectedData.post_id)
            .then(function(res) {
                
                console.log(res.data.content)
                console.log(typeof(res.data.content))

                setContent({
                    ...content,
                    // content: JSON.stringify(res.data.content)
                    content: res.data.content
                })
                setTitle(res.data.post_name)
            });

            // console.log(result.data.content);

            // viewerRef.current.viewerInst.options.initialValue=result.data.content;
            // viewerRef.current.viewerInst.toastMark.lineTexts=[result.data.content]
        }

        initialValue();
        
    }, [])

    useEffect(() => {
        // document.querySelector('#viewer').insertAdjacentHTML('beforeend', content)
        // document.querySelector('#viewer').innerHTML(content)
        // document.querySelector('#viewer').insertBefore(content, document.querySelector('#title'));
        console.log(content)
        console.log(content.content)
        console.log("type is : ", typeof(content))
        
    }, [content])

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
        <div id="title">
            {/* <h1>Title</h1>
            <h1>{content}</h1> */}
            <h1>{title}</h1>
        </div>
        <div id="viewer" dangerouslySetInnerHTML={{__html: content.content}}>
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
        </>
    )
}

export default Detail;