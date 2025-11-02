/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"
const ViewPaste = () => {

  const [title, setTitle] = useState('');
   const [value, setValue] = useState('');
  
  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final Paste:", paste);
  return (
     <div className="mt-4">
        <div className="flex flex-row gap-8 place-content-between">
      <input
        className="p-2 rounded-2xl mt-2 w-[45%] p-l-3"
        type="text"
        placeholder="Enter title here"
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* <button
       className="p-2 rounded-2xl mt-2"
       onClick={createPaste}>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button> */}
    </div>

    <div className="mt-8">
        <textarea 
         className="rounded-2xl mt-4, min-w-[450px] p-4"
         placeholder="Enter Your Content Here"
         value={paste.content}
         disabled
         onChange={(e) => setValue(e.target.value)} 
         rows={20}
          />
      
      
    </div>
    </div>
  )
}

export default ViewPaste
