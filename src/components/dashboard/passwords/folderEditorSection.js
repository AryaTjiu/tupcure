import AlertSection from "@/components/ui/alertSection";
import ConfirmSection from "@/components/ui/confirmSection";
import { useAuthContext } from "@/context/AuthContext";
import { faCircleCheck, faCircleExclamation, faClose, faFolder, faI, faIcicles, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField, doc, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const FolderEditorSection = ({openFoldersEditor, setFoldersData, foldersData, reloadAccountsFoldersElements}) => {
    const {db, user} = useAuthContext()

    
    const [onCreateProcess, setOnCreateProcess] = useState(false);
    const [inputProcessId, setInputProcessId] = useState(false);
    
    const [createFolderInputName, setCreateFolderInputName] = useState("my_folder");
    const [editFolderInputName, setEditFolderInputName] = useState("");

    function createFolderHandler(e) {
        e.preventDefault();

        if(createFolderInputName.length < 1) {
            return {status : "error", code : "error_text_length", message : "Text cannot be empty"}
        }

        try {
            const docRef = doc(db, "accounts", user.uid);
            
            const newIndexFolder = foldersData.length - 1 + 1
            const folderID = `${user.uid}_folder_${newIndexFolder}`

            let folderData = {
                name : createFolderInputName,
                id : folderID,
                created_at : Timestamp.now(),
                index_folder : newIndexFolder,
                value : []
            }

            updateDoc(docRef, {
                [folderID] : folderData
            })

            const newFoldersData = [
                ...foldersData,
                folderData
            ];

            setFoldersData(newFoldersData);
            setOnCreateProcess(false);

            return {status : "success", code : "success", message : "Successfully add a new folder"}
        } catch (err) {
            return {status : "error", code : "error_text_length", message : "Something went wrong"}
        }

    }

    function changeFolderNameData (id, newName) {
        let newData = [];
        foldersData.forEach(e => {
            if(e.id == id) {
                const data = {
                    id : e.id,
                    index : e.index,
                    name :editFolderInputName
                }
                newData.push(data);
            } else {
                newData.push(e);
            }
        });
        
        setFoldersData(newData);
    }

    function editFolderHandler(e) {
        e.preventDefault();

        if(editFolderInputName.length < 1) {
            return {status : "error", code : "error_text_length", message : "Text cannot be empty"}
        }

        try {
            const docRef = doc(db, "accounts", user.uid);
            updateDoc(docRef, {
                [`${inputProcessId}.name`] : editFolderInputName
            })

            changeFolderNameData(inputProcessId, editFolderInputName);

            setInputProcessId(false);

            return {status : "success", code : "success", message : "The folder name has been successfully changed"}
        } catch (err) {
            console.log(err.message)
            return {status : "error", code : "server_error", message : "something went wrong"}
        }
    }

    // alert section 
    const [textAlertValue, setTextAlertValue] = useState(false);

    // confirm section element
    const [isAgree, setIsAgree] = useState(false);
    const [resultConfirmation, setResultConfirmation] = useState(false);
    const [dataConfirmValue, setDataConfirmValue] = useState(false);

    useEffect(() => {
        if(resultConfirmation) {
            if(resultConfirmation.status) {
                updateDoc(doc(db, "accounts", user.uid), {
                    [resultConfirmation.data.field_id] : deleteField()
                }).then((result) => {
                    reloadAccountsFoldersElements();

                    let newFoldersData = [];
                    foldersData.forEach(e => {
                        if(e.id !== resultConfirmation.data.field_id) {
                            newFoldersData.push(e)
                        }
                    })
                    setFoldersData(newFoldersData)

                    setResultConfirmation(false);
                }).catch(err => {
                    setTextAlertValue("Something went wrong")
                })
                
                
            } 
        } 

        setResultConfirmation(false)
    }, [dataConfirmValue])

    return (
        <section className="flex justify-center items-center fixed w-full h-screen bg-black bg-opacity-30 -top-4 xl:-top-10 left-0 z-40">
            {/* confirm section */}
            {
                dataConfirmValue &&
                <ConfirmSection dataConfirmValue={dataConfirmValue} setDataConfirmValue={setDataConfirmValue} setResultConfirmation={setResultConfirmation}/>
            }

            {/* alert section */}
            {
                textAlertValue &&
                <AlertSection text={textAlertValue} setTextAlertValue={setTextAlertValue}/>
            }

            <div className="flex flex-col">
                <button className="w-fit bg-white hover:bg-red-100 px-4 py-2 border border-b-0 border-gray-2 rounded rounded-b-none space-x-2 duration-150" onClick={() => openFoldersEditor(false)}>
                    <FontAwesomeIcon icon={faClose}/>
                    <span>
                        Close 
                    </span>
                </button>
                <div className="w-[80vw] md:w-[70vw] lg:w-[50vw] 2xl:w-[25vw] p-10 bg-white rounded rounded-tl-none border border-gray-2">
                    <div className="flex justify-between">
                        <span>
                            My Folders
                        </span>
                        {
                            !onCreateProcess && !inputProcessId &&
                            <button className="space-x-2 text-blue-500 hover:text-purple-1 duration-150" onClick={() => setOnCreateProcess(true)}>                            
                                + Create
                            </button>
                        }
                        {
                            onCreateProcess || inputProcessId &&
                            <button className="space-x-2 text-red-500 hover:text-red-800 duration-150" onClick={() => {
                                setOnCreateProcess(false)
                                setInputProcessId(false)
                                }}>                            
                                Cancel
                            </button>
                        }
                    </div>
                    <div className="flex flex-col space-y-3 mt-7">
                        {
                            foldersData.map(e => (
                                <div className="flex items-center justify-between">
                                    {
                                        inputProcessId == e.id?
                                        <form className="w-[70%] flex items-center" onSubmit={editFolderHandler}>
                                            <div className="flex items-center space-x-2">
                                                <FontAwesomeIcon icon={faFolder} className="text-purple-1"/>
                                                <input className="border rounded border-purple-1 p-1 focus:outline-none active:outline-none w-[90%]" value={editFolderInputName} onChange={(e) => setEditFolderInputName(e.target.value)} onBlur={editFolderHandler} autoFocus></input>
                                            </div>
                                            <button type="submit"></button>
                                        </form>
                                        :
                                        <div className="space-x-2">
                                            <FontAwesomeIcon icon={faFolder} className="text-purple-1"/>
                                            <span className="text-sm md:text-lg lg:text-sm">{e.name}</span>
                                        </div>
                                    }
                                    <div className="space-x-4 text-base md:text-lg xl:text-sm">
                                        <button className="text-gray-2.5 hover:text-purple-1 duration-150" onClick={() => {
                                            setInputProcessId(e.id)
                                            setEditFolderInputName(e.name)
                                            }}>
                                            <FontAwesomeIcon icon={faPencil}/>
                                        </button>
                                        <button className="text-gray-2.5 hover:text-purple-1 duration-150" onClick={() => setDataConfirmValue({
                                                text : "All accounts in this folder will also be deleted, are you sure you want to delete this folder",
                                                field_id : e.id
                                            })}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </button>
                                    </div>
                                </div>
                            )) 
                        }

                        {/* input folder name */}
                        {
                            onCreateProcess &&
                            <form className="flex items-center justify-between" onSubmit={createFolderHandler}>
                                <div className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faFolder} className="text-purple-1"/>
                                    <input className="border rounded border-purple-1 p-1 focus:outline-none active:outline-none" value={createFolderInputName} onChange={(e) => setCreateFolderInputName(e.target.value)} onBlur={createFolderHandler} autoFocus></input>
                                </div>
                                <button type="submit"></button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FolderEditorSection;