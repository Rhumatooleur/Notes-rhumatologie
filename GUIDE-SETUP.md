# 📖 Guide du Visionneur Markdown GitHub Pages

## 🎯 Configuration du Site

Votre site GitHub Pages est maintenant configuré et présent à l'adresse :
**https://rhumatooleur.github.io/Notes-rhumatologie/**

## 📋 Fichiers Créés

- **`index.html`** - Page d'accueil interactive avec visionneur markdown
- **`assets/style.css`** - Feuille de style (design épuré et responsive)
- **`assets/app.js`** - Code JavaScript pour charger et afficher les fichiers markdown
- **`_config.yml`** - Configuration GitHub Pages
- **`.gitignore`** - Fichiers à ignorer dans Git

## 🚀 Déploiement sur GitHub

### Étape 1 : Valider et pousser les changements

Utilisez une des méthodes suivantes :

#### Méthode 1 : GitHub Desktop
1. Ouvrez GitHub Desktop
2. Sélectionnez votre repo "Notes-rhumatologie"
3. Vous verrez les fichiers modifiés dans l'onglet "Changes"
4. Entrez un message commit : "Ajouter le visionneur markdown et configuration GitHub Pages"
5. Cliquez sur "Commit to main"
6. Cliquez sur "Push origin"

#### Méthode 2 : Ligne de commande Git
```bash
cd Notes-rhumatologie
git add index.html assets/ _config.yml .gitignore
git commit -m "Add markdown viewer for GitHub Pages"
git push origin main
```

#### Méthode 3 : VS Code
1. Ouvrez VS Code dans le dossier du repo
2. Allez à l'onglet "Source Control" (Ctrl+Shift+G)
3. Vous verrez les fichiers modifiés
4. Cliquez sur "+" pour staging tous les changements
5. Entrez le message commit
6. Cliquez sur "✓" (Commit)
7. Cliquez sur "⋯" et sélectionnez "Push"

### Étape 2 : Activation de GitHub Pages

1. Allez sur votre dépôt GitHub : https://github.com/rhumatooleur/Notes-rhumatologie
2. Cliquez sur "Settings" (⚙️)
3. Allez à "Pages" dans le menu de gauche
4. Sous "Source", sélectionnez :
   - Branch: `main`
   - Folder: `/ (root)`
5. Cliquez sur "Save"

## ✨ Fonctionnalités

### Navigation
- **Sidebar** : Liste de tous vos documents organisés par catégorie
- **Recherche** : Tapez pour filtrer les documents par titre
- **Accès rapide** : Les groupes de documentation se déplient automatiquement lors de la recherche

### Responsif
- **Desktop** : Vue optimale avec sidebar fixe
- **Tablette** : Navigation sur le côté restant visible
- **Mobile** : Menu hamburger (☰) pour afficher/masquer la navigation

### Affichage du Contenu
- **Markdown** : Tous vos fichiers `.md` sont convertis en HTML élégant
- **Mise en évidence de code** : Les blocs de code sont coloriés syntaxiquement
- **Images** : Les images markdown s'affichent correctement
- **Tables** : Formatage automatique des tableaux markdown

## 📝 Comment Ajouter des Pages

### Pour ajouter une nouvelle page à la navigation :

1. Créez ou éditez votre fichier `.md` dans le dépôt
2. Ouvrez le fichier `assets/app.js`
3. Trouvez la section `navStructure` (ligne ~12)
4. Ajoutez une entrée dans la catégorie appropriée :

```javascript
{ name: 'Titre de votre page', file: 'chemin/vers/votre/fichier.md' }
```

Exemple pour ajouter une page dans "Notes Générales" :
```javascript
{
    title: '🏥 Notes Générales',
    collapsed: true,
    pages: [
        { name: 'Arthrites réactionnelles', file: 'AAA-Notes-rhumatologie/Arthrites-réactionnelles.md' },
        // ... autres pages ...
        { name: 'Ma nouvelle page', file: 'AAA-Notes-rhumatologie/Ma-nouvelle-page.md' }  // ← Ajouter ici
    ]
}
```

5. Commitez et poussez les changements
6. Le site se mettra à jour automatiquement

## 🎨 Personnalisation

### Modifier les couleurs

Ouvrez `assets/style.css` et modifiez les variables CSS au début du fichier :

```css
:root {
    --color-primary: #0969da;      /* Bleu primaire */
    --color-bg: #ffffff;            /* Couleur de fond */
    --color-border: #d0d7de;        /* Couleur bordures */
    --color-text: #24292f;          /* Couleur texte */
    --color-text-light: #57606a;    /* Texte clair */
    --color-sidebar: #f6f8fa;       /* Fond sidebar */
}
```

### Modifier le titre et le message d'accueil

Vous pouvez modifier :
- Le titre dans le sidebar : changez `📚 Rhumatologie` dans `index.html`
- Le texte du placeholder de recherche : changez `placeholder="Chercher..."` dans `index.html`

## 🔗 Structure de l'Application

```
Notes-rhumatologie/
├── index.html              # Page principale (point d'entrée)
├── _config.yml             # Configuration GitHub Pages
├── .gitignore              # Fichiers à ignorer
├── assets/
│   ├── style.css           # Feuille de style
│   └── app.js              # Logique JavaScript
├── AAA-Notes-rhumatologie/ # Vos documents markdown
├── AAA-Radiologie-ostéoarticulaire/
└── ...autres fichiers markdown
```

## 🛠️ Dépannage

### Le site ne se charge pas
- Vérifiez que GitHub Pages est activé dans les settings
- Attendez quelques minutes après le push (GitHub a besoin de temps pour déployer)
- Videz le cache du navigateur (Ctrl+Shift+Suppr)

### Mes fichiers markdown n'apparaissent pas
- Vérifiez que vous avez committé et poussé les changements
- Vérifiez qu'il n'y a pas d'erreurs dans le chemin du fichier dans `app.js`
- Assurez-vous que l'extension `.md` est correcte

### La navigation ne fonctionne pas
- Ouvrez la console du navigateur (F12) et cherchez les erreurs
- Vérifiez que vous utilisez les bons noms de fichier (attention à la casse)
- Assurez-vous que la branche GitHub est bien `main`

## 📊 Technologie Utilisée

- **Markdown parsing** : [Marked.js](https://marked.js.org/)
- **Syntax highlighting** : [Highlight.js](https://highlightjs.org/)
- **Styling** : [GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css)
- **HTML/CSS/JavaScript** vanilla (pas de dépendances Node.js nécessaires)

## 💡 Astuces

- Les fichiers markdown peuvent contenir des liens vers d'autres fichiers markdown
- Vous pouvez organiser vos fichiers dans des sous-dossiers
- Laissez des noms de fichier lisibles (les tirets remplacent les espaces)
- Testez localement avec un serveur local simple avant de pousser à GitHub

## 🎓 La Première Fois

1. **Créez les commits** des fichiers créés (index.html, assets/, _config.yml, .gitignore)
2. **Poussez vers GitHub** (git push)
3. **Activez GitHub Pages** dans les settings du repo
4. **Attendez 2-5 minutes** que GitHub déploie votre site
5. **Visitez** https://rhumatooleur.github.io/Notes-rhumatologie/

Votre site est maintenant en ligne ! 🎉

---

**Besoin d'aide ?** Consultez la [documentation GitHub Pages](https://docs.github.com/en/pages)
