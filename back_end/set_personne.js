const { PASSWORD } = require("../constant.js");

const { Client } = require('pg');

var id_personne = 0;
var nom = "Dubois";
var email = "octo@gmail.com";
var telephone = "0756894356";

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

// Récupération du dernier id
client.query('SELECT COUNT(*) FROM personne', (err, res) => {
    if (err) {
      console.error(err);
    } else {
        const lastId = res.rows[0].count; // Obtention du dernier ID utilisé
        id_personne = lastId + 1; // Incrément de l'ID pour le nouvel enregistrement
    }
});

// Insertion des valeurs dans la table personne
const insertQuery = {
    text: 'INSERT INTO personne (id_personne, nom, email, telephone) VALUES ($1, $2, $3, $4)',
    values: [id_personne, nom, email, telephone],
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



