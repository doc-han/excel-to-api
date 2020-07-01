import React, { Fragment, useState } from "react";
// import axios from axios;
import axios from "axios";
import Message from "./Message";
import Progress from "./Progress";

export default function Upload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("choose file");
  const [message, setMessage] = useState();
  const [validate, setValidate] = useState(true);
  const [uploadPercentage, setuploadPercentage] = useState(0);

  const validateFile = (e) => {
    let allowedFiles = [".xlsx", ".xlsm", ".xlsb", ".xls", ".xlw", ".xlr"];
    const regex = new RegExp(
      "([a-zA-Z0-9s_\\.-:])+(" + allowedFiles.join("|") + ")$"
    );

    try {
      if (file !== "") {
        if (!regex.test(e.target.files[0].name.toLowerCase())) {
          // setMessage("Please Upload a file  with a valid extension");
          return false;
        }
      }
      setValidate(true);

      return true;
    } catch (error) {
      setMessage("Invalid Extension");
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    // setFile(e.target.files[0]);
    if (validateFile(e)) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setMessage("Valid file");
    } else {
      setValidate(false);
      setFileName("choose file");
      setMessage("Please Upload a file  with a valid extension");

      // setMessage("Please Upload a file with a valid extension");
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    if (fileName != "choose file") {
      try {
        const res = await axios.post("http://localhost:8080/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (ProgressEvent) => {
            setuploadPercentage(
              parseInt(
                Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
              )
            );
            setTimeout(() => {
              setuploadPercentage(0);
            }, 10000);
          },
        });

        setMessage("File Uploaded Successfully");
      } catch (error) {
        if (error.response.status === 500) {
          setMessage("Problem with server");
        } else {
          setMessage("Something wrong");
        }
      }
    } else {
      setMessage("Please Choose a file");
    }
  };

  return (
    <Fragment>
      {message || !validate ? <Message msg={message} /> : null}
      <form className="mt-4" onSubmit={onSubmit}>
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
        {fileName != "choose file" ? (
          <Progress percentage={uploadPercentage} />
        ) : null}

        <input type="submit" value="Upload" className=" btn-primary btn mt-4" />
      </form>
    </Fragment>
  );
}
