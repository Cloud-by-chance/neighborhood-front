import React, { useState } from 'react';

function Modal ({ selectedData, handleCancel, handleEditSubmit }) {
  const [edited, setEdited] = useState(selectedData);

  const onCancel = () => {
    handleCancel();
  }

  const onEditChange = (e) => {
    setEdited({ //문법
      ...edited,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitEdit = (e) => {
    e.preventDefault();
    handleEditSubmit(edited);
  }

//   const handleEdit = (item) => {
//     setModalOn(true);
//     const selectedData = {
//       post_id: item.id,
//       post_name: item.name,
//       content: item.email
//     };
//     console.log(selectedData);
//     setSelected(selectedData);
//   };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center 
    bg-black bg-opacity-70">
      <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="font-semibold text-lg">게시글 수정하기</h3>
          <i className="fas fa-times cursor-pointer" onClick={onCancel}></i>
        </div>

        <form onSubmit={onSubmitEdit}>
          <div className="p-3">
            <div>작성자: {edited.post_id}</div>
            <div>제목: <input className='border-2 border-gray-100' type='text' name='post_name' 
            value={edited.post_name} onChange={onEditChange} /></div>
            <div>내용: <input className='border-2 border-gray-100' type='text' 
            name='content' value={edited.content} onChange={onEditChange} /></div>
          </div>
          <div className="flex justify-end items-center w-100 border-t p-3">
            <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white 
            mr-1 close-modal" onClick={onCancel}>취소</button>
            <button type='submit' className="bg-blue-600 hover:bg-blue-700 px-3 py-1 
            rounded text-white">수정</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Modal;