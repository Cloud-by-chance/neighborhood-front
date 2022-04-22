import React from "react";
import Td from "./Td";

<<<<<<< HEAD
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
=======
function Tr({ info, handleRemove, handleEdit }) {
  return (
    <tbody>
      {info.map((item) => {
        return (
          <Td
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            key={item.post_id}
            item={item}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
          />
        );
      })}
    </tbody>
  );
}
>>>>>>> ee1861048c006d2cb4edfa8452b1448bf89cd5ad

export default Tr;
