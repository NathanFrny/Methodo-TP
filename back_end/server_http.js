const express = require('express');
const path = require('path');
const { getCommandes } = require('./get_all_commandes'); // Importer la fonction getCommandes
const { getEquipement } = require('./get_all_equipements'); // Importer la fonction getEquipement
const bodyParser = require('body-parser');
const { addCommande } = require('./add_commande');

const app = express();
const PORT = 3000; // Vous pouvez choisir n'importe quel port disponible

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


// Endpoint pour récupérer les données des commandes depuis la base de données
app.get('/api/commandes', (req, res) => {
    getCommandes((commandes) => {
        res.json(commandes);
      });
  });

app.get('/api/equipement', (req, res) => {
    getEquipement((equipement) => {
        res.json(equipement);
    })
});

app.post('/api/commander', (req, res) => {
    const { id_personne, id_equipement, heure_reception, heure_renvoi } = req.body;

    // Appel de la fonction addCommande avec les données envoyées depuis la page HTML
    addCommande(id_personne, id_equipement, heure_reception, heure_renvoi);

    // Répondre que la commande a été ajoutée avec succès (ajustez si nécessaire)
    res.status(200).send('Commande ajoutée avec succès');
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});