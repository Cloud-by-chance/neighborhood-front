import React, { useState } from "react";
import Button from "@material-tailwind/react/Button";
<<<<<<< HEAD
import { BeakerIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { getCookie } from 'utils/cookies';
import EditBtn from './EditBtn';
import DeleteBtn from './DeleteBtn';

function Td ({item, handleRemove, handleEdit}) {
    const cookieId = getCookie("ID");
    const cookieName = decodeURIComponent(getCookie("userName"));

    const [selectedData, setSelectedData] = useState({
        post_id: item.post_id,
        post_name: item.post_name,
        user_id: item.user_id,
        update_dt: item.update_dt,
        user_name: item.nick_name
    })

    const onRemove = () => {
        if( window.confirm("정말 삭제하시겠습니까?") == true) {
            handleRemove(item.post_id);
        } else {
            return false;
        }
=======
import { BeakerIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function Td({ item, handleRemove, handleEdit }) {
  const [selectedData, setSelectedData] = useState({
    post_id: item.post_id,
    post_name: item.post_name,
    user_id: item.user_id,
    update_dt: item.update_dt,
    content: item.content,
  });
>>>>>>> ee1861048c006d2cb4edfa8452b1448bf89cd5ad

  const onRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?") == true) {
      handleRemove(item.post_id);
    } else {
      return false;
    }
  };

<<<<<<< HEAD
    const onEdit = (e) => {
        e.preventDefault();

        console.log("edit post");

        handleEdit(item);
    }

    return (
        <>
        <tr className='bg-white border-2 border-gray-200'>
            <td className='px-4 py-3'>{item.post_id}</td>
            <td className='px-4 py-3'>{item.post_name}</td>
            <td className='px-4 py-3'>{item.nick_name}</td>
            <td className='px-4 py-3'>{item.update_dt}</td>
            <td className='px-4 py-3'>
                { cookieId === selectedData.user_id ? 
                    <EditBtn selectedData={selectedData} onEdit={onEdit} /> : 
                    <Button size="sm" rounded={false} block={false} iconOnly={false} color="blueGray">권한이 없습니다.</Button>}
            </td>
            <td className='px-4 py-3'>
                { cookieId === selectedData.user_id ? <DeleteBtn onRemove={onRemove} /> : 
                <Button size="sm" rounded={false} block={false} iconOnly={false} color="blueGray">권한이 없습니다.</Button>}
            </td>
        </tr>
        </>
    )
};
=======
  const onEdit = () => {
    console.log("edit post");
    // console.log(selectedData);
    handleEdit(item);
  };
  console.log(item);

  return (
    <>
      <tr>
        <td className="px-6 py-3">{item.post_id}</td>
        <td className="px-6 py-3">{item.post_name}</td>
        <td className="px-6 py-3">{item.user_id}</td>
        <td className="px-6 py-3">{item.update_dt}</td>
        <td className=" items-stretch  text-purple-400 cursor-pointer show-modal">
          <Link
            to={{
              pathname: "/post",
              state: { isEdit: true, selectedData: selectedData },
            }}
          >
            <Button
              className="content-center"
              color="green"
              buttonType="outline"
              size="sm"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="dark"
              onClick={onEdit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              수정
            </Button>
          </Link>
        </td>
>>>>>>> ee1861048c006d2cb4edfa8452b1448bf89cd5ad

        <td className="self-center  text-purple-400 cursor-pointer">
          <Button
            color="red"
            buttonType="outline"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={onRemove}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            삭제
          </Button>
        </td>
      </tr>
    </>
  );
}

export default Td;
