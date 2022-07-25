export const uppercaseFirst = (str: string): string => `${str[0].toUpperCase()}${str.substr(1)}`;

export const generateOTP = (): number => {
    var digits = '0123456789';
    let OTP = '';

    for (let i = 0; i < 5; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return JSON.parse(OTP);
}