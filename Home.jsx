/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import {addToPastes, updateToPastes} from "../redux/pasteSlice.js";
const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.paste.pastes);


  
    useEffect(() => { 
      if(pasteId) {
        const paste = allPastes.find((p) => p._id === pasteId);
         setTitle(paste.title);
         setValue(paste.content);
      }
    }, [pasteId])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(pasteId) {
      //Update
        dispatch(updateToPastes(paste));
    } else{
      //Create
        dispatch(addToPastes(paste));
    }

    //? after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  }
  return (
    <div className="mt-4">
        <div className="flex flex-row gap-8 place-content-between">
      <input
        className="p-2 rounded-2xl mt-2 w-[45%] p-l-3"
        type="text"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
       className="p-2 rounded-2xl mt-2"
       onClick={createPaste}>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>
    </div>

    <div className="mt-8">
        <textarea 
         className="rounded-2xl mt-4 min-w-[450px] p-4"
         placeholder="Enter Your Content Here"
         value={value}
         onChange={(e) => setValue(e.target.value)} 
         rows={20}
          />
      
      
    </div>
    </div>
  );
};

export default Home;
