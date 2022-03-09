import React, { useState, useEffect, useRef } from "react"

import agilityAppSDK from '@agility/app-sdk'
import useOnScreen from "../hooks/useOnScreen"
import EditorJS from '@editorjs/editorjs'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'

import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import NestedList from '@editorjs/nested-list'
import DragDrop from 'editorjs-drag-drop'
//import Undo from 'editorjs-undo' //this has bugs...
//import LinkAutocomplete from '@editorjs/link-autocomplete' //enable this to support link autocompletes (requires env-vars)



const BlockEditor = ({ appConfig }) => {

    const containerRef = useRef()
    const blockRef = useRef()
    const [editor, setEditor] = useState({})
    const isVisible = useOnScreen(containerRef)

    const [fieldSDK, setFieldSDK] = useState(null)

    useEffect(() => {

        //get the field ready to wait for messages from the parent
        agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
            setFieldSDK(fieldSDK)

        });
    }, [appConfig]);

    useEffect(() => {
        if (!isVisible || !fieldSDK) return

        //if running locally after a hot-module replacement, don't reinitialize everything...
        if (editor && Object.keys(editor).length > 0) return;

        const uploadImagePayload = {
            websiteName: fieldSDK.websiteName,
            securityKey: fieldSDK.configValues.securityKey,
            location: fieldSDK.configValues.dcLocation,
            assetFolder: fieldSDK.configValues.assetFolder ? fieldSDK.configValues.assetFolder : ''
        };

        const valueJS = fieldSDK.field.value ? JSON.parse(fieldSDK.field.value) : null;

        const editorJS = new EditorJS({
            autofocus: false, //setting this to true will not do anything because this is in an iframe
            holder: blockRef.current,
            placeholder: "📝 Enter text, paste images/embed urls, or select a block to add here...",
            tools: {
                table: Table,
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                list: {
                    class: NestedList,
                    inlineToolbar: true
                },
                warning: Warning,
                code: Code,
                image: {
                    class: Image,
                    config: {
                        endpoints: {
                            byFile: '/api/image/uploadByFile',
                            byUrl: '/api/image/fetchByUrl'
                        },
                        additionalRequestData: { ...uploadImagePayload }
                    }
                },
                raw: Raw,
                header: Header,
                quote: Quote,
                marker: Marker,
                delimiter: Delimiter,
                inlineCode: InlineCode,
                embed: Embed,
                //enable this if you have env-vars set
                // link: {
                //     class: LinkAutocomplete,
                //     config: {
                //         endpoint: '/api/link/search',
                //         queryParam: 'q'
                //     }
                // }
            },
            onChange: (e) => {
                console.log(e)
                editorJS.save().then(outputValue => {

                    const valueJSON = JSON.stringify(outputValue)

                    console.log(valueJSON)

                    fieldSDK.updateFieldValue({ fieldValue: valueJSON })
                })

            },
            onReady: () => {

                new DragDrop(editorJS);
                //const undo = new Undo({editorJS})

                if (valueJS && valueJS.blocks && valueJS.blocks.length > 0) {
                    editorJS.render(valueJS);
                    //undo.initialize(fieldValue);
                }

            }

        });

        setEditor(editorJS);

    }, [isVisible, fieldSDK, editor])

    return (
        <div style={{ background: "#fff", padding: '0 10px', minHeight: "50px" }} ref={containerRef}>
            <div style={{ fontSize: '12px', background: '#ebebeb', borderRadius: 5, color: '#999', borderRadius: '3px', padding: '5px 21px', marginBottom: "5px", fontWeight: '500' }}>Block Editor (Beta)</div>

            <div ref={blockRef}>

            </div>

        </div>

    );

}

export default BlockEditor