const { PASSWORD } = require("../constant.js");
const { Client } = require('pg');

const getPersonneByName = (nom, callback) => {
  // Configuration de la connexion à la base de données
  const client = new Client({
    user: 'nathanfourny',
    host: 'localhost',
    database: 'methodo',
    password: PASSWORD,
    port: 5432, // Port par défaut de PostgreSQL
  });

  // Connexion à la base de données
  client.connect();

  // Récupération de l'ID de la personne en fonction de son nom
  client.query('SELECT id_personne FROM personne WHERE nom = $1', [nom], (err, res) => {
    if (err) {
      console.error(err);
      callback(null); // En cas d'erreur, renvoyer null pour indiquer aucun résultat
    } else {
      if (res.rows.length > 0) {
        callback(res.rows[0].id_personne); // Renvoyer l'ID de la personne trouvée
      } else {
        callback(null); // Aucune personne trouvée avec ce nom
      }
    }

    // Fermeture de la connexion à la base de données
    client.end();
  });
};

module.exports = { getPersonneByName };
