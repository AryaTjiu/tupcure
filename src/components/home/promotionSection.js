import Link from "next/link";

const PromotionSection = () => {
    return (
        <section className="w-full pt-20 pb-24 2xl:pb-40 bg-white relative px-10 md:px-28 xl:px-40 2xl:px-72 flex items-center justify-center text-white">
            <div className="w-full bg-purple-1 space-y-8 rounded-3xl p-14 2xl:p-20 text-center">
                <h1 className="font-bold text-lg 2xl:text-3xl">
                    Save your Account now, just make it online!
                </h1>
                <Link href={"/signup"} className="inline-block">
                    <button className="px-5 py-2 bg-yellow-1 hover:bg-cyan-500 duration-200 rounded text-black">
                        Start Free
                    </button>
                </Link>
            </div>
        </section>
    )
}

export default PromotionSection;