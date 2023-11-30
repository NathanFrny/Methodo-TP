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

const getEquipementByName = (nomEquipement, callback) => {
  const client = getClient();
  client.connect();

  client.query(`
    SELECT 
      id_equipement
    FROM 
      equipement 
    WHERE 
      nom_equipement ILIKE $1
  `, [nomEquipement], (err, result) => {
    if (err) {
      console.error(err);
      callback(null);
    } else {
      callback(result.rows[0]); // Renvoie le premier équipement trouvé correspondant au nom, ou null si aucun équipement n'est trouvé
    }

    client.end();
  });
};

module.exports = { getEquipementByName };
