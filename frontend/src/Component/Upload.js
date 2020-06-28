import React, { Fragment, useState } from "react";

export default function Upload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("choose file");

  const onChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <Fragment>
      <form className="mt-4">
        <div className="custom-file mb-3 ">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>

        <input type="submit" value="Upload" className=" btn-primary btn mt-4" />
      </form>
    </Fragment>
  );
}
