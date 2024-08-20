import Image from "next/image";

const PasswordGeneratorSection = () => {
    return (
        <section className="w-full py-10 md:py-28 2xl:py-40 bg-white relative px-10 md:px-28 xl:px-40 2xl:px-72 flex flex-col md:flex-row items-center justify-between md:space-x-14 z-[9] space-y-3 overflow-hidden">
            <div className="hidden md:inline-block w-[50%]">
                <Image src={"/assets/images/password_generator.png"} width={100} height={100} layout="responsive"/>
            </div>
            <div className="w-full md:w-[60%] xl:w-[55%]">
                <span className="text-lg text-purple-1">Manage your password</span>
                <h2 className="text-4xl xl:text-[2.5rem] 2xl:text-5xl font-bold">GENERATE YOUR PASSWORD</h2>
                <div className="inline-block md:hidden w-full mt-10">
                    <Image src={"/assets/images/password_generator.png"} width={100} height={100} layout="responsive"/>
                </div>
                <div className="space-y-5 mt-8">
                    <p>
                        Managing your passwords effectively is key to maintaining the security of your online accounts. Our platform not only helps you store and categorize your passwords, but it also offers a powerful password generation tool. With just a click, you can create strong, unique passwords that are virtually impossible to crack. 
                    </p>
                    <p>
                        This ensures that each of your accounts is protected with a password that meets the highest security standards. By using our password generator, you eliminate the need to rely on weak or reused passwords, significantly enhancing the security of your digital life. Keep your accounts safe and secure with the ease and reliability of our password management features.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default PasswordGeneratorSection;