# 🔄 Système de Navigation Automatique

Votre site utilise maintenant un **système de génération automatique** de la structure de navigation !

## 🎯 Comment ça marche ?

### En Local
1. Vous créez des fichiers `.md` dans votre repo
2. Exécutez `regenerate-nav.bat`
3. Le script génère `assets/nav-structure.json` automatiquement
4. Commitez et poussez les changements
5. Votre site se met à jour avec les nouveaux fichiers !

### Sur GitHub (Production)
1. Vous créez des fichiers `.md` et poussez vers GitHub
2. **GitHub Actions** détecte les changements
3. **Le script automatique exécute** `generate-nav.py` 
4. **Le JSON est mis à jour et commité** automatiquement
5. Votre site affiche les nouveaux fichiers !

## 📋 Fichiers Importants

### `generate-nav.py`
Script Python qui scanne tous vos fichiers `.md` et génère le JSON.

**Utilisation :**
```bash
python generate-nav.py
```

Cela crée/met à jour `assets/nav-structure.json`

### `regenerate-nav.bat`
Script Windows pour régénérer facilement le JSON.

**Double-cliquez dessus** pour exécuter.

### `.github/workflows/generate-nav.yml`
Configuration GitHub Actions pour l'automatisation.

Exécute automatiquement `generate-nav.py` à chaque push vers `main`.

### `assets/nav-structure.json`
Le fichier **généré automatiquement** contenant la structure de navigation.

⚠️ **Ne modifiez pas ce fichier manuellement** - il sera régénéré !

## 🚀 Flux de Workflow

```
Vous créez AAA-Notes/Ma-Page.md
       ↓
    git add
       ↓
   git commit
       ↓
   git push
       ↓
GitHub Actions détecte ✅
       ↓
Exécute generate-nav.py
       ↓
Mets à jour assets/nav-structure.json
       ↓
Crée un nouveau commit automatiquement
       ↓
Pousse vers main
       ↓
Votre site recharge avec la nouvelle page ✅
```

## 📝 Comment Ajouter une Nouvelle Page

### 1. Créer le fichier markdown
Créez votre nouvelle page, par exemple :
```
AAA-Notes-rhumatologie/Ma-Nouvelle-Note.md
```

### 2. En Local - Régénérer
Double-cliquez sur `regenerate-nav.bat`

Ou en ligne de commande :
```bash
python generate-nav.py
```

### 3. Commiter
```bash
git add .
git commit -m "Ajouter nouvelle note: Ma Nouvelle Note"
git push
```

### 4. C'est tout !
Votre page apparaîtra dans la navigation en quelques secondes ✅

## 🎨 Personnaliser les Titres et Icônes

Les titres des pages sont extraits automatiquement du premier `#` de chaque fichier markdown.

Par exemple, si votre fichier contient :
```markdown
# Arthrite Rhumatoïde - Traitement

Contenu...
```

Le titre affiché sera : "Arthrite Rhumatoïde - Traitement"

**Pour les catégories**, modifiez le dictionnaire `category_icons` dans `generate-nav.py` :

```python
category_icons = {
    'AAA-Notes-rhumatologie': '🏥 Mes Notes',
    'AAA-Radiologie-ostéoarticulaire': '📊 Mes Radios',
}
```

Puis régénérez avec `python generate-nav.py`

## 🔧 Dépannage

### Le fichier n'apparaît pas après un push
1. Attendez 30 secondes (GitHub Actions travaille)
2. Rafraîchissez votre navigateur (Ctrl+F5)
3. Videz le cache du navigateur si ça ne suffit pas
4. Vérifiez que le fichier a bien été poussé vers GitHub

### Modification locale ne s'affiche pas
1. Exécutez `regenerate-nav.bat` (ou `python generate-nav.py`)
2. Vérifiez que `assets/nav-structure.json` a été modifié
3. Commitez le fichier JSON aussi

### Erreur : "Generator failed"
1. Assurez-vous que Python 3.8+ est installé
2. Vérifiez qu'aucun fichier `.md` n'a de nom invalide (caractères spéciaux)
3. Relancez le script
4. Consultez les logs GitHub Actions pour plus de détails

## 📊 Statistiques

Le script affiche le nombre de pages trouvées au démarrage :

```
OK: Navigation structure saved
Categories: 3
Total pages: 95
```

## 💡 Astuces

- Créez des dossiers pour organiser vos pages par catégorie
- Chaque dossier devient une catégorie repliable
- Les fichiers à la racine vont dans "Accueil"
- Le premier titre `#` du fichier devient le titre de la page

## 🆘 Besoin d'Aide ?

Si vous avez des problèmes :
1. Vérifiez que Python est installé : `python --version`
2. Vérifiez que le fichier JSON existe : `assets/nav-structure.json`
3. Vérifiez les logs GitHub Actions dans votre repo

---

**Créé le:** 1 March 2026  
**Pour:** Auto-génération de navigation  
**Technologie:** Python 3, GitHub Actions, JavaScript
