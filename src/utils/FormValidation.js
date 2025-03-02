export function isEmail(value) {
    return value.includes('@');
}

export function hasMinLength(value) {
    return value.length >= 5 && value.length <= 25
}

export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function isPhoneNumber(value) {
    const pattern = /^(\d{10})$/;
    return pattern.test(value);
     
}

export function isPostalCode(value)
{
    const pattern = /^(\d{5})$/;
    return pattern.test(value);
}