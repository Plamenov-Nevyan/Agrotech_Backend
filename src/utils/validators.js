
exports.isPasswordValid = (password, rePassword) => {
    if(password !== rePassword){
        throw{
            message: 'Passwords must match each-other...'
        }
    }
}