import { plansListData } from "@/data/plansList";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const PlansSection = () => {
    return (
        <section className="w-full min-h-[100vh] relative px-10 md:px-28 2xl:px-52 py-20 flex flex-col justify-center items-center z-[8] space-y-20" id="price">
            <div className="flex flex-col text-center font-thin text-black space-y-10 md:space-y-5 xl:space-y-10">
                <h3 className="text-4xl md:text-2xl xl:text-4xl">Pick your perfect plan</h3>
                <p className="text-neutral-900">Use our free plan or use our premium plan if you want to enjoy all our features</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
                {plansListData.map(e => (
                    <div className={`border border-neutral-600 bg-white p-10 md:p-5 px-10 xl:p-10 rounded-md flex flex-col justify-center items-center space-y-10 ${e.bestValue? "md:scale-110 border-purple-1" : ""}`}>
                        <div className="space-y-4 md:text-xs xl:text-base">
                            <div className="space-y-3 text-center">
                                <span className="text-center">{e.status}</span>
                                <div className="flex flex-col space-y-1 text-center">
                                    <h3 className="text-4xl text-purple-1">${e.price}</h3>
                                    <span className="text-sm text-neutral-800">per month</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span>{e.description}</span>
                                <ul className="space-y-1">
                                    {e.features.map(feature => (
                                        <li className="flex">
                                        <div>
                                            <Image src={`assets/check.svg`} layout="responsive" width={100} height={100}/>
                                        </div>
                                        <span className="text-sm text-neutral-800">
                                            {feature}
                                        </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <Link href={e.link}>
                                <button className="px-4 xl:px-10 py-3 bg-purple-1 text-xs xl:text-sm text-black hover:bg-purple-1 duration-150 text-white">
                                    {e.status == "free"? "Get started" : 
                                    <div className="flex items-center space-x-2">
                                        <FontAwesomeIcon icon={faLock}/>
                                        <span>
                                            Cooming soon
                                        </span>
                                    </div>
                                    }
                                </button>
                            </Link>
                            {e.bestValue && <span className="text-center font-thin text-sm">Best Value</span>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default PlansSection;