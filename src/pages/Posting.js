import Input from "@material-tailwind/react/Input";
import React, {useState, useRef} from 'react';
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
function Post() {
    const editorRef = useRef();

    const [form, setForm] = useState({
        user_id: '',
        post_name: ''
        // content: '',
    });

    const handleChange = (e) => {
        const {user_id, value} = e.target; // 우선 e.target 에서 user_id와 value 를 추출
        
        console.log(value)
        console.log(user_id)

        setForm({
            ...form,            // 기존의 form 객체 복사
            [user_id]: value    // user_id 키를 갖는 값을 value로 설정
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // onSaveData(form)
        console.log(form);
        
        // const editorInstance = editorRef.current.getInstance();
        // const getContent_md = editorInstance.getMarkdown();        
        // console.log("---------------Mark Down-----------------");
        // console.log(getContent_md);
        // const getContent_html = editorInstance.getHTML();
        // console.log("---------------Html-----------------");
        // console.log(getContent_html);

        setForm({
            post_name: '',
            user_id: '',
            // content: '',
        })
    }

    return (
        <>
            <div className='text-xl font-bold mt-5 mb-2 text-center'>게시글 추가하기</div>
            <form className="mt-5 flex flex-col justify-center" onSubmit={handleSubmit}>
                <div className="flex w-3/5 justify-center space-x-12">
                    <Input className="w-24 mr-5" type="text" color="lightBlue" size="regular" outline={true} required placeholder="작성자"
                            name='user_id' value={form.user_id} onChange={handleChange}/>
                    <Input className="w-24 ml-5" type="text" color="lightBlue" size="regular" outline={true} required placeholder="제목" 
                            name='post_name' value={form.post_name} onChange={handleChange}/>
                </div>
                {/* <div className="flex md:flex-row mb-3 h-12 w-3/5 justify-center">
                    <label htmlFor="username" className="w-full flex-1 mx-2 text-xs font-semibold 
                    text-gray-600 uppercase">작성자
                        <input className="w-full py-3 px-1 mt-1 
                    text-gray-800 appearance-none 
                    border-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required placeholder='이름을 입력해주세요' type='text' name='user_id' 
                            value={form.name} onChange={handleChange} />
                    </label>
                    <label htmlFor="text" className="w-full flex-1 mx-2 text-xs font-semibold 
                    text-gray-600 uppercase">제목
                        <input className="w-full py-3 px-1 mt-1 
                    text-gray-800 appearance-none 
                    border-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required placeholder='게시글의 제목을 입력해주세요' type='text' name='post_name' 
                            value={form.post_name} onChange={handleChange} />
                    </label> */}
                    {/* <Textarea class="form-textarea basis-1/4" rows="1"
                        color="lightBlue" size="regular" outline={true} placeholder="작성자" name='user_id' value={form.user_id} onChange={handleChange}/>
                    <Textarea
                        color="lightBlue" size="regular" outline={true} placeholder="제목" name='post_name' value={form.post_name} onChange={handleChange}/> */}
                {/* </div> */}
                <div className="mt-5 w-5/6 flex justify-center">
                    {/* <label htmlFor="content" className="w-full flex-1 mx-2 text-xs font-semibold 
                    text-gray-600 uppercase">내용
                        <input className="w-full py-3 px-1 mt-1 
                    text-gray-800 appearance-none 
                    border-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                            required placeholder='내용을 입력해주세요' type='text' name='content'
                            value={form.content} onChange={handleChange} /> */
                    /* </label> */}
                    {/* <Textarea color="lightBlue" size="regular" outline={true} placeholder="내용" name='content' value={form.content} onChange={handleChange}/> */}
                    <Editor initialValue="hello react editor world!"
                            previewStyle="vertical"
                            height="600px"
                            initialEditType="markdown"
                            useCommandShortcut={true}
                            plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
                            ref={editorRef} />
                </div>
                <div className='text-center'>
                    <Button color="lightBlue" buttonType="outline" size="regular" rounded={false} block={false} iconOnly={false} ripple="dark"
                            type='submit'>
                        저장
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Post;