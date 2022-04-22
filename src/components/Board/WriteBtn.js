import React, {useEffect, useState} from 'react';
import Button from "@material-tailwind/react/Button";
import { Link } from 'react-router-dom';

function WriteBtn() {

    return (
        <Link to={{
            pathname:"/post" ,
            state: { isEdit: false }
          }}>
            <Button className="flex justify-center" color="lightBlue" buttonType="outline" size="regular" rounded={false}
                    block={false} iconOnly={false} ripple="dark" >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              글 쓰기
            </Button>
          </Link>  
    )
}


export default WriteBtn;