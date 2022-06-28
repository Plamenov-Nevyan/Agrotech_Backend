
exports.isPasswordValid = (password, rePassword) => {
    if(password !== rePassword){
        throw{
            message: 'Passwords must match each-other...'
        }
    }
}

exports.areFieldsEmpty = (fields) => {
    if(fields.includes(``)){throw new Error('Please enter the required information...')}
}