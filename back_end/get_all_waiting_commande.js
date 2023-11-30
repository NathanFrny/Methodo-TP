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

const getWaitingCommandes = (callback) => {
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
    LEFT JOIN 
        possede p ON commander.id_personne = p.id_personne AND commander.id_equipement = p.id_equipement
    WHERE 
        p.id_personne IS NULL AND p.id_equipement IS NULL
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

module.exports = { getWaitingCommandes };