const jwt = require('../services/jwt');
const moment = require("moment");
const User = require("../models/user");

function willExpireToken(token) {
  const { exp } = jwt.decodedToken(token);
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }
  return false;
}

function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  const isTokenExpired = willExpireToken(refreshToken);
  
  if(isTokenExpired) {
    res.status(404).send({ message: "El refreshToken ha expirado" });
  } else {
    const { id } = jwt.decodedToken(refreshToken);
    
    User.finOne({_id: id}, (err, userStored) => {
      if(err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if(!userStored) {
          res.status(404).send({ message: "Usuario no encontrado." });
        } else {
          res.status(200).send({
            accessToken: jwt.createAccessToken(userStored),
            refreshToken: refreshToken
          });
        }
      }
    });
  }

  //console.log(isTokenExpired);
  //console.log(refreshToken);
  //console.log("Estamos refrescando el access token.");
}

module.exports = {
    refreshAccessToken
};