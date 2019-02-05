exports.createPassword = (password) => {

    let text = "ABCDEFGHIJKLMNOPQRTSUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let newPassword = ""
    for (let j = 0; j < password.length; j++) {
        let newText = "";

        for (let i = 0; i < 20; i++) {
            newText += text.charAt(Math.floor(Math.random() * text.length));

        }

        newPassword = newPassword + password[j] + newText;
    }


    return newPassword;
}


exports.validPassword = (userPassword, dbPassword, length) => {
    let fetchpassword = "";
    for (let i = 0; i < length; i += 21) {
        fetchpassword += dbPassword[i]
    }
    if (userPassword === fetchpassword) {
        return true;
    }
    else {
        return false
    }

}