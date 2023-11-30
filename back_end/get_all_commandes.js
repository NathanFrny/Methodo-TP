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

const getCommandes = (callback) => {
  const client = getClient();
  client.connect();

  client.query(`
    SELECT 
      equipement.nom_equipement, 
      commander.reservation, 
      personne.nom, 
      personne.email, 
      personne.telephone
    FROM 
      commander 
    INNER JOIN 
      equipement ON commander.id_equipement = equipement.id_equipement 
    INNER JOIN 
      personne ON commander.id_personne = personne.id_personne
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

module.exports = { getCommandes };