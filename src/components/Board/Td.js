import React from 'react';
import Button from "@material-tailwind/react/Button";
import { BeakerIcon } from '@heroicons/react/solid'

function Td ({item, handleRemove, handleEdit}) {
    const onRemove = () => {
        handleRemove(item.post_id);
    }

    const onEdit = () => {
        console.log("edit post");
        handleEdit(item);
    }

    return (
        <>
        <tr className='bg-white border-2 border-gray-200'>
            <td className='px-4 py-3'>{item.post_id}</td>
            <td className='px-4 py-3'>{item.post_name}</td>
            <td className='px-4 py-3'>{item.user_id}</td>
            <td className='px-4 py-3'>{item.update_dt}</td>
            <td className='text-center text-purple-400 cursor-pointer show-modal'>
                <Button  color="green" buttonType="outline" size="sm" rounded={false} block={false} iconOnly={false} ripple="dark" onClick={onEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                    수정
                </ Button>
                {/* <button  type="button" className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out" style={{margin: "auto"}}>
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z" opacity=".3"></path>
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                     </svg>
                     <span className="pl-2 mx-1">Save</span>
                </button> */}
            </td>
            <td className='text-center text-purple-400 cursor-pointer'>
                <Button  color="red" buttonType="outline" size="sm" rounded={false} block={false} iconOnly={false} ripple="dark" onClick={onRemove}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                    삭제
                </Button>
            </td>
        </tr>
        </>
    )
};

export default Td;