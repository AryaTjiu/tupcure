import Link from "next/link";
import StarsSection from "./ui/stars";
import { DotsGroup } from "./ui/dotsGroup";
import { useEffect, useRef } from "react";

export function HeroSection() {
    const heroSectionRef = useRef();
    const parallaxElementsRef = useRef([]);

    useEffect(() => {
        const paralaxEffectFunction = (e) => {
            const {clientX, clientY} = e;
            const {innerWidth, innerHeight} = window;

            let position, x, y;

            parallaxElementsRef.current.forEach((element, i) => {
                if(i / 2 == 0) {
                    position = 0.5;

                    x = (innerWidth - clientX * position)/90;
                    y = (innerHeight - clientY * position)/90;

                    element.style.transform = `translate(${x}px, ${y}px)`;
                } else {
                    position = 1;

                    x = (innerWidth - clientX * position)/90;
                    y = (innerHeight - clientY * position)/90;

                    element.style.transform = `translate(${x}px, ${y}px)`;
                }
            })
        }

        heroSectionRef.current.addEventListener("mousemove", paralaxEffectFunction);

        return () => {
            if(heroSectionRef.current) {
                heroSectionRef.current.removeEventListener("mousemove", paralaxEffectFunction);
            }
        }
    })

    return (
        <section className="w-full min-h-screen relative px-10 2xl:px-52 flex flex-col justify-center items-center z-[10] text-center overflow-hidden" ref={heroSectionRef}>
            <div className="absolute -top-20 xl:-top-10 -left-20 xl:-left-10 w-32 h-32 bg-purple-1 rounded-full" ref={(e) => parallaxElementsRef.current[0] = e}></div >
            
            <div className="flex flex-col items-end space-y-6 absolute -top-36 xl:-top-10 -right-24 xl:-right-10">
                <div className="w-48 h-48 bg-purple-1 rounded-3xl" ref={(e) => parallaxElementsRef.current[1] = e}></div>
                <div className="w-20 flex mr-16 gap-1 flex-wrap rounded-full" ref={(e) => parallaxElementsRef.current[2] = e}>
                    <DotsGroup/>
                </div>
            </div>
            <div className="flex flex-col space-y-10 absolute -bottom-40 xl:bottom-28 -left-16">
                <div className="w-20 ml-8 flex gap-1 flex-wrap rounded-full rotate-90" ref={(e) => parallaxElementsRef.current[3] = e}>
                    <DotsGroup/>
                </div>
                <div className="w-48 h-48 bg-purple-1 rounded-3xl" ref={(e) => parallaxElementsRef.current[4] = e}></div>
            </div>

            <div className="w-40 h-40 absolute top-0 left-0 blur-[17rem] bg-yellow-400" ref={ (e) => parallaxElementsRef.current[5] = e}></div>
            <div className="w-40 h-40 absolute bottom-0 left-0 blur-[12rem] bg-purple-1" ref={(e) => parallaxElementsRef.current[6] = e}></div>
            <div className="w-40 h-40 absolute bottom-0 right-0 blur-[12rem] bg-purple-1" ref={(e) => parallaxElementsRef.current[7] = e}></div>


            {/* content */}
            <div className="space-y-8 we-full md:w-[80%] xl:w-[70%] 2xl:w-[60%] flex flex-col items-center">
                <div className="space-y-4 flex flex-col items-center">
                    <div className="flex space-x-1 items-center text-purple-1">
                        <StarsSection/>
                        <span>-</span>
                        <span className="text-sm">Reviews by our users</span>
                    </div>
                    <h1 className="text-5xl md:text-4xl xl:text-6xl 2xl:text-[5rem] font-bold leading-none">
                        The best Password <br/> manager
                    </h1>
                </div>
                <p className="text-neutral-700 text-md">
                    TupCure is meticulously crafted for individual users who seek a secure and convenient way to store and manage their personal account information.
                </p>
                <div className="flex flex-col space-y-3">
                    <div className="text-sm space-y-2 md:space-x-5">
                        <button className="w-full md:w-fit bg-purple-1 border border-purple-1 px-8 py-3 text-white hover:bg-transparent  hover:text-black duration-200">
                            Start free
                        </button>
                        <button className="w-full md:w-fit border border-purple-1 px-8 py-3 text-purple-1 hover:text-white hover:bg-purple-1 duration-200">
                            View plans and pricing
                        </button>
                    </div>
                    <span className="text-sm text-neutral-700">
                        Need help? Feel free to <Link href={"#"} className="text-purple-1 border-b border-purple-1">Email us</Link>
                    </span>
                </div>
            </div>
        </section>
    )
}