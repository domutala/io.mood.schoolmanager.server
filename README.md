# io.mood.schoolmanager.server

## Description

Serveur rest du projet open source **[School Manager](https://github.com/users/domutala/projects/5)**. C'est une application de gestion des établissements scolaires créée par [@domutala Mamadou DIA](https://github.com/domutala).

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:6080
$ yarn run:dev
```

## Structure de la base

SGBD: **MongoDB**

### Unit

A part les objets de type `session`, `file` ou `User`, tous les autres données sont enregistrées dans un seul objet dénommé **`Unit`**. Un `unit` peut donc contenir des données de natures diverses.

#### Pourquoi ce choix

Principalement pour une **gestion unifiée** des accès des utilisateurs à tous les données. Si nous devions gérer les accès un à un pour chaque type de donnée cela allait prendre un temps considérable et ralentir le développement. Il faut donc concevoir la base de façon à traiter tous les informations de la même façon.

#### Détails de l'objet

```Javascript
/** C'est l'identifiant de l'object */
id: ObejectID;

/**
* C'est l'identifiant de l'object parent, Pour les objets de type `School`
* sa valeur peut être `null`.
*/
parent?: string;


/** Explication plus tard dans ce document*/
type: "school" | "year" | "classroom" | "student" | ...

/** C'est la valeur de l'objet */
data: any

/**
 * C'est un tableau d'accès permettant au utilisateur d'effetuer
 * des taches précises.
*/
access: Access[] // voire le model Access
```
