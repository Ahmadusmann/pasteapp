import React from 'react'
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-hot-toast";
import { FaEdit, FaTrash, FaShare, FaEye, FaCopy } from "react-icons/fa";

import {removeFromPastes} from "../redux/pasteSlice.js";
const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const filteredData = pastes.filter(
          (paste) => paste.title.toLowerCase()
            .includes(searchTerm.toLowerCase())
  );

  //handleDelete
    const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  return (
    <div>
      <input
       className="p-2 rounded-2xl min-w-[500px] mt-4"
       type="text"
       placeholder="Search Here"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)} 
       />

       <div className="flex flex-col gap-4 mt-4">
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className="border animate-in fade-in duration-500" key={paste?._id}>
                  <div>
                     {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className="flex flex-row
                   gap-3
                   place-content-evenly">
                    <button className="transition-transform hover:scale-105 flex items-center gap-1" title="Edit">
                      <FaEdit />
                      <a href={`/?pasteId=${paste?._id}`}>
                      </a>
                    </button>
                    <button className="transition-transform hover:scale-105 flex items-center gap-1" title="Delete"
                    onClick= {() => handleDelete(paste?._id)}>
                      <FaTrash />
                    </button>
                    {/*  homework: share button ka logic */}
                    <button className="transition-transform hover:scale-105 flex items-center gap-1" title="Share">
                      <FaShare />
                    </button>
                    <button className="transition-transform hover:scale-105 flex items-center gap-1" title="View">
                      <FaEye />
                      <a href={`/pastes/${paste?._id}`}>
                      </a>
                    </button>
                    <button className="transition-transform hover:scale-105 flex items-center gap-1" title="Copy"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied to Clipboard")
                    }}>
                      <FaCopy />
                    </button>
                   </div>
                   <div>
                    {paste.createdAt}
                   </div>
                </div>
              )
            }
          )
        }
       </div>
    </div>
  )
}

export default Paste
