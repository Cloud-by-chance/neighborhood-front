import React from "react";
import Td from "./Td";

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

export default Tr;
