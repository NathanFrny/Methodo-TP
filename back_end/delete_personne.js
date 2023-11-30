const { Client } = require('pg');
const { PASSWORD } = require("../constant.js");

const deletePersonne = (nom, email, telephone) => {
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

  // Recherche de l'ID de la personne en fonction des informations fournies
  client.query('SELECT id_personne FROM personne WHERE nom = $1 AND email = $2 AND telephone = $3', [nom, email, telephone], (err, res) => {
    if (err) {
      console.error(err);
      client.end();
    } else {
      if (res.rows.length > 0) {
        const id_personne = res.rows[0].id_personne;

        // Suppression de la personne en utilisant son ID
        client.query('DELETE FROM personne WHERE id_personne = $1', [id_personne], (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Personne supprimée avec succès !');
            // Traitez la réponse ici si nécessaire
          }

          // Fermeture de la connexion à la base de données
          client.end();
        });
      } else {
        console.log('Aucune personne trouvée avec ces informations.');
        // Fermeture de la connexion à la base de données
        client.end();
      }
    }
  });
};

module.exports = { deletePersonne };
