const { useRouter } = require("next/router")

export const getCurrentPath = (currentPlainPath) => {
    if(currentPlainPath == "/dashboard") {
        return {title:"home", descriptionPath: "Home"};
    } else if(currentPlainPath == "/dashboard/generate") {
        return {title:"passwordGenerator", descriptionPath:"Generate Password"};
    } else if(currentPlainPath == "/dashboard/passwords") {
        return {title:"passwords", descriptionPath:"My passwords"};
    }
}