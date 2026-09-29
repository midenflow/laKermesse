# La Kermesse — V3 réservation

Cette version remplace entièrement DISH par une réservation persistante. La page publique reste en français et les réglages livrés sont **DEMO UNIQUEMENT** : aucune règle réelle de capacité, d’horaires ou de politique n’a été inventée pour la mise en production.

## Démarrage local

Prérequis : Node.js 24 ou supérieur (le runtime utilise `node:sqlite` et Argon2id natifs).

```powershell
node server/app.js
```

Ouvrir `http://localhost:3000`. La base persistante est créée dans `data/la-kermesse.db` et n’est jamais ajoutée à Git.

Créer le premier compte manager (mot de passe de 12 caractères minimum) :

```powershell
node server/setup-admin.js
```

L’administration privée est ensuite disponible à `/admin` et n’est liée à aucune navigation publique.

## Ce qui est configurable

Dans l’administration : mode de confirmation, durée de service, intervalle de créneaux, préavis, horizon et nombre maximum de convives. Les tables et services de démonstration sont semés dans SQLite au premier lancement. Avant production, remplacer ces valeurs par les horaires, tables, capacités, exceptions et politiques confirmés par le client.

## Persistance et sauvegarde

Déployer sur un hôte disposant d’un volume persistant pour `data/la-kermesse.db`; un environnement serverless/éphémère n’est pas compatible avec cette base SQLite. Sauvegarder régulièrement le fichier hors ligne, puis restaurer une copie arrêtée du service. SQLite fonctionne en WAL : conserver ensemble le fichier `.db` et ses éventuels fichiers `-wal` et `-shm` pendant une sauvegarde à chaud.

## E-mails SMTP

Les identifiants SMTP ne sont volontairement pas inclus. Configurer l’hôte, port, utilisateur et mot de passe dans l’environnement de déploiement, puis connecter l’adaptateur SMTP avant ouverture au public. Tant qu’il n’est pas configuré, le site n’affirme jamais qu’un e-mail a été envoyé.

## Validation avant lancement

Le client doit confirmer : horaires et fermetures, tables/combinaisons/zones, durée, préavis, horizon, maximum de convives, confirmation automatique ou manuelle, annulation, adresse d’alerte, SMTP, hébergement persistant, sauvegardes, mentions légales et rétention des données. Demander également un master officiel transparent/vectoriel du logo : le fichier image authentique livré est conservé sans modification.
