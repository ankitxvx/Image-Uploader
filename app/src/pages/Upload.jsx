import React, { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState();
  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    try{
      axios
      .post("http://localhost:8080/upload", formData)
      alert("file uploaded!!!")
    }
    catch(e){
        alert("file not uploaded")
    }
  };
  return (
    <>
      <div className="  h-[100vh] w-[100vw] flex justify-center items-center ">
        <div className="  flex-col justify-center items-center  h-[300px] w-[300px]">
          <input className="mt-[100px] ml-[30px]" type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button className="bg-[#F5385D] p-3 rounded-2xl mt-2 ml-[100px]" type="button" onClick={upload}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
}
