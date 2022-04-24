import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
// viewer
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer, Editor } from '@toast-ui/react-editor';
// toast plugins
import '@toast-ui/chart/dist/toastui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
// ssr
import dynamic from 'next/dynamic';

function CustomViewer({content}) {
    const viewerRef = useRef();

    // Rendering 시간 지연시키기
    // useEffect(() => {
    //     const delayFunc = setTimeout(() => {
    //         console.log(1)
    //     }, 30)

    //     return () => clearTimeout(delayFunc);
    // }, [])

    useEffect(() => {
        // console.log(content)
        // const viewerInstance = viewerRef.current.getInstance();
        
        // viewerInstance.setHTML("Hello world!");
    }, [])

    return (
        <>
        <Viewer initialValue={content}
                el={document.querySelector('#viewer')}
                plugins={[[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]]}                        
                ref={viewerRef}
        />
        </>
    );
}

export default CustomViewer;