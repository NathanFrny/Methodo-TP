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

const getEquipement = (callback) => {
const client = getClient();
client.connect();

client.query(`
    SELECT 
      nom_equipement
    FROM 
      equipement 
  `, (err, result) => {
    if (err) {
      console.error(err);
      callback([]);
    } else {
      callback(result.rows);
    }

    client.end();
  });
};

module.exports = { getEquipement };

