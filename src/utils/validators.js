const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const usernameRegex = /^[a-zA-Z0-9_. ]+$/

exports.isPasswordValid = (password, rePassword) => {
    if(password !== rePassword && password.length < 8){
        throw{
            message: 'Passwords must match each-other and be at least 8 characters long...'
        }
    }
    else if(password !== rePassword){
        throw{
            message: 'Passwords must match each-other...'
        }
    }
   else if(password.length < 8 || rePassword.length < 8){
    throw{
        message: 'Passwords must be at least 8 characters long...'
    }
   }
}

exports.areFieldsEmpty = (fields) => {
    if(fields.includes(``)){throw {message:'Please enter the required information...'}}
}

exports.isEmailValid = (email) => {
    let isValid = emailRegex.test(email)
    let isStrong = email.length >= 4
    let isTooLong = email.length > 30

    const errors = []

     if(!isValid && email !== ''){
        errors.push('Please enter a valid email adress!')
    }
     if(!isStrong && email !== ''){
        errors.push('Email must be atleast 5 characters long!')
    }
     if(isTooLong){
        errors.push('Email must be maximum 20 characters long!')
     }

    if(errors.length > 0){
        throw {
            message: errors.join('/n')
        }
    }
}

exports.isUsernameValid = (username) => {
   let isValid = usernameRegex.test(username)
   let isStrong = username.length >= 5
   let isTooLong = username.length > 15
   const errors = []

   if(!isValid && username !== ''){
    errors.push('Username must contain legal characters only (A-Z, 0-9, _ , . )!')
   }
   if(!isStrong && username !== ''){
    errors.push('Username must be at least 5 characters long!')
   }
   if(isTooLong){
    errors.push('Username must maximum 15 characters long!')
   }
   if(errors.length > 0){
    throw {
        message: errors.join('/n')
    }
}
}