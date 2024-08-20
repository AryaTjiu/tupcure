import { featureListData } from "@/data/featureList";
import Image from "next/image";

const FeatureSection = () => {
    return (
        <section className="w-full min-h-[100vh] bg-white relative px-10 md:px-32 xl:px-40 2xl:px-52 py-14 md:py-20 flex flex-col justify-center z-[9] space-y-10">
            <div className="">
                <span className="text-lg text-purple-1">Our feature</span>
                <h2 className="text-5xl font-bold">WHY US?</h2>
            </div>
            <p className="w-full xl:w-[60%]">
                TupCure offers simplicity for managing your personal data. With advanced encryption and an easy-to-use interface, your passwords and sensitive information are always safe and accessible.
            </p>
            <div className="w-full xl:w-[85%] grid md:grid-cols-2 gap-10 ">
                {
                    featureListData.map(e => (
                        <div className="w-full flex flex-col xl:flex-row xl:items-center xl:space-x-10 space-y-3 xl:space-y-0 bg-purple-0.1 p-5 px-8 rounded-xl">
                            <div className="w-[25%] md:w-[20%] xl:w-[15%] p-5 xl:p-0 bg-purple-200 xl:bg-transparent rounded-full xl:rounded-none">
                                <Image src={`assets/${e.img}.svg`} width={300} height={300} layout="responsive"></Image>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-neutral-800">
                                    {e.text}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
        // <section className="w-full min-h-[100vh] bg-white relative px-52 flex flex-col justify-center z-[9] space-y-10">
        //     <div className="">
        //         <span className="text-sm">choose your plan</span>
        //         <h2 className="text-5xl">Our feature</h2>
        //     </div>
        //     <div className="w-full grid md:grid-cols-2 gap-10 gap-x-20">
        //         {
        //             featureListData.map(e => (
        //                 <div className="flex items-center space-x-10">
        //                     <div className="w-[25%]">
        //                         <Image src={`assets/${e.img}.svg`} width={300} height={300} layout="responsive"></Image>
        //                     </div>
        //                     <div className="flex flex-col">
        //                         <h5 className="text-xl">
        //                             {e.title}
        //                         </h5>
        //                         <p className="text-neutral-800">
        //                             {e.text}
        //                         </p>
        //                         {(e.isPremiumPlan)? <span className="text-yellow-1">premium plan</span> : <span className="text-sky-blue-1">free plan</span>}
        //                     </div>
        //                 </div>
        //             ))
        //         }
        //     </div>
        // </section>
    )
}

export default FeatureSection;