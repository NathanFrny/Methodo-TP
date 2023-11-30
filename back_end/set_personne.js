const { Client } = require('pg');
const { PASSWORD } = require("../constant.js");

const insertPersonne = (nom, email, telephone) => {
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

  // Insertion des valeurs dans la table personne
  const insertQuery = {
    text: 'INSERT INTO personne (nom, email, telephone) VALUES ($1, $2, $3)',
    values: [nom, email, telephone],
  };

  client.query(insertQuery, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Nouvelle personne insérée avec succès !');
      // Traitez la réponse ici si nécessaire
    }

    // Fermeture de la connexion à la base de données
    client.end();
  });
};

module.exports = { insertPersonne };
