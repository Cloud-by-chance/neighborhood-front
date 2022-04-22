import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
// toast ui
import '@toast-ui/chart/dist/toastui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import '@toast-ui/editor/dist/toastui-editor.css';
import {Viewer} from '@toast-ui/editor/dist/toastui-editor-viewer';

function CustomViewer() {

    // useEffect(() =>{
    //     console.log(content)
    // })

    // return (
    //     <Viewer initialValue={content}
    //                     height="600px"
    //                     plugins={[[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]]}                        
    //     />
    // )
}

export default CustomViewer();