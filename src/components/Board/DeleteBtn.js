import React, {useEffect, useState} from 'react';
import Button from "@material-tailwind/react/Button";
import { BeakerIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { getCookie } from 'utils/cookies';
import axios from "axios";

function DeleteBtn({onRemove}) {

    return (
        <>
            <Button  color="red" buttonType="outline" size="sm" rounded={false} block={false} iconOnly={false} ripple="dark" onClick={onRemove}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                    삭제
            </Button>
        </>
    )
}

export default DeleteBtn;