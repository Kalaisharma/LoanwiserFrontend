import { useRef, useState, useEffect } from "react";
import binimg from "../Assets/bin.png";
function MainComponent() {
  const [popupview, setpopupview] = useState(false);
  const [docspopupview, setdocspopupview] = useState(false);
  const [nodocs, setnodocs] = useState(true);
  const [uploadview, setuploadview] = useState(false);
  const [maincontentview, setmaincontentview] = useState(false);
  const [checkalert, setcheckalert] = useState(false);
  const maincontainer = useRef();
  const fileinput = useRef();
  const docscontainerRef = useRef();
  const namecontainerref = useRef({});
  const floatcontainer = useRef();
  const [naming, setname] = useState("");
  const [allusers, setallusers] = useState([]);
  // const [usersdocs, setusersdocs] = useState([]);
  const [docsStorage, setdocsStorage] = useState({});
  
  const [showfiledetails, setshowfiledetails] = useState(false);
  const [activename, setactivename] = useState("");
  const [activedocs, setactivedocs] = useState("");
  // Scroll to bottom when items(docs added) update
  useEffect(() => {
    if (docscontainerRef.current) {
      docscontainerRef.current.scrollTop =
        docscontainerRef.current.scrollHeight;
    }
    if (checkalert) alert("Document already exists");
    setcheckalert(false);
    console.log(docsStorage, "dddddddddddddddddddddddddddddddddddddddd");
    if (docsStorage[activename]?.length === 0) {
      setnodocs(true);
      setactivedocs("");
    } else {
      setnodocs(false);
    }
  }, [docsStorage, activedocs, checkalert,activename]);
  const addingapplicant = () => {
    setpopupview(true);
    maincontainer.current.style.backgroundColor = "#D9C3A3";
  };
  const onclosename = () => {
    setpopupview(false);
    maincontainer.current.style.backgroundColor = "beige";
  };
  const onclosedocs = () => {
    setdocspopupview(false);
    maincontainer.current.style.backgroundColor = "beige";
  };

  const getname = (e) => {
    if (e.target) {
      const name = e.currentTarget.value;
      setname(name);
    }
  };
  const Savethename = () => {
    setshowfiledetails(
      false
    ); /* To hide the file details when a new user is added */
    if (naming.length > 0) {
      setmaincontentview(true);
    }
    setactivename(naming);
    const duplicateuser = allusers.find((user) => user === naming);
    if (duplicateuser) {
      alert("User already exists");
    } else {
      setallusers([...allusers, naming]);
      onclosename();
    }
  };
  const deleteUser = (name) => {
    const updatedUsers = allusers.filter((user) => user !== name);
    setallusers(updatedUsers);

    // Check AFTER deletion
    if (updatedUsers.length === 0) {
      setmaincontentview(false);
    }
console.log(showfiledetails);

    delete docsStorage[name];
  };
  const changeactivename = (e) => {
    if (docsStorage[e?.currentTarget?.id].length > 0) {
      setactivedocs(docsStorage[e?.currentTarget?.id][0]);
    }
      setactivedocs("");
    setactivename(e?.currentTarget?.id);
    Object.values(namecontainerref.current).forEach((el) => {
      if (el) el.style.backgroundColor = "rosybrown"; // Reset to default color
    });
    namecontainerref.current[e.currentTarget.id].style.backgroundColor = "gray";
    //alert(e.currentTarget.id);
  };

  const changeactivedocs = (e) => {
    setactivedocs(e?.currentTarget.id);
    // alert(e.currentTarget.id);
    //   const kkObject = docsStorage[activename]?.find((item) => e.currentTarget.id in item); // Checking whether the key is present in the object
    // if (kkObject) {
    //     console.log("KK Object:", kkObject);
    //     console.log("KK Values:", kkObject[e.currentTarget.id]);
    //     // Splitting the value based on comma as per the format (name,type,size) in the object's value
    //     const splitValues = kkObject[e.currentTarget.id]?.split(",");
    //     alert(splitValues[0]);
    //     console.log("KK Values (Split):", splitValues);
    //       SetFileDetails({
    //         name: splitValues[0],
    //         type: splitValues[1],
    //         size: splitValues[2],
    //       });
    //   } else {
    //     console.log("KK key not found.");
    //     alert("KK key not found.");
    //     console.log("KK Object:", kkObject[e.currentTarget.id]==='');

    //   }
  };
  const namebinding = () => {
    return allusers?.map((user) => {
      return (
        <>
          <div className="usernamecontainer" ref={(el) => (namecontainerref.current[user] = el)}>
            <span id={user} onClick={(e) => changeactivename(e)}>
              {user}
            </span>
            <img
              src={binimg}
              alt=""
              className="binimage"
              onClick={() => deleteUser(user)}
            />
          </div>
        </>
      );
    });
  };
  const docsbinding = () => {
    return docsStorage[activename]?.map((user) => {
      return (
        <>
          <button
            className="usernamecontainer docslabel"
            onClick={(e) => changeactivedocs(e)}
            id={Object.keys(user)}
          >
            <span>{Object.keys(user)}</span>
          </button>
        </>
      );
    });
  };
  const addingDocs = () => {
    setdocspopupview(true);
    setuploadview(true);
    maincontainer.current.style.backgroundColor = "#D9C3A3";
  };
  //   const chooseFile = () => {
  //     fileinput.current.click();
  //     fileinput.current.onchange = (e) => {
  //       console.log(e.target.files[0]);
  //       SetFileDetails({name:e.target.files[0].name,type:e.target.files[0].type,size:Math.round(e.target.files[0].size/1024)+'KB'}); // Getting file name, type and size in kb
  //       console.log(e.target.files[0].name);
  //       console.log(e.target.files[0].type);
  //       console.log(e.target.files[0].size / 1024);
  // alert(activedocs);
  // const object = {
  //   [activedocs]: `${e.target.files[0].name},${e.target.files[0].type},${e.target.files[0].size} KB`, // Creating an object with the document name and the file details
  // }; // Creating an object with the document name and the file details
  // setdocsStorage((prevData) => ({
  //   ...prevData,
  //   [activename]: prevData[activename]
  //     ? [...prevData[activename], object]
  //     : [object], // Adding the object name and checking whether the key is already present or not if present then adding the object to the existing array else creating a new array with the object
  // }));
  //       setshowfiledetails(true);
  //     }
  //     };
  const chooseFile = () => {
    if (!docsStorage[activename]) {
      alert("Please add a document");
      return;
    }
    if (activedocs === "") {
      alert("Please select a document");
      return;
    }
    fileinput.current.click();

    fileinput.current.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return; // Prevent errors if no file is selected

      console.log(file);

      // SetFileDetails({
      //   name: file.name,
      //   type: file.type,
      //   size: Math.round(file.size / 1024) + "KB",
      // });

      // alert(activedocs);
      setdocsStorage((prevData) => {
        const existingDocs = prevData[activename] || []; // Get existing docs or empty array

        // Create the new object with file details
        const newObject = {
          [activedocs]: `${file.name},${file.type},${Math.round(
            file.size / 1024
          )} KB,Pending`,
        };

        // Check if activedocs already exists
        const updatedDocs = existingDocs.map((doc) =>
          doc[activedocs] !== undefined ? newObject : doc
        );

        // If activedocs was found and updated, return the modified array
        if (JSON.stringify(updatedDocs) !== JSON.stringify(existingDocs)) {
          return { ...prevData, [activename]: updatedDocs };
        }

        // If activedocs doesn't exist, add it as a new entry
        return {
          ...prevData,
          [activename]: [...existingDocs, newObject],
        };
      });
      
      setshowfiledetails(true);
    };
  };

  const Savethedocname = () => {
    //SetFileDetails({name:'',type:'',size:''});

    setactivedocs(naming);

    setdocsStorage((prevData) => {
      const existingDocs = prevData[activename] || []; // Get existing docs or empty array

      // Check if 'naming' already exists
      const isDocExists = existingDocs.some((doc) =>
        doc.hasOwnProperty(naming)
      );

      if (isDocExists) {
        setcheckalert(true);
        return prevData; // Return the same state if it already exists (No duplicate)
      }

      // If not, add the new doc
      return {
        ...prevData,
        [activename]: [
          ...existingDocs,
          { [naming]: "Your file will be displayed here" },
        ],
      };
    });
    setnodocs(false);
    //setusersdocs([...usersdocs, naming]);
    onclosedocs();
    setshowfiledetails(false);
  };
  const UploadFile = () => {
    if (activedocs === "") {
      alert("No document name selected");
      return;
    }
    const existingDoc = docsStorage[activename] || [];
    console.log(existingDoc, "Uploading");
    console.log(activedocs, activename, "available");
    // Find the object where activedocs is a key
    const foundDoc = existingDoc.find((doc) => doc.hasOwnProperty(activedocs));

    console.log(foundDoc[activedocs], " jjjjjkghkjjjkklh");
    if (foundDoc[activedocs] === "Your file will be displayed here") {
      alert("Please choose a file to upload");
      return;
    }
    let status = foundDoc[activedocs].split(",")[3];
    let updated = "";
    if (status !== "Uploaded") {
      updated = foundDoc[activedocs]
        .split(",")
        .slice(0, -1)
        .concat("Uploaded")
        .join(",");
      console.log(updated, "updated");
    } else {
      return;
    }
    setdocsStorage((prevData) => {
      const existingDocs = prevData[activename] || []; // Get existing docs or empty array

      // Create the new object with file details
      const newObject = {
        [activedocs]: updated,
      };

      // Check if activedocs already exists
      const updatedDocs = existingDocs.map((doc) =>
        doc[activedocs] !== undefined ? newObject : doc
      );

      // If activedocs was found and updated, return the modified array
      if (JSON.stringify(updatedDocs) !== JSON.stringify(existingDocs)) {
        return { ...prevData, [activename]: updatedDocs };
      }

      // If activedocs doesn't exist, add it as a new entry
      return {
        ...prevData,
        [activename]: [...existingDocs, newObject],
      };
    });
  };
  const DeleteFile = () => {
    if (activedocs === "") {
      alert("Please select a document to delete");
      return;
    }
    setdocsStorage((prevData) => {
      const existingDocs = prevData[activename] || []; // Get existing docs or empty array
      const updatedDocs = existingDocs.filter(
        (doc) => !doc.hasOwnProperty(activedocs)
      );
      return { ...prevData, [activename]: updatedDocs };
    });
    setshowfiledetails(false);
    onclosedocs();
  };
  const OnNext = () => {
    if (Object.keys(docsStorage).length <= 0 && activename === "") {
      alert("Add User")
    } else {
      const foundUser = allusers.findIndex((user) => user === activename);
      Object.values(namecontainerref.current).forEach((el) => {
        if (el) el.style.backgroundColor = "rosybrown"; // Reset to default color
      });
      if (foundUser + 1 < allusers.length) {
        setactivename(allusers[foundUser + 1]);
        if (namecontainerref.current[allusers[foundUser + 1]]) {
          namecontainerref.current[allusers[foundUser + 1]].style.backgroundColor = "gray";
        }
      } else {
        setactivename(allusers[0]);
                if (namecontainerref.current[allusers[0]]) {
                  namecontainerref.current[
                    allusers[0]
                  ].style.backgroundColor = "gray";
                }
      }
    }
  }
  const OnBack = () => {
    if (Object.keys(docsStorage).length <= 0 && activename === "") {
      alert("Add User");
    } else {
      const foundUser = allusers.findIndex((user) => user === activename);
      Object.values(namecontainerref.current).forEach((el) => {
        if (el) el.style.backgroundColor = "rosybrown"; // Reset to default color
      });
      if (foundUser -1 >=0) {
        setactivename(allusers[foundUser - 1]);
        if (namecontainerref.current[allusers[foundUser -1]]) {
          namecontainerref.current[
            allusers[foundUser - 1]
          ].style.backgroundColor = "gray";
        }
      } else {
        setactivename(allusers[allusers.length-1]);
        if (namecontainerref.current[allusers[allusers.length - 1]]) {
          namecontainerref.current[
            allusers[allusers.length - 1]
          ].style.backgroundColor = "gray";
        }
      }
    }
  };
  return (
    <div className="maincontainer" ref={maincontainer}>
      <h1>Loan Wiser</h1>
      <div className="header">
        <h2>Documents Upload</h2>
        <button className="applicantbutton" onClick={addingapplicant}>
          + Add Applicant
        </button>
      </div>
      <div className="namecontainer">{namebinding()}</div>
      {maincontentview && (
        <div className="maincontentcontainer">
          <div className="adddocumentcontainer" ref={docscontainerRef}>
            {nodocs && <h3>No Documents Available</h3>}
            {docsbinding()}
            <button className="applicantbutton adddoc" onClick={addingDocs}>
              Add Documents
            </button>
          </div>
          {uploadview && (
            <div className="uploadcontainer">
              <div className="files box">
                <input type="file" className="choosefile" ref={fileinput} />
                <button onClick={chooseFile}>Choose</button>
                <button onClick={() => UploadFile()}>Upload</button>
                <button onClick={() => DeleteFile()}>Delete</button>

                {docsStorage[activename]
                  ?.flatMap((obj) =>
                    obj[activedocs] ? obj[activedocs].split(",")[3] : ""
                  )
                  .includes("Uploaded") ? (
                  <button
                    style={{
                      backgroundColor: "olivedrab",
                      width: "fit-content",
                    }}
                  >
                    Uploaded
                  </button>
                ) : (
                  <button style={{ backgroundColor: "orangered" }}>
                    Pending
                  </button>
                )}
              </div>
              <div className="drag box">
                {
                  <p>
                    {/* { // Find "activedocs" and split its values into an array
const kkValues = data.Kalai.find(item => item.KK !== undefined)?.KK.split(",");} */}
                    {
                      // docsStorage[activename]?.find((item) => item.activedocs !== undefined)
                      //   ?.activedocs?.split(",")[0] || FileDetails.name
                      docsStorage[activename]?.flatMap((obj) =>
                        obj[activedocs] ? obj[activedocs].split(",")[0] : ""
                      )
                    }
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <br></br>
                    {
                      // docsStorage?.activename?.find((item) => item.activedocs !== undefined)
                      //   ?.activedocs?.split(",")[1] || FileDetails.type
                      docsStorage[activename]?.flatMap((obj) =>
                        obj[activedocs] ? obj[activedocs].split(",")[1] : ""
                      )
                    }
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {
                      /* {docsStorage?.activename
                      ?.find((item) => item.activedocs !== undefined)
                      ?.activedocs?.split(",")[2] || FileDetails.size} */
                      docsStorage[activename]?.flatMap((obj) =>
                        obj[activedocs] ? obj[activedocs].split(",")[2] : ""
                      )
                    }
                  </p>
                }
              </div>
            </div>
          )}
        </div>
      )}
      ;
      <div className="footer">
        <button className="back footerbutton" onClick={() => OnBack()}>Back</button>
        <button className="next footerbutton" onClick={()=>OnNext()}>Next</button>
      </div>
      <div className="float" ref={floatcontainer}>
        {popupview && (
          <div className="popupcontainer">
            <div className="popupheader">
              <h3>Add Applicant</h3>
              <h3 onClick={onclosename} id="adduserpops">
                X
              </h3>
            </div>
            <div className="popupcontent">
              <label htmlFor="name" className="popuplabel">
                Name
              </label>
              <input
                type="text"
                id="username"
                className="popupinput"
                onChange={getname}
              />
            </div>
            <div className="popupfooter">
              <button className="save footerbutton2" onClick={Savethename}>
                Save
              </button>
              <button className="cancel footerbutton2">Cancel</button>
            </div>
          </div>
        )}
      </div>
      <div className="float" ref={floatcontainer}>
        {docspopupview && (
          <div className="popupcontainer">
            <div className="popupheader">
              <h3>Add Document</h3>
              <h3 name="docspops" onClick={onclosedocs}>
                X
              </h3>
            </div>
            <div className="popupcontent">
              <label htmlFor="name" className="popuplabel">
                Document Name
              </label>
              <input
                type="text"
                id="name"
                className="popupinput"
                onChange={getname}
              />
            </div>
            <div className="popupfooter">
              <button className="save footerbutton2" onClick={Savethedocname}>
                Save
              </button>
              <button className="cancel footerbutton2">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default MainComponent;
