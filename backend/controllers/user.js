const bcrypt = require('bcrypt');
const db = require("../config/db");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Création du nouvel utilisateur et cryptage de son mot de passe
exports.signup = (req, res, next) => {
  const user = req.body
  bcrypt.hash(user.password, 10) 
  .then((hash) => {
    user.password = hash
    //Enregistrement dans la base de données
    db.query(`INSERT INTO users VALUES (NULL, '${req.body.lastname}', '${req.body.firstname}', '${password}', '${email}', 0)`,(error, results, fields) => {
        if (error) {
            return res.status(400).json("erreur");
        }
        return res.status(201).json({
            message: 'Votre compte a bien été crée !'
        });
    });
  })
  .catch(error => res.status(500).json({error}));
};

//Si utilisateur déjà existant
exports.login = (req, res, next) => {
  db.query(`SELECT * FROM users WHERE email='${req.body.email}'`,() => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
              return res.status(403).json({ message: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            admin: user.admin,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })    
    .catch(error => res.status(500).json({ error }));
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