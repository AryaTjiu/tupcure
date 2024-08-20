import { dashboardFeatureList } from "@/data/dashboardFeatureList";
import Image from "next/image";
import Link from "next/link";

const FeaturesSection = () => {
    return (
        <section className="flex flex-col space-y-10 mt-10">
            <div className="w-full py-3 border-b border-neutral-300">
                Features
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 2xl:gap-10">
                {dashboardFeatureList.map(e => (
                    <article className="p-5 flex items-center space-x-3 bg-white border rounded-[5px]">
                        <div className="bg-purple-1 rounded-full p-4 relative" dangerouslySetInnerHTML={{ __html : e.icon }}></div>
                        <div className="flex flex-col">
                            <span>{e.title}</span>
                            <p className="font-thin text-sm">
                                {e.description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default FeaturesSection;