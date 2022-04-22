import React, {useState} from 'react';
import Button from "@material-tailwind/react/Button";
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

    }

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

export default Td;