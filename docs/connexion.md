# CONNEXION ET OU D'INSCRIPTION: ouverture de _Session_

## AUTEUR

[`domutala`](https://domutala.github.io)

## notes

- ### _new_

  Retourner pour indiquer au client que c'est un nouvel utilisateur;

## Etape 1: initialisation de la session

- vérifier si la session est déjà initialisé

  - si oui:

    - vérifier si la session est désactivée

      - si oui:

        - initialiser une nouvelle session: voir si la session n'est pas initialisée

      - si non:

        - retourner l'id de la session et la clé public_rsa

  - si non:

    - crée une nouvelle session
    - retourner l'id de la session et la clé public_rsa

## Etape 2: lié la session à un utilisateur

- vérifier si l'utilisateur existe:

  - si non:

    - créer un nouvel utilisateur
    - générer un code otp de validation

  - vérifier si l'utilisateur à un code pin

    - si oui:

      - modifier le code de vérification au code pin de l'utilisateur

  - lier la session à l'utilisateur
  - envoyer le code de vérification par sms si c'est un code otp
  - retourner "pin" ou "otp" en fonction du type de code de vérification

## Etape 3: validation de la session

Cette étap peut se répéter deux fois si la première est "otp"

- véririfier si un utilisateur est lié à la session

  - si non: retourner un erreur

- vérifier si le code de validation est identique au code envoyer par le client

  - si non: retourner une erreur en fonction du type de code demander

  - si oui:

    - si le type de code est pin:

      - générer un code otp
      - modifier le type de code de validation à otp
      - modifier l'étape de validation à 1
      - envoyer le code otp pas sms
      - retourner "otp"

    - sinon si le type de code est otp:

      - modifier l'étape de validation à 2
      - supprimer le code de validation
      - supprimer le type de validation

      - vérifier si l'utilisateur a un code pin:

        - si oui: retourner "pass"
        - si non: nouvel utilisateur : retourner "createpin"
