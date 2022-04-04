# Palindrome.c

## TACHES

Demander à 'utilisateur de taper un nombre
Vérifier si le nombre est un palindrome
Afficher le résultat

## METHODES

Déclarer 03 variables de type int

initaliser leur valeur à 0

demander à l'utilisateur de taper un nombre

Récupérer la valeur et l'attribuer à la première variable

attribuer à la troisième variable la valeur de la première : v3 = v1

excuter cette cette boucle

```C
while (v3 != 0)
{
  v2 = v2 * 10;
  v2 = v2 + v3%10;
  v3 = v3/10;
}
```

Comparer v1 et v2

afficher le résultat
