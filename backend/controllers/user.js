const sha1 = require('sha1');
const bcrypt = require('bcrypt');
const db = require("../config/db");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Création du nouvel utilisateur et cryptage de son mot de passe
exports.signup = (req, res, next) => {
    //Enregistrement dans la base de données
    db.query(`INSERT INTO users VALUES (NULL, '${req.body.lastname}', '${req.body.firstname}', '${req.body.password}', '${req.body.email}', 0)`,(error, results, fields) => {
      if (error) {
        return res.status(400).json("erreur");
      }
      else{
        bcrypt.hash(req.body.password, 10) 
        .then((hash) => {
          req.body.password = hash
          return res.status(201).json({
            message: 'Votre compte a bien été crée !'
          });
        });
      }
    })
};
  
  //Si utilisateur déjà existant
  exports.login = (req, res, next) => {
    db.query(`SELECT * FROM users WHERE email= ?`,[req.body.email],(error, result, field) => {
        let user = result[0]
        if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé !' });
        }
        if (sha1(req.body.password) == user.password){
          return res.status(200).json({
            userId: user.id,
            lastname: user.lastname,
            firstname: user.firstname,
            admin: user.admin,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        }
        return res.status(403).json({ message: 'Mot de passe invalide !' });  
    })
  };

  // Suppression de l'utilisateur
  exports.delete = (req, res, next) => {
    db.query(`DELETE FROM users WHERE users.id = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({error});
      }
      return res.status(200).json(result);
    });
  };