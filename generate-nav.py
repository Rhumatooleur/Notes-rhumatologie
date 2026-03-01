#!/usr/bin/env python3
"""
Script pour générer automatiquement la structure de navigation
à partir des fichiers markdown du repository.
"""

import os
import json
from pathlib import Path
import re

def get_markdown_title(filepath):
    """Extraire le titre d'un fichier markdown (première ligne de titre)."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                # Chercher la première ligne commençant par #
                if line.strip().startswith('#'):
                    # Enlever les # et espacer
                    title = re.sub(r'^#+\s*', '', line.strip())
                    return title
    except:
        pass
    
    # Utiliser le nom de fichier si pas de titre trouvé
    return Path(filepath).stem.replace('-', ' ').replace('_', ' ').title()

def slugify_filename(filename):
    """Convertir un nom de fichier en titre lisible."""
    # Enlever l'extension
    name = Path(filename).stem
    # Remplacer tirets et underscores par espaces
    name = name.replace('-', ' ').replace('_', ' ')
    # Capitaliser
    return name.title()

def scan_directory(dir_path, root_dir, skip_dirs=None):
    """Récursivement scanner un répertoire pour trouver les fichiers .md."""
    if skip_dirs is None:
        skip_dirs = {'.git', '.vscode', '.attachments', 'node_modules', '__pycache__', '.github'}
    
    files = []
    
    try:
        for item in sorted(os.listdir(dir_path)):
            if item.startswith('.'):
                continue
                
            item_path = os.path.join(dir_path, item)
            rel_path = os.path.relpath(item_path, root_dir)
            
            if os.path.isfile(item_path) and item.endswith('.md'):
                name = get_markdown_title(item_path) or slugify_filename(item)
                files.append({
                    'name': name,
                    'file': rel_path.replace('\\', '/')  # Convertir les backslashes en slashes
                })
            elif os.path.isdir(item_path) and item not in skip_dirs:
                files.extend(scan_directory(item_path, root_dir, skip_dirs))
    except PermissionError:
        pass
    
    return files

def organize_by_category(files, root_dir):
    """Organiser les fichiers par catégorie (dossier ou préfixe)."""
    categories = {}
    root_files = []
    
    for file_info in files:
        file_path = file_info['file']
        parts = file_path.split('/')
        
        if len(parts) > 1:
            # C'est dans un sous-dossier
            category = parts[0]
            if category not in categories:
                categories[category] = []
            categories[category].append(file_info)
        else:
            # À la racine
            root_files.append(file_info)
    
    return root_files, categories

def generate_nav_structure(root_dir):
    """Générer la structure de navigation complète."""
    structure = []
    
    # Fichiers à la racine en premier
    all_files = scan_directory(root_dir, root_dir)
    root_files, categories = organize_by_category(all_files, root_dir)
    
    # Ajouter les fichiers racine
    if root_files:
        structure.append({
            'title': '📖 Accueil',
            'collapsed': False,
            'pages': root_files
        })
    
    # Ajouter les catégories par dossier
    category_icons = {
        'AAA-Notes-rhumatologie': '🏥 Notes Générales',
        'AAA-Radiologie-ostéoarticulaire': '🔬 Radiologie',
        'Arthrites-réactionnelles': '📋 Arthrites réactionnelles',
        'Biothérapies': '💊 Biothérapies',
        'Biothérapies-tsDMARDs': '💊 Biothérapies et tsDMARDs',
        'Corticothérapie': '💉 Corticothérapie',
        'csDMARDs': '💊 csDMARDs',
        'Douleurs-neuropathiques': '🧠 Douleurs neuropathiques',
        'Epaule': '💪 Épaule',
        'Fibromyalgie': '😔 Fibromyalgie',
        'Inflammation-carence-martiale': '🩸 Inflammation',
        'Injectables': '💉 Injectables',
        'Rhumatisme psoriasique': '🔴 Psoriasis',
        'Vaccins-et-RICs': '🔬 Vaccins',
    }
    
    for category_key in sorted(categories.keys()):
        category_label = category_icons.get(category_key, f'📁 {category_key}')
        
        structure.append({
            'title': category_label,
            'collapsed': True,
            'pages': sorted(categories[category_key], key=lambda x: x['name'])
        })
    
    return structure

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    
    print(f"📂 Scanning directory: {root_dir}")
    
    # Générer la structure
    nav_structure = generate_nav_structure(root_dir)
    
    # Sauvegarder en JSON
    output_path = os.path.join(root_dir, 'assets', 'nav-structure.json')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(nav_structure, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Navigation structure saved to: {output_path}")
    print(f"\n📊 Found:")
    total_pages = sum(len(cat['pages']) for cat in nav_structure)
    print(f"   - {len(nav_structure)} categories")
    print(f"   - {total_pages} pages total")
    
    for cat in nav_structure:
        print(f"   - {cat['title']}: {len(cat['pages'])} pages")

if __name__ == '__main__':
    main()
