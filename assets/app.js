// Configuration
const GITHUB_REPO = 'rhumatooleur/Notes-rhumatologie';
const GITHUB_BRANCH = 'main'; // ou 'master' selon votre configuration

// Détecter l'environnement (local ou GitHub Pages)
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const RAW_GITHUB_URL = isLocal ? '' : `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// Structure de navigation (sera chargée depuis le JSON)
let navStructure = [];

// État global
let currentFile = null;
let filterText = '';

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Charger la structure de navigation d'abord
    loadNavStructure();
});
// Charger la structure de navigation depuis le fichier JSON
async function loadNavStructure() {
    try {
        let response;
        
        if (isLocal) {
            response = await fetch('/assets/nav-structure.json');
        } else {
            response = await fetch(`${RAW_GITHUB_URL}/assets/nav-structure.json`);
        }
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        navStructure = await response.json();
        
        console.log('✅ Navigation structure loaded:', navStructure.length, 'categories found');
        
    } catch (error) {
        console.warn('⚠️ Could not load nav-structure.json:', error);
        console.warn('💡 Running generate-nav.py to create the file...');
        
        // Si le fichier n'existe pas, afficher un message
        document.querySelector('.sidebar').innerHTML = `
            <div class="sidebar-header">
                <h1>⚠️ Configuration</h1>
            </div>
            <div class="nav-content" style="padding: 1rem;">
                <p style="color: #d1242f; font-size: 0.9rem;">
                    Le fichier de navigation doit être généré.
                </p>
                <p style="font-size: 0.85rem; color: #57606a; margin-top: 1rem;">
                    <strong>Sur Windows :</strong> Exécutez<br/>
                    <code style="background: #f0f0f0; display: block; padding: 0.5rem; margin-top: 0.5rem; border-radius: 3px;">
                    python generate-nav.py
                    </code>
                </p>
                <p style="font-size: 0.85rem; color: #57606a; margin-top: 1rem;">
                    Puis rafraîchissez la page.
                </p>
            </div>
        `;
        return;
    }
    
    // Afficher la navigation et initialiser
    renderNavigation();
    setupEventListeners();
    
    // Charger la page par défaut
    const defaultFile = 'Notes-rhumatologie.md';
    loadPage(defaultFile);
}


// Rendu de la navigation
function renderNavigation() {
    const navContent = document.getElementById('navContent');
    navContent.innerHTML = '';

    navStructure.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = `nav-group${group.collapsed ? ' collapsed' : ''}`;
        groupDiv.dataset.index = index;

        const title = document.createElement('div');
        title.className = 'nav-group-title';
        title.innerHTML = `${group.title} <span>${group.collapsed ? '▼' : '▲'}</span>`;
        title.addEventListener('click', () => toggleGroup(groupDiv, index));

        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'nav-items';

        group.pages.forEach(page => {
            const link = document.createElement('a');
            link.className = 'nav-item';
            link.href = '#';
            link.textContent = page.name;
            link.dataset.file = page.file;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadPage(page.file, page.name);
            });

            itemsDiv.appendChild(link);
        });

        groupDiv.appendChild(title);
        groupDiv.appendChild(itemsDiv);
        navContent.appendChild(groupDiv);
    });
}

// Basculer l'expansion d'un groupe
function toggleGroup(groupDiv, index) {
    const isCollapsed = groupDiv.classList.contains('collapsed');
    
    navStructure.forEach((group, i) => {
        const div = document.querySelector(`[data-index="${i}"]`);
        if (i === index) {
            if (isCollapsed) {
                div.classList.remove('collapsed');
            } else {
                div.classList.add('collapsed');
            }
            navStructure[i].collapsed = !isCollapsed;
        }
    });
}

// Charger une page
async function loadPage(file, displayName = null) {
    currentFile = file;
    const contentDiv = document.getElementById('content');

    // Mise à jour de l'état actif dans la navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.file === file) {
            item.classList.add('active');
        }
    });

    // Afficher le chargement
    contentDiv.innerHTML = '<div class="loading">Chargement du contenu...</div>';

    try {
        let response;
        
        if (isLocal) {
            // En local, charger directement depuis le serveur local
            response = await fetch(`/${file}`);
        } else {
            // En production, charger depuis GitHub
            response = await fetch(`${RAW_GITHUB_URL}/${file}`);
        }
        
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }

        const markdown = await response.text();
        
        // Configurer marked (vérifier que marked est disponible)
        if (!marked) {
            throw new Error('Marked.js n\'a pas pu être chargé. Vérifiez votre connexion internet.');
        }
        
        marked.setOptions({
            breaks: true,
            gfm: true,
        });

        // Rendre le markdown
        const html = marked.parse(markdown);
        contentDiv.innerHTML = html;

        // Appliquer la coloration syntaxique
        if (hljs) {
            contentDiv.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
            });
        }

        // Gérer les chemins des images
        setupImageHandlers();

        // Gérer les clics sur les liens internes
        setupLinkHandlers();

        // Fermer la sidebar sur mobile après sélection
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('open');
        }

    } catch (error) {
        contentDiv.innerHTML = `
            <div style="color: #d1242f; padding: 2rem; text-align: center;">
                <h3>Erreur de chargement</h3>
                <p>${error.message}</p>
                <p style="font-size: 0.9rem; margin-top: 1rem; color: #57606a;">
                    Fichier demandé : <code>${file}</code>
                </p>
                ${isLocal ? `<p style="font-size: 0.9rem; color: #57606a;">
                    💡 Mode local - Vérifiez que le fichier existe dans le dossier du projet
                </p>` : `<p style="font-size: 0.9rem; color: #57606a;">
                    Vérifiez que le fichier existe sur GitHub et que le nom de branche est correct (actuellement: ${GITHUB_BRANCH})
                </p>`}
            </div>
        `;
    }
}

// Configuration des événements
function setupEventListeners() {
    // Toggle de la navigation sur mobile
    document.getElementById('toggleNav').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
    });

    // Recherche
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterText = e.target.value.toLowerCase();
        filterNavigation();
    });

    // Fermer la sidebar quand on clique sur le contenu principal (mobile)
    document.getElementById('content').addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('open');
        }
    });
}

// Gérer les chemins des images
function setupImageHandlers() {
    const contentDiv = document.getElementById('content');
    const images = contentDiv.querySelectorAll('img');

    images.forEach(img => {
        const src = img.getAttribute('src');
        
        if (src && !src.startsWith('http') && !src.startsWith('data:')) {
            // C'est un chemin relatif local
            let resolvedPath = src;
            
            if (!isLocal) {
                // En production (GitHub), résoudre par rapport au fichier courant
                resolvedPath = resolveRelativePath(currentFile, src);
                // Charger depuis GitHub
                img.src = `${RAW_GITHUB_URL}/${resolvedPath}`;
            } else {
                // En local, résoudre le chemin relatif
                resolvedPath = resolveRelativePath(currentFile, src);
                img.src = `/${resolvedPath}`;
            }
            
            // Gérer les erreurs de chargement
            img.onerror = function() {
                this.style.border = '2px solid #d1242f';
                this.style.padding = '10px';
                this.alt = `Image non trouvée: ${src}`;
                this.title = `Chemin cherché: ${resolvedPath}`;
            };
        }
    });
}

// Gérer les clics sur les liens internes
function setupLinkHandlers() {
    const contentDiv = document.getElementById('content');
    const links = contentDiv.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Vérifier si c'est un lien markdown interne (local)
        if (href && !href.startsWith('http') && !href.startsWith('#') && href.endsWith('.md')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Résoudre le chemin relatif par rapport au fichier courant
                const resolvedPath = resolveRelativePath(currentFile, href);
                loadPage(resolvedPath, href.split('/').pop());
            });
            
            // Indiquer visuellement que c'est un lien interne cliquable
            link.style.cursor = 'pointer';
        }
    });
}

// Résoudre les chemins relatifs (../, ./, etc)
function resolveRelativePath(currentPath, relativePath) {
    // Diviser les chemins
    const currentParts = currentPath.split('/');
    const relativeParts = relativePath.split('/');
    
    // Enlever le dernier élément (nom du fichier actuel)
    currentParts.pop();
    
    // Traiter chaque partie du chemin relatif
    for (let part of relativeParts) {
        if (part === '..') {
            currentParts.pop();
        } else if (part !== '.') {
            currentParts.push(part);
        }
    }
    
    return currentParts.join('/');
}

// Filtrer la navigation
function filterNavigation() {
    const items = document.querySelectorAll('.nav-item');
    let visibleGroups = new Set();

    items.forEach(item => {
        const matches = item.textContent.toLowerCase().includes(filterText);
        item.style.display = matches ? 'block' : 'none';
        
        if (matches) {
            // Marquer le groupe comme visible
            const group = item.closest('.nav-group');
            if (group) {
                visibleGroups.add(group.dataset.index);
            }
        }
    });

    // Afficher/masquer les groupes
    document.querySelectorAll('.nav-group').forEach(group => {
        const index = group.dataset.index;
        const hasVisibleItems = Array.from(group.querySelectorAll('.nav-item')).some(
            item => item.style.display !== 'none'
        );
        
        group.style.display = hasVisibleItems || filterText === '' ? 'block' : 'none';
        
        // Dérouler les groupes lors de la recherche
        if (filterText !== '' && hasVisibleItems) {
            group.classList.remove('collapsed');
        }
    });
}
