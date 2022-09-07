module.exports.signUpErrors = (err) => {
    let errors = {pseudo: '', email:'', password:''}


    if(err.message.includes('pseudo'))
    errors.pseudo = "Pseudo incorrect.";

    if(err.message.includes('email'))
    errors.email = "Email incorrect.";

    if(err.message.includes('password'))
    errors.password = "Mot de passe doit faire minimum 6 caractères.";


    if(err.code === 11000 && err.message.includes('pseudo') )
    errors.pseudo = 'Erreur: Un compte existant utilise ce pseudo.';

    if(err.code === 11000 && err.message.includes('email') )
    errors.email = 'Erreur: Un compte existant utilise cette addresse mail.';


    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {email:'', password:''}

    if(err.message.includes('email'));
    errors.email = "Email inconnu";
    
    if(err.message.includes('password'));
    errors.password = "Mot de passe incorrect.";

    return errors
}

module.exports.uploadErrors = (err) =>{
    let errors = {format:'', maxSize:''};

    if(err.message.includes('Invalid file'))
    errors.format = "Format incompatible "

    if(err.message.includes('Max size'))
    errors.maxSize = "Le fichier dépasse 500ko";

    return errors
}
