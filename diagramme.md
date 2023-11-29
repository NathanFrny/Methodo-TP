```mermaid
%% Diagramme de séquence
sequenceDiagram
    Client->>App: Demander un équipement
    App->>Bungalow: Vérifier disponibilité du produit
    alt Produit disponible
        Bungalow-->>App: Produit disponible
        App-->>Client: Produit disponible
        Client->>Bungalow: Prendre le produit
        Bungalow-->>App: Mise à jour du stock
        Client->>Bungalow: Remise du produit
        Bungalow-->>App: Mise à jour du stock
    else Produit non disponible
        Bungalow-->>App: Produit non disponible
        App-->>Client: Produit non disponible
    end
```
