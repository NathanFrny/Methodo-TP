const { PASSWORD } = require("../constant.js");

const { Client } = require('pg');

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

// Récupération de la liste de tous les équipements
client.query('SELECT * FROM personne', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res.rows); // Résultat de la requête contenant la liste des équipements
  }
  
  // Fermeture de la connexion à la base de données
  client.end();
});

