# La Kermesse — proposition statique

Ce livrable ne dépend ni de Node.js, ni de npm, ni d’une base de données. Déposez simplement le contenu sur un hébergeur statique.

## Structure publique

- `index.html` — accueil
- `reservation.html` — demande de table
- `assets/` — styles, scripts et images

## Réservation et e-mails

Les horaires de cuisine sont gérés côté navigateur dans `assets/js/booking.js`, en jQuery. Ils indiquent des horaires proposés, sans simuler une disponibilité de tables : une base de données ou un service de réservation sera nécessaire pour une gestion réelle des capacités.

Pour activer l’envoi d’un e-mail au restaurant et au demandeur, connectez le SMTP du propriétaire dans EmailJS, puis renseignez les cinq valeurs dans `window.LK_BOOKING_CONFIG.email` au début de `assets/js/booking.js` :

- `publicKey` — clé publique EmailJS
- `serviceId` — service EmailJS connecté au SMTP
- `ownerTemplateId` — modèle envoyé au restaurant
- `requesterTemplateId` — modèle envoyé au demandeur
- `ownerEmail` — adresse qui reçoit les demandes

EmailJS relaie l’e-mail par le SMTP configuré dans son tableau de bord ; ne placez jamais un mot de passe SMTP brut dans le fichier JavaScript. Sans ces valeurs, le formulaire reste honnête : aucune demande n’est envoyée et une indication de configuration est affichée.
