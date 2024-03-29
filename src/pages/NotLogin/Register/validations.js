export const validateEmail = (value) => {
    let error;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if(!value){
        error = 'Email is Required';
    }else if(!emailRegex.test(value)){
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
export const validateCurrentPassword = value => {
    let error;
    if(!value){
        error = 'Current password is Required'
    }
    return error;
}

export const validateNewPassword = value => {
    let error;
    if(!value){
        error = 'New password is Required'
    }
    return error;
}

export const validateConfirmPassword = value => {
    let error;
    if(!value){
        error = 'Confirm password is Required'
    }
    return error;
}
// export const validatePhoneNumber = value => {
//     let error;
//     if(!value){
//         error = 'Phone Number is required'
//     }
//     return error;
// }



export const validatePhoneNumber = value => {
    let error;
    // const phoneNumberRegex = /^[6-9]{1}[0-9]{9}$/
    const phoneNumberRegex = /^(\d{10})$/
    if(!value){
        error = 'Phone Number is required'
    } else if(!phoneNumberRegex.test(value)){
        error = 'Phone Number should be 10 digits'
    }
    return error;
}
export const validatePinCode = value => {
    let error;
    const pincodeRegex = /^(\d{6})$/
    if(!value){
        error = 'Pincode is required'
    } else if(!pincodeRegex.test(value)){
        error = 'Pincode should be  6 digits'
    }
    return error;
}


export const validateDateOfBirth = value => {
    let error;
    if(!value){
        error = 'Date of Birth is Required'
    }
    return error;
}

export const validateGender = value => {
    let error;
    if(!value){
        error = 'Gender is Required'
    }
    return error;
}


// newAddress validations

export const validateAdressLine1 = value => {
    let error;
    if(!value){
        error = 'Address line1 is Required'
    }
    return error;
}

export const validateAdressLine2 = value => {
    let error;
    if(!value){
        error = 'Address line2 is Required'
    }
    return error;
}
export const validateLandMark = value => {
    let error;
    if(!value){
        error = 'Landmark is Required'
    }
    return error;
}
export const validateCity = value => {
    let error;
    if(!value){
        error = 'City is Required'
    }
    return error;
}
export const validatestate = value => {
    let error;
    if(!value){
        error = 'State is Required'
    }
    return error;
}

export const validateTitle = value => {
    let error;
    if(!value){
        error = 'Title is Required'
    }
    return error;
}

export const validateMessage = value => {
    let error;
    if(!value){
        error = 'Message is Required'
    }
    return error;
}





export const validationConfig = {
    name: validateName,
    email: validateEmail,
    phone: validatePhoneNumber,
    dob:validateDateOfBirth,  
    gender:validateGender,
    password: validatePassword,
    pincode:validatePinCode,
    address_line_1:validateAdressLine1,
    address_line_2:validateAdressLine2,
    landmark:validateLandMark,
    city:validateCity,
    state:validatestate,
    title:validateTitle,
    message:validateMessage,
    oldpassword:validateCurrentPassword,
    newpassword:validateNewPassword,
    confirmpassword:validateConfirmPassword
}