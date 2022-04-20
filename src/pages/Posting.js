import Input from "@material-tailwind/react/Input";
import React, {useEffect, useState, useRef} from 'react';
import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Button from "@material-tailwind/react/Button";

// TOAST UI Editor Plugin
import '@toast-ui/chart/dist/toastui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';

// const Post = ({onSaveData}) => {
// import tw from "twin.macro";
// const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
function Post() {
    const editorRef = useRef();

    const [editorCon, setEditorCon] = useState("");
    const [form, setForm] = useState({
        user_id: '',
        post_name: '',
        content: ''
    });

    const handleChange = (e) => {
        
        const {name, value} = e.target; // 우선 e.target 에서 user_id와 value 를 추출
        console.log({name,value})
        setForm({
            ...form,            // 기존의 form 객체 복사
            [name]: value,    // name 키를 갖는 값을 value로 설정
            // content: "hello"
        });
    };

    function contentChange() {
        const editorInstance = editorRef.current.getInstance();
        const getContent_html = editorInstance.getHTML();
        
        setEditorCon(getContent_html);
        // return new Promise(function(resolve, reject) {
        //     const editorInstance = editorRef.current.getInstance();
        //     const getContent_html = editorInstance.getHTML();
        //     resolve(getContent_html);
        // });
        

    }
    
    // useEffect(async () => {
    //     console.log(editorCon)
    //     await contentChange();
        
    //     if(editorCon != null) {
    //         setForm({
    //             ...form,
    //             content: editorCon
    //         });
    //     }

    //     console.log(form);
    // }, [editorCon])


    // async function handleSubmit(e) {
    //     e.preventDefault();

    //     contentChange();
    //     console.log(editorCon);

    //     // console.log(form);

    // }
     const OnhandleSubmit= (e) => {
        e.preventDefault();

        console.log(form);
        contentChange();
        
        console.log(editorCon);

        // console.log(form);

    }
    return (
        <>
            <div className="text-xl font-bold mt-5 mb-2 text-center">게시글 추가하기</div>
            <form className="mt-5 flex flex-col justify-center" onSubmit={OnhandleSubmit}>
                <div className="flex w-3/5 justify-center space-x-12">
                {/* <Input
                    type="text"
                    name="user_id"
                    placeholder="ID를 입력하세요"
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    name="post_name"
                    placeholder="제목을 입력하세요"
                    onChange={handleChange}
                  /> */}
                    <Input className="w-24 mr-5" type="text" color="lightBlue" size="regular" outline={true} required placeholder="작성자"
                            name="user_id" value={form.user_id} onChange={handleChange}/>
                    <Input className="w-24 ml-5" type="text" color="lightBlue" size="regular" outline={true} required placeholder="제목" 
                            name="post_name" value={form.post_name} onChange={handleChange}/>
                </div>
                <div className="mt-5 w-5/6 flex justify-center">
                    <Editor initialValue="hello react editor world!"
                            previewStyle="vertical"
                            height="600px"
                            initialEditType="markdown"
                            useCommandShortcut={true}
                            plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
                            ref={editorRef}
                            onChange ={contentChange}
                            />
                </div>
                <div className="text-center">
                    <Button color="lightBlue" buttonType="outline" size="regular" rounded={false} block={false} iconOnly={false} ripple="dark"
                            type="submit">
                        저장
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Post;