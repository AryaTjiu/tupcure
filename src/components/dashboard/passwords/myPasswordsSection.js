import { faArrowUpRightFromSquare, faCaretDown, faCircleXmark, faEye, faEyeLowVision, faEyedropper, faFolder, faListDots, faListSquares, faPencil, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddPasswordSection from "./addPasswordSection";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import AddFolderSection from "./addFolderSection";
import FolderEditorSection from "./folderEditorSection";
import Link from "next/link";
import AccountInformationModalSection from "./accountInformationModalSection";
import { getCleanUrl } from "@/functions/getCleanUrl";

const MyPasswordsSection = () => {
    const {db, user} = useAuthContext();

    const [foldersEditorIsOpen, setFoldersEditorIsOpen] = useState(false)

    const [accountsFoldersElements, setAccountsFoldersElements] = useState([]);
    const [accountsData, setAccountsData] = useState(false);
    const [foldersData, setFoldersData] = useState([]);

    async function getDocData() {
        const docSnap = await getDoc(doc(db, "accounts", user.uid));
        return docSnap;
    }

    async function setAccountsFoldersElementsHandler(accountsData) {
        const elements = accountsData.map((e) => {
            return (
                <button key={e.url} className="w-full bg-white hover:bg-neutral-100 h-fit p-3 px-5 xl:p-5 border-b rounded flex space-x-5 items-center relative group duration-200" onClick={() => setAccountInformationData(e)}>
                    <div className="flex justify-center items-center bg-purple-100 w-14 h-14 rounded-full">
                        <div className="w-5 h-5">
                            <img src={`${getCleanUrl(e.url)}/favicon.ico`} onError={(e) => {
                                e.target.style.display = 'none';
                            }}/>
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-semibold text-lg">{e.title}</span>
                        <div className="flex items-center space-x-1">
                            <span className="text-sm text-neutral-600">Folder :</span>
                            <span>
                                {e.folderName}
                            </span>
                        </div>
                    </div>
    
                    <span className="absolute top-5 right-5 group-hover:text-purple-1 duration-200">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
                    </span>
                </button>
            )
        })

        setAccountsFoldersElements(elements);
    }

    async function reloadAccountsFoldersElements() {
        const result = await getDocData();

        if(result.exists()) {
            const accountsFolderData = result.data();
            let accounts = [];
            let foldersData = [];
                    
            for (let key in accountsFolderData) {
                const {name, id, index_folder, value} = accountsFolderData[key];

                foldersData.push(
                    {
                        name : name, 
                        id : id,
                        index : index_folder
                    }
                );

                value.map((e) => {
                    accounts.push({...e, folderName : name, folderId : id});
                })
            }
            
            setAccountsData(accounts);
            setFoldersData(foldersData);
        } else {
            console.log("data not found");
        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                reloadAccountsFoldersElements()
            } catch (error) {
                console.error("Error fetching documents: ", error);
            }
        };

        fetchData()
    }, [])

    useEffect(() => {
        if(accountsData) {
            setAccountsFoldersElementsHandler(accountsData);
        }
    }, [accountsData])

    // account information modal
    const [accountInformationData, setAccountInformationData] = useState(false);

    // add password section modal - mobile only
    const [isAddPasswordSectionOpened, setIsAddPasswordSectionOpened] = useState(false);

    return (
        <>
            {
                accountInformationData &&
                <AccountInformationModalSection data={accountInformationData} setData={setAccountInformationData} accountsData={accountsData} setAccountsData={setAccountsData}/>
            }

            <section className="flex flex-col mt-0 xl:mt-5 space-y-4 xl:space-y-10 overflow-hidden">
                {/* add password and folder section in lg size */}
                <div className="flex xl:hidden justify-end">
                    <button className="" onClick={() => setIsAddPasswordSectionOpened(true)}>
                        + add
                    </button>
                    <div className={`h-screen ${isAddPasswordSectionOpened? "scale-100 opacity-100" : "scale-0 opacity-0"} bg-black bg-opacity-20 absolute top-0 left-0 flex justify-center items-center xl:hidden p-10 w-full overflow-y-auto duration-75 z-30`}>
                        <div className="w-full md:w-[40vh] lg:w-[60vh] flex flex-col items-end space-y-5 mt-10 md:mt-16">
                            <button className="bg-white text-black py-2 px-5 mt-10 lg:mt-20 rounded border border-gray-2" onClick={() => setIsAddPasswordSectionOpened(false) }>
                                Close
                            </button>
                            <AddPasswordSection setAccountsData={setAccountsData} openFoldersEditor={setFoldersEditorIsOpen} accountsData={accountsData} foldersData={foldersData}/>
                            <AddFolderSection openFoldersEditor={setFoldersEditorIsOpen} foldersData={foldersData}/>
                        </div>
                    </div>
                </div>

                {/* password mapping */}
                <div className="w-full h-fit flex flex-col xl:flex-row items-start justify-between space-y-10 xl:space-y-0 xl:space-x-10">
                    {
                        accountsFoldersElements[0] ?
                            <div className="flex flex-col w-full xl:w-[70%] min-h-20 rounded border border-gray-2">
                                {
                                    accountsFoldersElements.map(e => e)
                                }
                            </div>
                            :
                            <div className="flex flex-col items-center justify-center w-full xl:w-[70%] p-5 min-h-[70vh] bg-white border border-gray-2 rounded">
                                <div>
                                    No Account Data Saved
                                </div>
                            </div>
                    }
                    
                    <div className="hidden xl:inline-block w-full xl:w-[30%] overflow-y-auto">
                        <AddPasswordSection setAccountsData={setAccountsData} openFoldersEditor={setFoldersEditorIsOpen} accountsData={accountsData} foldersData={foldersData}/>
                        <AddFolderSection openFoldersEditor={setFoldersEditorIsOpen} foldersData={foldersData}/>
                    </div>
                </div>

                {/* folder editor section */}
                {foldersEditorIsOpen &&
                    <FolderEditorSection openFoldersEditor={setFoldersEditorIsOpen} setFoldersData={setFoldersData} foldersData={foldersData} reloadAccountsFoldersElements={reloadAccountsFoldersElements}/>
                }
            </section>
        </>
    )
}

export default MyPasswordsSection;