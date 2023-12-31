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
    SELECT DISTINCT
      nom_equipement
    FROM 
      equipement
    LEFT JOIN 
      possede ON equipement.id_equipement = possede.id_equipement
    LEFT JOIN
      commander ON equipement.id_equipement = commander.id_equipement
    WHERE 
      possede.id_equipement IS NULL
    AND
      commander.id_equipement IS NULL
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

const getAllEquipement = (callback) => {
  const client = getClient();
  client.connect();
  
  client.query(`
      SELECT 
        *
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

module.exports = { getAllEquipement, getEquipement };


