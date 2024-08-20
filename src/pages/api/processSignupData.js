import validator from "validator";
import { JSDOM } from 'jsdom'; 
import DOMPurify from 'dompurify';
import { hashingPassword } from "@/functions/password";

const window = new JSDOM('').window; 
const DOMPurifyInstance = DOMPurify(window); 

export default async function handler(req, res) {
    if(req.method == 'POST') {
        const { email, password, confirmPassword, plan } = req.body;

        // sanitize inputs
        const sanitizedEmail = DOMPurifyInstance.sanitize(email);
        const sanitizedPassword = DOMPurifyInstance.sanitize(password);
        const sanitizedConfirmPassword = DOMPurifyInstance.sanitize(confirmPassword);
        const sanitizedPlan = DOMPurifyInstance.sanitize(plan);

        // validate inputs
        if(!sanitizedEmail || !sanitizedPassword || !sanitizedConfirmPassword || !sanitizedPlan) {
            return res.status(400).json({ status : "error", code : "auth_error", message : "Please fill in the empty input"});
        }

        if(!validator.isEmail(sanitizedEmail)) {
            return res.status(400).json({ status : "error", code : "auth_error", message : "Please enter a valid email address."});
        }

        if (sanitizedPassword.length < 8) {
            return res.status(400).json({ status : "error" , code :"auth_error", message: 'Password must be at least 8 characters long' });
        }

        if (sanitizedPassword !== sanitizedConfirmPassword) {
            return res.status(400).json({ status : "error", code: "auth_error", message: 'The passwords you entered do not match. Please try again.' });
        }
        
        // hashing password
        const hashedPassword = await hashingPassword(sanitizedPassword);
        if(hashedPassword.status == "error") {
            return res.status(400).json({ status : "error", code:"hashing-password-failed", message: "Something went wrong, please try again later" });
        }

        const data = {
            email : sanitizedEmail,
            hashedPassword : hashedPassword.value,
            plan : sanitizedPlan
        }
        return res.status(201).json({status:"success", message : "success", value : data})
    } else {
        res.setHeader('Allow',['POST']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}