import showAlertSection from "@/components/ui/alertSection";
import AlertSection, { setAlertTextValue } from "@/components/ui/alertSection";
import { passwordStrength } from "check-password-strength";
import { RSC_ACTION_CLIENT_WRAPPER_ALIAS } from "next/dist/lib/constants";
import Image from "next/image"
import { useState } from "react"

const GeneratePasswordSection = () => {
    // password generator settings
    const [copyToClipboardValue, setCopyToClipboardValue] = useState(false);

    const defaultCharacterLength = 8;
    const [CharacterLength, setCharacterLength] = useState(defaultCharacterLength);
    
    const rangeSlideHandler = (e) => {
        setCharacterLength(e);
    }

    const [isIncludeNumber, setIsIncludeNumber] = useState(true);
    const [isIncludeLowercaseCharacter, setIsIncludeLowercaseCharacter] = useState(true);
    const [isIncludeUppercaseCharacter, setIsIncludeUppercaseCharacter] = useState(true);
    const [isIncludeSymbols, setIsIncludeSymbols] = useState(true);
    const [isExcludeSimilarChars, setIsExcludeSimilarChars] = useState(true);

    const [GeneratedPassword, setGeneratedPassword] = useState(["","",""]);
    const generator = require('generate-password');

    const generatePasswordHandler = (e) => {
        e.preventDefault();

        let generated = generator.generateMultiple(3, {
            length : CharacterLength,
            uppercase : isIncludeUppercaseCharacter,
            lowercase : isIncludeLowercaseCharacter,
            numbers : isIncludeNumber,
            symbols : isIncludeSymbols,
            excludeSimilarCharacters : isExcludeSimilarChars
        })

        if(generated[0].length !== 0 && generated[1].length !== 0 && generated[2].length !== 0) {
            setGeneratedPassword(generated);
        }
    }

    // alert
    const [textAlertValue, setTextAlertValue] = useState(false);

    return (
        <section className="flex flex-col space-y-5 xl:space-y-10 overflow-hidden">
            <div className="w-full border-b border-neutral-300"></div>
            {/* content */}
            <div className="flex flex-col xl:flex-row justify-between space-y-5 xl:space-y-0">
                <div className="w-full xl:w-[66%] flex flex-col space-y-7 xl:space-y-10">
                    <section className="w-full py-10 xl:py-16 pb-14 lg:pb-10 xl:pb-20 px-7 xl:px-20 bg-white border border-gray-2.5 rounded flex flex-col space-y-5 xl:space-y-7">
                        {GeneratedPassword.map((e,i) => (
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between items-center">
                                    <span>
                                        Result {i + 1}
                                    </span>
                                    <span>
                                        {e && passwordStrength(e).value}
                                    </span>
                                </div>
                                <div className="p-2 px-3 h-12 w-full border border-gray-2.5 bg-white rounded flex justify-between items-center text-gray-1 relative">
                                    <div className="w-[90%] overflow-x-auto">
                                        <text className="truncate">
                                            {e}
                                        </text>
                                    </div>
                                    <button className="cursor-pointer" onClick={() => {
                                        navigator.clipboard.writeText(e);
                                        setCopyToClipboardValue(e);
                                        setTextAlertValue("Copied to clipboard");
                                    }}>
                                        {
                                            (copyToClipboardValue && copyToClipboardValue == e)? 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="purple" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                        }
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>
                    <section className="w-full py-10 px-7 xl:px-20 bg-white border border-gray-2.5 rounded">    
                        <div class="flex flex-col">
                            <label for="price-range" class="block text-gray-700 font-bold mb-2">Password Length</label>
                            <input type="range" id="price-range" class="w-full accent-indigo-600" min="4" max="100" defaultValue={defaultCharacterLength} onInput={(e) => rangeSlideHandler(e.target.value)}/>
                            <span className="mt-3">
                                Character = {CharacterLength}
                            </span>
                        </div>
                    </section>
                </div>
                <section className="w-full xl:w-[30%] p-7 xl:p-10 bg-white border border-gray-2.5 overflow-hidden rounded">
                    <form action="" className="h-full flex flex-col justify-between" onSubmit={(e) => generatePasswordHandler(e)}>
                        <div className="flex flex-col space-y-5">
                            <h3 className="text-xl">Settings</h3>
                            <div className="flex flex-col space-y-2">
                                <div className="flex space-x-5">
                                    <input type="checkbox" name="includeNumbers" id="numbers" checked={isIncludeNumber} onChange={(e) => setIsIncludeNumber(e.target.checked)}></input>
                                    <label for="numbers">
                                        Include numbers
                                    </label>
                                </div>
                                <div className="flex space-x-5">
                                    <input type="checkbox" name="includeLowercaseCharacter" id="lowercaseCharacter" checked={isIncludeLowercaseCharacter} onChange={(e) => setIsIncludeLowercaseCharacter(e.target.checked)}></input>
                                    <label for="lowercaseCharacter">
                                        Include lowercase characters
                                    </label>
                                </div>
                                <div className="flex space-x-5">
                                    <input type="checkbox" name="includeUppercaseCharacter" id="uppercaseCharacter" checked={isIncludeUppercaseCharacter} onChange={(e) => setIsIncludeUppercaseCharacter(e.target.checked)}></input>
                                    <label for="uppercaseCharacter">
                                        Include uppercase characters
                                    </label>
                                </div>
                                <div className="flex space-x-5">
                                    <input type="checkbox" name="includeSymbols" id="symbols" checked={isIncludeSymbols} onChange={(e) => setIsIncludeSymbols(e.target.checked)}></input>
                                    <label for="symbols">
                                        Include symbols
                                    </label>
                                </div>
                                <div className="flex space-x-5">
                                    <input type="checkbox" name="ExcludeSimilarChars" id="excludeSimilarChars" checked={isExcludeSimilarChars} onChange={(e) => setIsExcludeSimilarChars(e.target.checked)}></input>
                                    <label for="excludeSimilarChars">
                                        Exclude similar chars
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="bg-purple-1 text-white w-full py-4 text-center mt-7 xl:mt-10">
                            {(GeneratedPassword[0].length !== 0 && GeneratedPassword[1].length !== 0 && GeneratedPassword[2].length !== 0)? "Regenerate password" : "Generate password"}
                        </button>
                    </form>
                    
                </section>
            </div>

            {/* alert */}
            {textAlertValue && 
                <AlertSection text={textAlertValue} setTextAlertValue={setTextAlertValue}/>
            }
        </section>
    )
}

export default GeneratePasswordSection