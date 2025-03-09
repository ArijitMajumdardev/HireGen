import React from 'react'
import { useState } from 'react';
import { 
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  Separator,
  Toolbar
} from 'react-simple-wysiwyg';
export const RichTextEditor = ({defaultValue,onRichTextEditorChange}:{defaultValue : string,onRichTextEditorChange:(e:ContentEditableEvent)=>void}) => {
    const [value, setValue] = useState(defaultValue);

  
  return (
    <EditorProvider >
      <Editor value={value} onChange={(e) => {
        console.log(e.target.value)
        setValue(e.target.value)
        onRichTextEditorChange(e)
      }}
      
      >
    <Toolbar>
    <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />

        </Toolbar>
    </Editor>
  </EditorProvider>
  )
}
