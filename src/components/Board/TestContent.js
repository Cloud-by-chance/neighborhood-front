import { Content } from 'antd/lib/layout/layout';
import React, {useEffect} from 'react';

function TestContent({content}) {
    useEffect(() => {
        console.log("TestContent : ", content);
    })

    return (
        <></>
    )
}

export default TestContent;