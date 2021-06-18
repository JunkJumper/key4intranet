# Key4intranet 

## Table des matières

1. [Description](#Description)
2. [Pré-requis](#Pre-requis)
3. [Guide d'instalation](#Guide)

## Description

Ce projet est un intranet qui permet le téléchargement de fichier avec un système d'authentification.

Il fonctionne avec les frameworks ASP .net Core 5.0 & Vue.js.

## Pre-requis

- Il faut que votre machine possède le framework [ASP .net Core 5.0](https://dotnet.microsoft.com/download/dotnet/5.0) d'installé.
- Il faut que votre machine possède le [ASP .net Core runtime](https://dotnet.microsoft.com/download/dotnet/5.0/runtime) d'installé.
- Il faut que votre machine possède [node.js](https://nodejs.org/en/download/) d'installé.
- Il faut que votre machine possède [Vue.js CLI](https://v3.vuejs.org/guide/installation.html#cli) d'installé.
- Il faut que votre machine possède le gestionnaire de version [git](https://git-scm.com/downloads) d'installé.


# Guide

Vous devez, dans un premier temps, cloner le projet git en tapant dans une invite de commande ou un terminal : ```git clone git@bitbucket.org:key4team/intranet.git```

Une fois le projet cloné sur votre machine, vous aurez une arborescence similaire à ceci :

```
.
├───key4intranet.api
    └───API files
├───key4intranet.auth
    └───Auth files
├───key4intranet.front
    └───Front-end files
└───key4intranet.library
    └───Document library files
```

## Compilation back-end

Une fois dans votre projet api/auth, il faut que vous publiez la solution grâce à l'outil de publication graphique intégré à Visual studio. Une fois cette dernière compilée, vous devrez vous rendre dans ``~/key4intranet.api/bin/Release/net5.0/publish/`` et copier l'intégralité des fichiers vers le serveur où sera hébergé l'API.

## Compilation front-end

Une fois dans le répertoire ``key4intranet.front``, il suffit de lancer la commande ``npm run build`` pour lancer la compilation. Une fois celle ci terminée, il faut copier l'intégralité des fichiers vers le serveur qui hébergera le front. Ces fichiers, après compilation, seront stockés dans ``~/key4intranet.front/dist/``.




