export const validateEmail = (value) => {
    let error;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if(!value){
        error = 'Email is Required';
    }else if(emailRegex.test(value)){
        error = 'Invalid Email'
    }
    return error;
}

export const validateName = value => {
    let error;
    if(!value){
        error = 'Name is required'
    }
    return error;
}

export const validatePassword = value => {
    let error;
    if(!value){
        error = 'Password is Required'
    }
    return error;
}

export const validatePhoneNumber = value => {
    let error;
    if(!value){
        error = 'Phone Number is required'
    }
    return error;
}

export const validationConfig = {
    name: validateName,
    email: validateEmail,
    phone: validatePhoneNumber,
    password: validatePassword
}