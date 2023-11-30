const { Pool } = require('pg');
const { PASSWORD } = require("../constant.js");

const pool = new Pool({
    user: 'nathanfourny',
    host: 'localhost',
    database: 'methodo',
    password: PASSWORD,
    port: 5432,
});

function addPossede(id_personne, id_equipement, heure_reservation, heure_rendu) {
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('Erreur de connexion à la base de données', err);
        }

        client.query('BEGIN', (err) => {
            if (err) {
                done();
                return console.error('Erreur de transaction', err);
            }

            const insertPossedeQuery = `
                INSERT INTO possede (id_personne, id_equipement, heure_reservation, heure_rendu)
                VALUES ($1, $2, $3, $4)`;

            const values = [id_personne, id_equipement, heure_reservation, heure_rendu];

            client.query(insertPossedeQuery, values, (err) => {
                if (err) {
                    done();
                    return console.error('Erreur lors de l\'insertion dans la table possede', err);
                }

                // Commit de la transaction
                client.query('COMMIT', (err) => {
                    if (err) {
                        done();
                        return console.error('Erreur lors du commit de la transaction', err);
                    }
                    done();
                    console.log('Tuple ajouté avec succès dans la table possede');
                });
            });
        });
    });
}

module.exports = { addPossede };
