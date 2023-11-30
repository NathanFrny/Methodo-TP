const { Pool } = require('pg');
const pool = new Pool({
    user: 'votre_utilisateur',
    host: 'localhost',
    database: 'votre_base_de_donnees',
    password: 'votre_mot_de_passe',
    port: 5432,
});

function addCommande(id_personne, id_equipement, heure_reception, heure_renvoi) {
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('Erreur de connexion à la base de données', err);
        }

        client.query('BEGIN', (err) => {
            if (err) {
                done();
                return console.error('Erreur de transaction', err);
            }

            const insertCommandeQuery = `
                INSERT INTO commander (id_personne, id_equipement, reservation, rendu)
                VALUES ($1, $2, $3, $4)`;

            const values = [id_personne, id_equipement, heure_reception, heure_renvoi];

            client.query(insertCommandeQuery, values, (err) => {
                if (err) {
                    done();
                    return console.error('Erreur lors de l\'insertion dans la table commander', err);
                }

                // Commit de la transaction
                client.query('COMMIT', (err) => {
                    if (err) {
                        done();
                        return console.error('Erreur lors du commit de la transaction', err);
                    }
                    done();
                    console.log('Commande ajoutée avec succès');
                });
            });
        });
    });
}

module.exports = { addCommande };