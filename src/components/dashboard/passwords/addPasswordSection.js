import AlertSection from "@/components/ui/alertSection";
import { useAuthContext } from "@/context/AuthContext";
import sanitizeData from "@/functions/sanitizeData";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayUnion, collection, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import validator from "validator";

const AddPasswordSection = ({setAccountsData, accountsData, openFoldersEditor, foldersData}) => {
    const {db, user} = useAuthContext();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [titleInputValue, setTitleInputValue] = useState("");
    const [urlInputValue, setUrlInputValue] = useState("");
    const [accountInputValue, setAccountInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const [folderIdInputValue, setFolderIdInputValue] = useState("");
    const [folderNameInputValue, setFolderNameInputValue] = useState("");

    useEffect(() => {
        if(foldersData && foldersData.length > 0) {
            setFolderIdInputValue(foldersData[0].id)
            setFolderNameInputValue(foldersData[0].name)
        }
    }, [foldersData])

    async function handleSubmit(e) {
        e.preventDefault();

        // check that all inputs are filled
        if(titleInputValue.length == 0 || urlInputValue.length == 0 || accountInputValue.length == 0 || passwordInputValue.length == 0 ) {
            setError({
                type : "incomplete_data",
                message : "Please fill in the empty input."
            })
            return null;
        }

        // check the url is valid or not
        const urlIsValid = validator.isURL(urlInputValue);
        if(!urlIsValid) {
            setError({
                type : "input_url_error",
                message : "Please enter a valid URL."
            })
            return null;
        }

        setIsLoading(true);

        const sanitizedData = await sanitizeData({title : titleInputValue, account : accountInputValue, url : urlInputValue, password : passwordInputValue});

        fetch("/api/encryption", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, password: sanitizedData.password })
        })
        .then(response => response.json())
        .then(async result => {
            const unusedDocRef = doc(collection(db, "accounts"));
            const docRef = doc(db, "accounts", user.uid)

            const dataDoc = {
                title : titleInputValue,
                url : urlInputValue,
                account : accountInputValue,
                password : result.data,
                folderId : folderIdInputValue,
                folderName : folderNameInputValue,
                id : `${folderIdInputValue}_${unusedDocRef.id}`,
                created_at: Timestamp.now()
            }

            try {
                await updateDoc(docRef, {
                    [`${folderIdInputValue}.value`] : arrayUnion(dataDoc)
                })

                setAccountsData([
                    ...accountsData,
                    dataDoc
                ])

                setError(false);
                setTitleInputValue("");
                setUrlInputValue("");
                setAccountInputValue("");
                setPasswordInputValue("");
                setFolderIdInputValue(foldersData[0].id);

                setIsLoading(false);
                setTextAlertValue("Account added");
            } catch(err) {
                setIsLoading(false);
                setError({
                    type : "server_error",
                    message : "Something went wrong, please try again later"
                })
            }
        })
        .catch(err => {
            setError({
                type : "server_error",
                message : err.message
            })
        })

    }
 
    function createNewFolderHandler (e) {
        e.preventDefault();

        openFoldersEditor(true);
    }

    // alert
    const [textAlertValue, setTextAlertValue] = useState(false);

    return (
        <>
            {/* alert */}
            {textAlertValue && 
                <AlertSection text={textAlertValue} setTextAlertValue={setTextAlertValue}/>
            }
            <section className="p-7 xl:p-10 w-full bg-white border border-gray-2 rounded flex flex-col">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-3 xl:space-y-5 mb-5">
                        <input className="w-full px-3 xl:px-5 py-3 lg:py-2 xl:py-3 border border-gray-2 rounded-[5px] active:outline-none focus:outline-none" type="text" name="title" placeholder="Title" value={titleInputValue} onChange={(e) => setTitleInputValue(e.target.value)}/>

                        <input className={`w-full px-3 xl:px-5 py-3 lg:py-2 xl:py-3 border border-gray-2 rounded-[5px] active:outline-none focus:outline-none ${(error && error.type == "input_url_error")? "border-red-500" : ""}`} type="url" name="url" placeholder="https://www.exampleurl.com" value={urlInputValue} onChange={(e) => setUrlInputValue(e.target.value)}/>

                        <input className="w-full px-3 xl:px-5 py-3 lg:py-2 xl:py-3 border border-gray-2 rounded-[5px] active:outline-none focus:outline-none" type="text" name="account" placeholder="account" value={accountInputValue} onChange={(e) => setAccountInputValue(e.target.value)}/>

                        <input className={`w-full px-3 xl:px-5 py-3 lg:py-2 xl:py-3 border border-gray-2 rounded-[5px] active:outline-none focus:outline-none`} type="password" name="password" placeholder="Password" value={passwordInputValue} onChange={(e) => setPasswordInputValue(e.target.value)}/>

                        <div className="flex flex-col space-y-1">
                            <div className="flex justify-between space-x-5">
                                <span>
                                    Select the folder 
                                </span>
                                <button className="text-sky-500 hover:text-purple-1 duration-150" onClick={createNewFolderHandler}>
                                    + Create Folder
                                </button>
                            </div>
                            <div className="bg-white border border-gray-2 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 py-1 xl:py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <select id="countries" className="w-full h-10" onChange={
                                    (e) => {
                                        const selectedOption = e.target.options[e.target.selectedIndex];

                                        setFolderIdInputValue(e.target.value)
                                        setFolderNameInputValue(selectedOption.getAttribute('data-name'))
                                    }

                                    } required>
                                    {
                                        foldersData.map((e, i) => {
                                            if(e && e.id) {
                                                return <option value={`${e.id}`} data-name={e.name} selected={i == 0? true : false}>{e.name}</option>
                                            }
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-5">
                        {
                            error && 
                            <span className="text-red-500 text-left">{error.message}</span>
                        }
                    </div>

                    <button type="submit" className="mt-1 xl:mt-5 w-full bg-purple-1 hover:bg-cyan-600 rounded-[5px] text-white py-3 xl:py-4 duration-200">
                        <div className={`${isLoading? "hidden" : "flex items-center justify-center space-x-2"}`}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <span>
                                Add
                            </span>
                        </div>
                        <div className={`${isLoading ? "flex justify-center items-center space-x-2" : "hidden"}`}>
                            <Image src={"/assets/loader/box-loader.gif"} width={32} height={32}/>
                            <span className="text-lg">
                                Loading ...
                            </span>
                        </div>
                    </button>
                </form>
            </section>
        </>
    )
}

export default AddPasswordSection; 