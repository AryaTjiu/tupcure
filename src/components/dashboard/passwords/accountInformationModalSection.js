import ConfirmSection from "@/components/ui/confirmSection";
import { useAuthContext } from "@/context/AuthContext";
import { getCleanUrl } from "@/functions/getCleanUrl";
import sanitizeData from "@/functions/sanitizeData";
import { faArrowUpRightFromSquare, faCircle, faClose, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const AccountInformationModalSection = ({data, setData, accountsData, setAccountsData}) => {
    const {db, user} = useAuthContext();
    const modalRef = useRef();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordDecrypted, setPasswordDecrypted] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetch("/api/decryption", {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ user, password: data.password })
        })
        .then(response => response.json())
        .then((result) => {
            setPasswordDecrypted(result.data);
        })
        .catch(err => {
            console.log(err.message)
        })
    }, [])

    function closeModalHandler() {
        modalRef.current.style.transform = "scale(0.5)";
        modalRef.current.style.opacity = "0%";
        setTimeout(() => {
            setPasswordDecrypted(null);
            setData(null);
        }, 60)
    }

    async function deleteAccountHandler() {
        try {
            const docRef = doc(db, "accounts", user.uid)
            let newFieldValueData = [];
            let newAccountsData = [];
            
            // get account data
            const docSnap = await getDoc(docRef);
            let docData;
            
            if(docSnap.exists()) {
                docData = Object.values(docSnap.data());
            }

            // set newFolderValue Data
            docData.forEach(e => {
                e.value.forEach(e => {
                    if(e.id !== data.id) {
                        newFieldValueData.push(e);
                    }
                })
            })

            // delete account
            updateDoc(docRef, {
                [`${data.folderId}.value`] : newFieldValueData
            })

            // set new accountsData
            accountsData.forEach(e => {
                if(e.id !== data.id) {
                    newAccountsData.push(e)
                }
            })

            setAccountsData(newAccountsData);
        }
        catch(err) {
            console.log(err.message)
        }
        
        closeModalHandler();
    }

    // edit mode handler
    const [titleInputValue, setTitleInputValue] = useState(data.title);
    const [accountInputValue, setAccountInputValue] = useState(data.account);
    const [urlInputValue, setUrlInputValue] = useState(data.url);
    const [passwordInputValue, setPasswordInputValue] = useState("");

    const [editSectionError, setEditSectionError] = useState(null);

    async function editAccountHandler() {
        try{
            const docRef = doc(db, "accounts", user.uid)
            let newFieldValueData = [];
            let newAccountsData = [];
            let newAccountData;
            var password;
            
            // get account data
            const docSnap = await getDoc(docRef);
            let docData;
            
            if(docSnap.exists()) {
                docData = Object.values(docSnap.data());
            }
    
            // password handling
            if(passwordInputValue) {
                const sanitizedData = sanitizeData({password : passwordInputValue})
                const response = await fetch("/api/encryption", {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({ user, password : sanitizedData.password })
                })
                
                const result = await response.json();
                password = result.data;
            } else {
                password = e.password;
            }

            // set newFolderValue Data
            docData.forEach(e => {
                e.value.forEach(async (e,i) => {
                    // update new field value
                    if(e.id !== data.id) {
                        newFieldValueData.push(e);
                    } else if (e.id == data.id) {
                        newAccountData = {
                            account : accountInputValue,
                            title : titleInputValue,
                            url : urlInputValue,
                            password :password, 
                            id : e.id,
                            created_at : e.created_at
                        };
    
                        newFieldValueData.push(newAccountData);
                    }
                })
            })
    
            // update contactsData
            accountsData.forEach(e => {
                if(e.id !== data.id) {
                    newAccountsData.push(e)
                } else {
                    console.log(newAccountData)
                    newAccountsData.push({
                        account : accountInputValue,
                        created_at : e.created_at,
                        folderId : e.folderId,
                        folderName : e.folderName,
                        id : e.id,
                        password : password,
                        title : titleInputValue,
                        url : urlInputValue
                    })
                }
            })

            // update field value di firebase
            updateDoc(docRef, {
                [`${data.folderId}.value`] : newFieldValueData
            })

            setAccountsData(newAccountsData);
            setData(newAccountData);
            editModeSwitchHandler(newAccountData);
        } catch(err) {
            console.log(err.message)
        }
    }

    function checkEditRequirements() {
        if(titleInputValue == data.title && accountInputValue == data.account && urlInputValue == data.url && passwordInputValue == "") {
            setEditSectionError({type : "value", message : "No changes detected. Please make modifications before saving."})
        } else {
            setDataConfirmValue({
                type : "edit_mode",
                text : "Are you sure you want to change this account data?"
            })
        }
    }
 
    function editModeSwitchHandler(data) {
        if(isEditMode) {
            setIsEditMode(false);
            setTitleInputValue(data.title);
            setAccountInputValue(data.account);
            // setFolderInputValue(data.folderName);
            setUrlInputValue(data.url);
            setPasswordInputValue("")
        } else {
            setIsEditMode(true)
        }
    }

    // confirm section 
    const [dataConfirmValue, setDataConfirmValue] = useState(null);
    const [resultConfirmation, setResultConfirmation] = useState(null);

    useEffect(() => {
        if(resultConfirmation && resultConfirmation.status) {
            switch (resultConfirmation.type) {
                case "delete_mode" : 
                    deleteAccountHandler();
                    break;
                case "edit_mode" :
                    editAccountHandler();
                    break;
                default :
            }
        }
    }, [resultConfirmation])

    return (
        <section className="absolute w-full h-full bg-black bg-opacity-20 top-0 left-0 flex items-center justify-center z-40 py-10 overflow-y-auto overflow-hidden">
            {/* confirm section */}
            {
                dataConfirmValue &&
                <ConfirmSection dataConfirmValue={dataConfirmValue} setDataConfirmValue={setDataConfirmValue} setResultConfirmation={setResultConfirmation}/>
            }

            {/* content */}
            <div className="w-fit flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-4 duration-200 mt-28" ref={modalRef}>
                <div className="w-full md:w-[40vh] xl:w-[38vh] bg-white rounded-xl border border-gray-2 overflow-hidden duration-200">
                    <div className="h-16 xl:h-24 flex justify-between bg-purple-1 px-6">
                        <div className="flex justify-center items-center bg-purple-100 border border-black w-16 xl:w-20 h-16 xl:h-20 rounded-full relative top-8 xl:top-14">
                            <img src={`${data && getCleanUrl(data.url)}/favicon.ico`} className="w-8 h-8" onError={(e) => {
                                e.target.style.display = 'none';
                            }}/>
                        </div>
                    </div>
                    <div className="mx-6 mb-5 xl:mb-10 mt-5 xl:mt-16">
                        <h6 className="font-semibold text-xl mt-10">
                            {
                                isEditMode?
                                <input className="w-full text-base font-normal p-1 px-2 border border-neutral-900" value={titleInputValue} onChange={(e) => setTitleInputValue(e.target.value)}/>
                                :
                                data && data.title
                            }
                        </h6>
                        <div className="flex flex-col mt-4"> 
                            <span className="text-sm text-neutral-600">Account</span>
                            {
                                isEditMode?
                                <input className="w-full text-base font-normal p-1 px-2 border border-neutral-900" value={accountInputValue} onChange={(e) => setAccountInputValue(e.target.value)}/>
                                :
                                <span>
                                    {data && data.account}
                                </span>
                            }
                        </div>
                        <div className="flex flex-col mt-4">
                            <span className="text-sm text-neutral-600">Folder</span>
                            <span>
                                {data && data.folderName}
                            </span>
                        </div>
                        <div className="flex flex-col mt-4">
                            <span className="text-sm text-neutral-600">Website URL</span>
                            {
                                isEditMode?
                                <input className="w-full text-base font-normal p-1 px-2 border border-neutral-900" value={urlInputValue} onChange={(e) => setUrlInputValue(e.target.value)}/>
                                :
                                <Link href={`${data? data.url : "#"}`} className="text-purple-1 flex items-center justify-between">
                                    <span>
                                        {data && data.url}
                                    </span>
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
                                </Link>
                            }
                        </div>
                        <div className="flex flex-col mt-4">
                            <span className="text-sm text-neutral-600">Password</span>
                            <div className="w-full flex justify-between items-center">
                                {
                                    isEditMode?
                                        <input className="w-full text-base font-normal p-1 px-2 border border-neutral-900" placeholder="New Password" value={passwordInputValue} onChange={(e) => setPasswordInputValue(e.target.value)}/>
                                    :
                                    <>
                                        <span>
                                            {
                                                isPasswordVisible ?
                                                    passwordDecrypted
                                                    :
                                                    "**********"
                                            }
                                        </span>
                                        
                                        {
                                            isPasswordVisible ? 
                                            <button className={`hover:text-purple-1 duration-200 ${passwordDecrypted? "text-black" : "text-neutral-500"}`} onClick={() => {
                                                if(passwordDecrypted) {
                                                    setIsPasswordVisible(false)
                                                }
                                            }}
                                            >
                                                hide
                                            </button>
                                            :
                                            <button className={`hover:text-purple-1 duration-200 ${passwordDecrypted? "text-black" : "text-neutral-500"}`} onClick={() => {
                                                if(passwordDecrypted) {
                                                    setIsPasswordVisible(true)
                                                }
                                            }}
                                            >
                                                show
                                            </button>
                                        }
                                    </>
                                    
                                }
                                
                            </div>
                        </div>
                        {
                            isEditMode &&
                            <div className="mt-3 flex flex-col space-y-2">
                                {
                                    editSectionError &&
                                    <div className="text-red-500">No changes detected. Please edit before saving.</div>
                                }
                                <button className="px-5 py-2 rounded bg-yellow-1" onClick={() => {checkEditRequirements()}}>
                                    Change
                                </button>
                            </div>
                        }
                    </div>
                </div>
                <div className="w-full md:w-[40vh] xl:w-[20vh] rounded-lg border border-gray-2 h-fit overflow-hidden">
                    <button className="w-full flex items-center bg-white hover:bg-pink-200 px-4 py-3 space-x-4 border-b duration-150" onClick={closeModalHandler}>
                        <FontAwesomeIcon icon={faClose}/>
                        <span>
                            Close 
                        </span>
                    </button>
                    {
                        isEditMode?
                        <button className="w-full flex items-center bg-white hover:bg-blue-300 px-4 py-3 space-x-4 border-b duration-150" onClick={() => setIsEditMode(false)}>
                            <FontAwesomeIcon icon={faCircle} className="text-red-700"/>
                            <span>
                                Cancel
                            </span>
                        </button>
                        :
                        <button className="w-full flex items-center bg-white hover:bg-blue-300 px-4 py-3 space-x-4 border-b duration-150" onClick={editModeSwitchHandler}>
                            <FontAwesomeIcon icon={faPen}/>
                            <span>
                                Edit
                            </span>
                        </button>
                    }
                    <button className="w-full flex items-center bg-white hover:bg-red-200 px-4 py-3 space-x-4 duration-150" onClick={(e) => {
                        setDataConfirmValue({
                            type : "delete_mode",
                            text : "Are you sure you want to delete this account?"
                        })
                    }}>
                        <FontAwesomeIcon icon={faTrash}/>
                        <span>
                            Delete
                        </span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default AccountInformationModalSection;