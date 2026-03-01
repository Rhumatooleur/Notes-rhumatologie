@echo off
REM Script pour servir le site localement sur http://localhost:8000

echo.
echo ============================================
echo   Serveur Local - Notes de Rhumatologie
echo ============================================
echo.

REM Vérifier que Python est installé
python --version >nul 2>&1
if errorlevel 1 (
    echo ^^❌ Python n'est pas installé ou n'est pas dans le PATH
    echo ^^Installez Python depuis https://www.python.org/
    pause
    exit /b 1
)

REM Afficher la version de Python
echo ✅ Python trouvé !
python --version

REM Afficher le répertoire courant
echo.
echo 📂 Répertoire : %cd%

REM Vérifier la présence du fichier index.html
if not exist index.html (
    echo ^^❌ Le fichier index.html n'a pas été trouvé
    pause
    exit /b 1
)

echo.
echo 🚀 Démarrage du serveur local...
echo 📍 Accédez au site à : http://localhost:8000
echo 💡 Appuyez sur Ctrl+C puis Enter pour arrêter le serveur
echo.
echo ============================================
echo.

REM Lancer le serveur Python
python -m http.server 8000

pause
