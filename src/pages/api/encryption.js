import CryptoJS from "crypto-js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { user, password } = req.body;
        try {

            const key = `${user.uid}ZA0_1B_x${user.email}B1_0A_C${user.createdAt}`;
            const encryptedText = CryptoJS.AES.encrypt(password, key).toString();

            res.status(201).json({ status: "success", code: "success", data: encryptedText });
        } catch (error) {
            console.error('Encryption error:', error);
            res.status(500).json({ status : "error", code : "encryption-failed" ,message : 'Encryption failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}
