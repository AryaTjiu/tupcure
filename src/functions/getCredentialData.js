import firebase from "@/lib/firebase";

const db = firebase.db;

export function getCredentialData (cred, data, method) {
    let password = null;
    let passwordUpdatedAt = null;
    const userUID = cred.user.uid;

    if (method == "email-password") {
        passwordUpdatedAt = [];
        passwordUpdatedAt.push(cred.user.reloadUserInfo.passwordUpdatedAt)

        password = data.password
    }
    

    const userData = {
        uid : userUID,
        email : cred.user.reloadUserInfo.email,
        emailVerified : cred.user.reloadUserInfo.emailVerified,
        password : password,
        passwordUpdatedAt : passwordUpdatedAt,
        lastLoginAt : cred.user.reloadUserInfo.lastLoginAt,
        createdAt : cred.user.reloadUserInfo.createdAt 
    }

    return userData;
}