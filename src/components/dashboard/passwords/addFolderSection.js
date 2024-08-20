const AddFolderSection = ({openFoldersEditor, foldersData}) => {
    return (
        <section className="p-7 py-6 w-full mt-10 bg-white border border-gray-2 rounded flex  flex-col justify-between space-y-2">
            <span>
                You have <span className="text-purple-600">{foldersData.length} Folder</span> here
            </span>
            <button className="px-2 xl:px-4 py-3 bg-purple-1 hover:bg-cyan-600 text-white text-sm rounded duration-200" onClick={() => openFoldersEditor(true)}>
                See more
            </button>
        </section>
    )
}

export default AddFolderSection;