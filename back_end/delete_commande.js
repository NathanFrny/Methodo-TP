const { Client } = require('pg');
const { PASSWORD } = require("../constant.js");

const deleteCommande = (id_personne, id_equipement) => {
  const client = new Client({
    user: 'nathanfourny',
    host: 'localhost',
    database: 'methodo',
    password: PASSWORD,
    port: 5432,
  });

  client.connect();

  client.query('DELETE FROM commander WHERE id_personne = $1 AND id_equipement = $2', [id_personne, id_equipement], (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Tuple supprimé avec succès !');
    }

    client.end();
  });
};

module.exports = { deleteCommande };
