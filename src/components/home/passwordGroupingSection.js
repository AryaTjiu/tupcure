import Image from "next/image";

const PasswordGroupingSection = () => {
    return (
        <section className="w-full py-10 lg:py-36 2xl:py-40 bg-white relative px-10 md:px-28 xl:px-40 2xl:px-72 flex flex-col md:flex-row items-center justify-center z-[9] space-y-3 xl:space-x-14">
            <div className="lg:w-[100%] 2xl:w-[60%]">
                <span className="text-lg text-purple-1">Manage your password</span>
                <h2 className="text-4xl xl:text-[2.5rem] 2xl:text-5xl font-bold">PASSWORD GROUPING</h2>
                <div className="md:hidden w-full md:w-[30%] mt-7">
                    <Image src={"/assets/images/password_grouping.png"} width={100} height={100} layout="responsive"/>
                </div>
                <div className="space-y-5 mt-8 md:mt-4 xl:mt-8 w-full text-justify md:text-left">
                    <p>
                        Many people find it challenging to categorize their accounts, a task that's essential for maintaining an organized and secure digital life. To address this, our website offers an advanced "Folders" feature, designed to help you group your accounts and passwords according to categories that you define. 
                    </p>
                    <p>
                        With this feature, you can create customized folders—such as "Work," "Personal," or "Finance"—allowing you to save and organize your accounts in a way that best suits your needs. This flexibility not only simplifies the management of your passwords but also ensures that you can quickly access the information you need, when you need it, while keeping your digital life neatly organized.
                    </p>
                </div>
            </div>
            <div className="hidden xl:inline-block xl:w-[80%] 2xl:w-[50%]">
                <Image src={"/assets/images/password_grouping.png"} width={100} height={100} layout="responsive"/>
            </div>
        </section>
    )
}

export default PasswordGroupingSection;