const { Client } = require('pg');
const { PASSWORD } = require("../constant.js");

const getClient = () => {
  return new Client({
    user: 'nathanfourny',
    host: 'localhost',
    database: 'methodo',
    password: PASSWORD,
    port: 5432,
  });
};

const getPossede = (callback) => {
  const client = getClient();
  client.connect();

  client.query(`
    SELECT 
      equipement.nom_equipement, 
      possede.heure_reservation, 
      personne.nom, 
      personne.email, 
      personne.telephone
    FROM 
      possede 
    INNER JOIN 
      equipement ON possede.id_equipement = equipement.id_equipement 
    INNER JOIN 
      personne ON possede.id_personne = personne.id_personne
  `, (err, result) => {
    if (err) {
      console.error(err);
      callback([]);
    } else {
      callback(result.rows);
    }

    client.end();
  });
};

module.exports = { getPossede };