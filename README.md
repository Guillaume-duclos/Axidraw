# Axidraw

Ce projet présente les phases de la Lune journalier. Les informations sont récupérées du site https://www.calendrier-365.fr, de la page (https://www.calendrier-365.fr/lune/calendrier-lunaire.html). La Lune est réprésenté à travers un canvas, la partie la plus sombre du dessin représente la partie non visible de la Lune. La partie actuellement visible est donc représenté par la partie contenant le moins de lignes.

Étapes nécessaires pour lancer le projet :

1. Démarrer le dev server de webpack : 
  
  -> Se rendre dans le dossier du projet, puis lancer la commande : npm run dev

2. Démarrer node : 

  -> Se rendre dans le dossier du projet, puis lancer la commande : npm run start
  
3. Démarrer express :

  -> Se rendre dans le dossier du projet, puis lancer la commande : curl http://localhost:3000
     Le port à écouter est le port 3000
  
Une fois les 3 étapes effectués, la page charge les données du site www.calendrier-365.fr et affiche la lune avec sa phase actuelle. Le canvas affiche le sens actuel des phases d'ombre et de clarté de la Lune.

Pour récupérer le rendu du canvas en SVG, il faut inspecter la console pour copier le code.
