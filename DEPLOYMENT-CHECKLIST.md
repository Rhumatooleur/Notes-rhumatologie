# ✅ Checklist de Déploiement

Utilisez cette checklist pour vérifier que tout fonctionne :

## Phase 1 : Préparation Locale

- [ ] Les fichiers suivants existent dans la racine du repo :
  - `index.html`
  - `_config.yml`
  - `assets/style.css`
  - `assets/app.js`
  
- [ ] Test local (optionnel) :
  - [ ] Exécutez `serve-local.bat` (ou `serve-local.ps1`)
  - [ ] Allez à http://localhost:8000
  - [ ] Vérifiez que la page charge correctement
  - [ ] Cliquez sur "Notes de Rhumatologie" pour charger le fichier
  - [ ] Vérifiez que la barre latérale affiche tous les documents
  - [ ] Testez la recherche en tapant quelques caractères

## Phase 2 : Commit et Push vers GitHub

- [ ] Ouvrez **GitHub Desktop**
- [ ] Vérifiez que vous êtes sur la branche `main`
- [ ] Vous voyez les fichiers : `index.html`, `_config.yml`, `assets/` dans "Changes"
- [ ] Entrez un message de commit : `Ajouter visionneur markdown GitHub Pages`
- [ ] Cliquez sur **"Commit to main"**
- [ ] Cliquez sur **"Push origin"**
- [ ] Attendez que le push soit terminé (vous verrez "Published" en haut)

## Phase 3 : Configuration GitHub Pages

- [ ] Allez sur https://github.com/rhumatooleur/Notes-rhumatologie
- [ ] Cliquez sur **Settings** (onglet en haut)
- [ ] Dans le menu gauche, allez à **Pages**
- [ ] Vérifiez que la section Source affiche :
  - Branch: `main` 
  - Folder: `/ (root)`
- [ ] Cliquez sur **Save** (si pas déjà activé)
- [ ] GitHub affiche : "Your site is published at https://rhumatooleur.github.io/Notes-rhumatologie/"

## Phase 4 : Vérification du Site en Ligne

- [ ] Attendez 2-5 minutes
- [ ] Allez à https://rhumatooleur.github.io/Notes-rhumatologie/
- [ ] Vérifiez que :
  - [ ] La page charge sans erreur (pas de contenu "Chargement..." qui persiste)
  - [ ] Le fichier "Notes-rhumatologie.md" s'affiche au démarrage
  - [ ] La barre latérale est visible avec tous les documents
  - [ ] Vous pouvez cliquer sur d'autres documents
  - [ ] La recherche fonctionne
  - [ ] Le site est responsive (testez sur mobile)

- [ ] Testez la navigation :
  - [ ] Cliquez sur "Notes de Rhumatologie" → affiche le contenu
  - [ ] Cliquez sur "Radiologie Ostéo-articulaire" → affiche le contenu
  - [ ] Cliquez sur quelques pages dans les autres catégories

## Phase 5 : Optimisation (Optionnel)

- [ ] Personnalisez les couleurs dans `assets/style.css` si désiré
- [ ] Changez le titre dans `index.html` si désiré
- [ ] Testez sur différents navigateurs
- [ ] Testez l'accès depuis un téléphone/tablette

## 🎉 Succès !

Si toutes les cases sont cochées, votre site GitHub Pages fonctionne parfaitement ! 

### Prochaines Étapes

**Pour ajouter plus de contenu :**
1. Créez ou éditez des fichiers `.md` dans vos dossiers
2. Commitez et poussez les changements
3. Le site se met à jour automatiquement

**Pour modifier la navigation :**
1. Éditez `assets/app.js`
2. Modifiez `navStructure` avec vos pages
3. Commitez et poussez
4. Rafraîchissez votre navigateur

---

**Blocage ?** Consultez [GUIDE-SETUP.md](GUIDE-SETUP.md) pour le dépannage
