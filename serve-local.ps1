# Script pour servir le site localement sur http://localhost:8000

# Vérifier que Python est installé
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Python n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    Write-Host "Installez Python depuis https://www.python.org/" -ForegroundColor Yellow
    exit 1
}

# Vérifier la version de Python
$pythonVersion = python --version 2>&1
Write-Host "✅ Python trouvé : $pythonVersion" -ForegroundColor Green

# Charger le répertoire courant
$currentDir = Get-Location
Write-Host "📂 Répertoire courant : $currentDir" -ForegroundColor Cyan

# Vérifier la présence du fichier index.html
if (-not (Test-Path "index.html")) {
    Write-Host "❌ Le fichier index.html n'a pas été trouvé" -ForegroundColor Red
    exit 1
}

Write-Host "`n🚀 Démarrage du serveur local..." -ForegroundColor Green
Write-Host "📍 Accédez au site à : http://localhost:8000" -ForegroundColor Cyan
Write-Host "💡 Appuyez sur Ctrl+C pour arrêter le serveur`n" -ForegroundColor Yellow

# Lancer le serveur Python
python -m http.server 8000
