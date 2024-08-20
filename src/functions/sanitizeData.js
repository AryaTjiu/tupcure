import DOMPurify from 'dompurify';

export default function sanitizeData(obj) {
    let sanitizedData = {};

    for (const key in obj) {
        if(obj.hasOwnProperty(key)) {
            const value = obj[key];

            sanitizedData[key] = DOMPurify.sanitize(value);
        }
    }

    return sanitizedData;
}