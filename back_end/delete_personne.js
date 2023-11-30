const { Client } = require('pg');
const { PASSWORD } = require("../constant.js");

const deletePersonne = (id_personne) => {
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

  console.log(id_personne);

  // Suppression de la personne en utilisant son ID
  client.query('DELETE FROM personne WHERE id_personne = $1', [id_personne], (err, res) => {
    if (err) {
      console.error(err);
    } else {
    }

    // Fermeture de la connexion à la base de données
    client.end();
  });
};

module.exports = { deletePersonne };
