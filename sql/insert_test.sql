INSERT INTO bungalow (stockage) VALUES (10);
INSERT INTO bungalow (stockage) VALUES (15);

INSERT INTO personne (nom, email, telephone) VALUES ('Jean Dupont', 'jean@example.com', '1234567890');
INSERT INTO personne (nom, email, telephone) VALUES ('Marie Leblanc', 'marie@example.com', '9876543210');

INSERT INTO equipement (nom_equipement, type_equipement, id_bungalow) VALUES ('Tente', 'Camping', 1);
INSERT INTO equipement (nom_equipement, type_equipement, id_bungalow) VALUES ('Kayak', 'Sport nautique', 1);

INSERT INTO commander (id_personne, id_equipement, reservation, rendu) VALUES (1, 1, '2023-12-01', '2023-12-05');
INSERT INTO commander (id_personne, id_equipement, reservation, rendu) VALUES (2, 2, '2023-12-10', '2023-12-15');

INSERT INTO possede (id_personne, id_equipement, heure_rendu, heure_reservation) VALUES (1, 1, '2023-12-05', '2023-12-01');
INSERT INTO possede (id_personne, id_equipement, heure_rendu, heure_reservation) VALUES (2, 2, '2023-12-15', '2023-12-10');
