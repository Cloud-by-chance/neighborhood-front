import React from 'react';
import Td from './Td';

function Tr ({info, handleRemove, handleEdit}) {
    return (
        <tbody>
            {
                info.map(item => {
                    return (
                        <Td key={item.post_id} item={item} handleRemove={handleRemove} handleEdit={handleEdit} info={info}/>
                    )
                })
            }
        </tbody>
    );
};

export default Tr;