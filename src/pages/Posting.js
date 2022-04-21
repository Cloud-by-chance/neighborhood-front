import Input from "@material-tailwind/react/Input";
import React, {useEffect, useState, useRef} from 'react';
import {Editor, EditorProps} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Button from "@material-tailwind/react/Button";
import {useHistory, useLocation} from 'react-router-dom';

// TOAST UI Editor Plugin
import '@toast-ui/chart/dist/toastui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import axios from "axios";

// const Post = ({onSaveData}) => {
function Post() {
    const history = useHistory();
    const editorRef = useRef();
    const location = useLocation();
    // const [isEdit, setIsEdit] = useState(location.state.isEdit);
    const isEdit = location.state.isEdit;
    const [selectedData, setSelectedData] = useState(location.state.selectedData);

    const [editorCon, setEditorCon] = useState("");
    const [form, setForm] = useState({
        user_id: '',
        post_name: '',
        content: '',
        board_id: 5
    });
    // 데이터를 보낼 Form 처리
    const handleChange = (e) => {
        const {name, value} = e.target; // 우선 e.target 에서 user_id와 value 를 추출

        setForm({
            ...form,            // 기존의 form 객체 복사
            [name]: value,    // name 키를 갖는 값을 value로 설정
            // content: "hello"
        });
    };
    // Editor가 변경할 때마다 값을 읽어오게 함.
    const contentChange = () => {
        setEditorCon(editorRef.current.getInstance().getHTML());
    }

    // 최초 한 번만 실행(Constructor 역할)
    useEffect(() => {
        const editorInstance = editorRef.current.getInstance();

        async function initializingEditor() {
            if(isEdit) {
                await axios.get("http://localhost:8081/api/v1/post/" + selectedData.post_id)
                     .then((res) => {
                        console.log(res.data)
                        setForm({
                            ...form,
                            user_id: selectedData.user_id,
                            post_name: selectedData.post_name,
                            content: res.data.content,
                        })
                    })
                     .catch((err) => {console.log(err)});
                
                console.log(form);
                editorInstance.setHTML(form.content);
            }
        }
        initializingEditor();

        // if(isEdit) {
        //     axios.get("http://localhost:8081/api/v1/post/" + selectedData.post_id)
        //         .then((res) => {
        //         console.log(res.data)
        //         setForm({
        //             ...form,
        //             user_id: selectedData.user_id,
        //             post_name: selectedData.post_name,
        //             content: res.data.content,
        //         })
                
        //     })
        //         .catch((err) => {console.log(err)});            
        // }

        // editorInstance.setHTML("Hello world!");
        const getContent_html = editorInstance.getHTML();
        
        // console.log(isEdit);

        
        setEditorCon(getContent_html);
    }, [])
    // // form이 변경될 때 마다 실행
    // useEffect(() => {
    //     console.log("It changed!");
    //     console.log(form);
    // }, [form])
    // editorCon값이 변경될 때마다 실행
    useEffect(() => {
        setForm({
            ...form,
            content: editorCon
        })
    }, [editorCon])

    function handleSubmit(e) {
        e.preventDefault();

        console.log(form);
        axios.post("http://localhost:8081/api/v1/post", form)
             .then(() => {
                setForm({
                    ...form,
                    user_id: '',
                    post_name: '',
                    content: '',
                    board_id: 5
                });

                history.push('/board')
            })
             .catch((err) => console.log(err));
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
                <div className="mt-5 w-5/6 flex justify-center">
                    <Editor initialValue={isEdit ? form.content : "Hello World!"}
                            previewStyle="vertical"
                            height="600px"
                            initialEditType="markdown"
                            useCommandShortcut={true}
                            plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
                            ref={editorRef}
                            name="content"
                            value={form.content}
                            onChange={contentChange}
                            />
                </div>
                <div className='text-center flex justify-end'>
                    <Button color="lightBlue" buttonType="outline" size="regular" rounded={false} block={false} iconOnly={false} ripple="dark"
                            type='submit'>
                        저장
                    </Button>
                    <Button color="gray" buttonType="outline" size="regular" rounded={false} block={false} iconOnly={false} ripple="dark"
                            onClick={() => history.goBack()}>
                        취소
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Post;