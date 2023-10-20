```mermaid
%% Diagrame de séquence
  sequenceDiagram
Client->App: Demander un équipement
App->Bungalow: Vérifier si le produit est disponible
App->Client: Réponse
Client->Bungalow: Si oui prendre le produit 
Bungalow->App: Mise à jour du stock
Client->Bungalow: Remise du produit
Bungalow->App: Mise à jour du stock
```
