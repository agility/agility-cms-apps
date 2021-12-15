import React, { useState, useEffect, useRef } from "react"
import agilityAppSDK from '@agility/app-sdk'

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



const BlockEditor = () => {
    
	const containerRef = useRef()

    useEffect(() => {
        //get the field ready to wait for messages from the parent
        agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
            const auth = {
                websiteName: fieldSDK.websiteName,
                securityKey: fieldSDK.configValues.securityKey
            };
            //TODO: do we need this?
            const custom = {};
            const valueJS = fieldSDK.field.value ? JSON.parse(fieldSDK.field.value) : null;
            
            const editor = new EditorJS({
                autofocus: false, //setting this to true will not do anything because this is in an iframe
                holder: document.querySelector('#editorjs'),
                placeholder: "📝 Enter text, paste images/embed urls, or select a block to add here...",
                tools:{
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
                            additionalRequestData: { ...auth, ...custom }
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
                onChange: () => {
        
                    editor.save().then(outputValue => {
                        const valueJSON = JSON.stringify(outputValue)
                        fieldSDK.updateFieldValue({ fieldValue: valueJSON })
                    })
        
                },
                onReady: () => {
                    new DragDrop(editor);
                    //const undo = new Undo({editor})
        
                    if(valueJS && valueJS.blocks && valueJS.blocks.length > 0) {
                        editor.render(valueJS);
                        //undo.initialize(fieldValue);
                    }
                
                }
        
            });

        });
    }, []);

	return (
		<div style={{ background: "#fff", padding: '0 10px' }}>
            <span style={{ fontSize: '12px', background: 'rgb(251 230 171 / 48%)', color: '#fb8b00', borderRadius: '5px', padding: '3px 4px', display: 'inline-block', fontWeight: '500'}}>Block Editor (Experimental)</span>
			<div id="editorjs" ref={containerRef}>

			</div>
		</div>

	);

}

export default BlockEditor