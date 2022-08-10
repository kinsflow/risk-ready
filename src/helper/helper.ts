export const uppercaseFirst = (str: string): string => `${str[0].toUpperCase()}${str.substr(1)}`;

export const generateOTP = (): number => {
    var digits = '0123456789';
    let OTP = '';

    for (let i = 0; i < 5; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return JSON.parse(OTP);
}


export const setEmptyFieldToNull = (obj: any) => {
    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
            obj[key].map(o => {
                if (typeof o === 'object') {
                    setEmptyFieldToNull(o);
                }
            })
        } else if (typeof obj[key] === 'string') {
            if (obj[key].trim() === '') {
                obj[key] = null;
            }
        } else if (typeof obj[key] === 'object') {
            setEmptyFieldToNull(obj[key]);
        }
    });
    return obj;
}