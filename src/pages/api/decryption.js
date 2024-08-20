import CryptoJS from "crypto-js";
import CryptoAES from 'crypto-js/aes'

export default async function handler (req, res) {
    if(req.method === "POST") {
        const {user, password} = req.body;

        const key = `${user.uid}ZA0_1B_x${user.email}B1_0A_C${user.createdAt}`
        const decryptedBytes = CryptoJS.AES.decrypt(password, key);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

        res.status(201).json({
            status : "success", data : decryptedText
        })

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}