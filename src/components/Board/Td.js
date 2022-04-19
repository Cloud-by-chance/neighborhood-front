import React from 'react';

function Td ({item, handleRemove, handleEdit}) {
    const onRemove = () => {
        handleRemove(item.post_id);
    }

    const onEdit = () => {
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
                <button onClick={onEdit} type="button" className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out" style={{margin: "auto"}}>
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z" opacity=".3"></path>
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                     </svg>
                     <span className="pl-2 mx-1">Save</span>
                </button>
            </td>
            <td className='text-center text-purple-400 cursor-pointer'>
                <button onClick={onRemove} type="button" className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out" style={{margin: "auto"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M8 9h8v10H8z" opacity=".3"></path>
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                    </svg>
                    <span className="pl-2 mx-1">Delete</span>
                </button>
            </td>
        </tr>
        </>
    )
};

export default Td;