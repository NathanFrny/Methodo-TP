const express = require('express');
const path = require('path');
const { getCommandes } = require('./get_all_commandes'); // Importer la fonction getCommandes
const { getWaitingCommandes } = require('./get_all_waiting_commande'); // Importer la fonction getWaitingCommandes
const { getEquipement } = require('./get_all_equipements'); // Importer la fonction getEquipement
const { getAllEquipement } = require('./get_all_equipements'); // Importer la fonction getAllEquipement
const { insertPersonne } = require('./set_personne.js'); // Importer la fonction insertPersonne
const { getEquipementByName } = require('./get_equipement_by_name.js'); // Importer la fonction getEquipementByName
const { getPersonneByName } = require('./get_personne_by_name.js'); // Importer la fonction getPersonneByName
const { deletePersonne } = require('./delete_personne.js'); // Importer la fonction deletePersonne
const { deleteCommande } = require('./delete_commande.js'); // Importer la fonction deleteCommande
const { deletePossede } = require('./delete_possede.js'); // Importer la fonction deletePossede
const bodyParser = require('body-parser');
const { addCommande } = require('./add_commande.js');
const { addPossede } = require('./add_possede.js');
const { getPossede } = require('./get_all_possede.js');


const app = express();
const PORT = 3000;

// Définition du dossier contenant vos fichiers HTML, CSS, etc.
const publicDirectoryPath = path.join(__dirname, '../Site/');

// Utilisation du dossier contenant les fichiers statiques
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

// Route pour la page de commande
app.get('/commande', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'commande.html'));
});

// Route pour la page en attente de commande
app.get('/attente_commande', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'attente_commande.html'));
});

// Route pour la page de liste de commandes
app.get('/liste_commande', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'liste_commande.html'));
});

// Route pour la page de réception
app.get('/reception', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'reception.html'));
});

// Route pour la page de remise
app.get('/remise', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'remise.html'));
});


/////////////////////////// ENDPOINTS ///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint pour récupérer les données des commandes depuis la base de données
app.get('/api/commandes', (req, res) => {
    getCommandes((commandes) => {
        res.json(commandes);
      });
  });

// Endpoint pour récupérer les données des commandes depuis la base de données
app.get('/api/possede', (req, res) => {
  getPossede((possede) => {
      res.json(possede);
    });
});

app.get('/api/waitingCommandes', (req, res) => {
  getWaitingCommandes((commandes) => {
      res.json(commandes);
    });
});

app.get('/api/equipement', (req, res) => {
    getEquipement((equipement) => {
        res.json(equipement);
    })
});

app.get('/api/all_equipement', (req, res) => {
  getAllEquipement((equipement) => {
      res.json(equipement);
  })
});

// Récupérer un équipement en fonction du nom de ce dernier
app.get('/api/equipementByName', (req, res) => {
  const { nomEquipement } = req.query; // Récupération du nom d'équipement depuis la requête

  // Appel de la fonction getEquipementByName avec le nom d'équipement en paramètre
  getEquipementByName(nomEquipement, (equipement) => {
    res.json(equipement);
  });
});

// Récupérer une personne en fonction du nom de cette dernière
app.get('/api/personneByName', (req, res) => {
  const { nomPersonne } = req.query; // Récupération du nom de personne depuis la requête

  // Appel de la fonction getPersonneByName avec le nom de personne en paramètre
  getPersonneByName(nomPersonne, (personne) => {
    res.json(personne);
  });
});

// Ajouter une personne dans la base de donnée
app.post('/api/ajouter_personne', (req, res) => {
    const { nom, email, telephone } = req.body;

    // Appel de la fonction insertPersonne avec les valeurs récupérées
    insertPersonne(nom, email, telephone);

    // Envoyer une réponse indiquant que la personne a été ajoutée avec succès
    res.status(200).send('Nouvelle personne ajoutée avec succès');
});

// Ajouter une commande dans la base de donnée
app.post('/api/add_commande', async (req, res) => {
  const { id_personne, id_equipement, dateReservation } = req.body;

  // Appeler la fonction addCommande pour ajouter la commande dans la base de données
  try {
      console.log(id_equipement);
      await addCommande(id_personne, id_equipement, dateReservation, dateReservation);

      // Envoyer une réponse indiquant que la commande a été ajoutée avec succès
      res.status(200).send('Commande ajoutée avec succès');
  } catch (error) {
      console.error('Erreur :', error);
      res.status(500).send('Erreur lors de l\'ajout de la commande');
  }
});


// Ajouter une entrée dans la table possede
app.post('/api/add_possede', async (req, res) => {
  const { id_personne, id_equipement, heureReservation} = req.body;

  try {
    await addPossede(id_personne, id_equipement, heureReservation, heureReservation);

    // Envoyer une réponse indiquant que l'entrée a été ajoutée avec succès
    res.status(200).send('Entrée ajoutée avec succès dans la table possede');
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).send('Erreur lors de l\'ajout dans la table possede');
  }
});


// Supprimer une personne
app.post('/api/delete_personne', (req, res) => {
  const { id_personne } = req.body;

  // Appeler la fonction deletePersonne avec les informations de la requête
  deletePersonne(id_personne);

  // Répondre à la requête avec un statut 200
  res.status(200).send('Requête de suppression de personne reçue.');
});


// Supprimer une commande
app.post('/api/delete_commande', (req, res) => {
  // Récupérer les informations de la requête POST (nom, email, telephone)
  const { id_personne, id_equipement } = req.body;

  // Appeler la fonction deletePersonne avec les informations de la requête
  deleteCommande(id_personne, id_equipement);

  // Répondre à la requête avec un statut 200
  res.status(200).send('Requête de suppression de commande reçue.');
});


// Supprimer une remise
app.post('/api/delete_possede', (req, res) => {
  // Récupérer les informations de la requête POST (nom, email, telephone)
  const { id_personne, id_equipement } = req.body;

  // Appeler la fonction deletePersonne avec les informations de la requête
  deletePossede(id_personne, id_equipement);

  // Répondre à la requête avec un statut 200
  res.status(200).send('Requête de suppression de remise reçue.');
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});