DROP TABLE personne CASCADE;
DROP TABLE equipement CASCADE;
DROP TABLE commande CASCADE;
DROP TABLE bungalow CASCADE;
DROP TABLE possede CASCADE;
DROP TABLE commander CASCADE;

CREATE TABLE bungalow(
    id_bungalow serial primary key,
    stockage integer);

CREATE TABLE personne(
    id_personne serial primary key,
    nom varchar(30),
    email varchar(50),
    telephone varchar(12));

CREATE TABLE equipement(
    id_equipement serial primary key,
    nom_equipement varchar(30),
    type_equipement varchar(20),
    id_bungalow integer,
    FOREIGN KEY(id_bungalow) REFERENCES Bungalow(id_bungalow));

CREATE TABLE commander(
   id_personne integer,
   id_equipement integer,
   reservation date,
   rendu date,
   PRIMARY KEY(id_personne, id_equipement),
   FOREIGN KEY(id_personne) REFERENCES Personne(id_personne),
   FOREIGN KEY(id_equipement) REFERENCES Equipement(id_equipement)
);

CREATE TABLE possede(
   id_personne INT,
   id_equipement INT,
   heure_rendu date,
   heure_reservation date,
   PRIMARY KEY(id_personne, id_equipement),
   FOREIGN KEY(id_personne) REFERENCES Personne(id_personne),
   FOREIGN KEY(id_equipement) REFERENCES Equipement(id_equipement)
);

