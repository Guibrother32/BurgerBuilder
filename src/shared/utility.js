export const validationHandler = (value, validation) => {
    let isValid = false;

    if (validation.required) {
        isValid = (value.trim() !== '');
    } else { //this is for the selector which doesnt require a required property
        isValid = true;
    }

    if (validation.minLength) {
        isValid = (+value.length >= validation.minLength) && isValid;
    }
    if(validation.correctLength){
        isValid = (+value.length === validation.correctLength) && isValid;
    }
    if (validation.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //email regex
        isValid = pattern.test(value) && isValid;
    }
    if (validation.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
}