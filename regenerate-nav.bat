@echo off
REM Script pour regénérer la structure de navigation

echo.
echo ============================================
echo   Regeneration de la Navigation
echo ============================================
echo.

REM Vérifier que Python est installé
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python n'est pas installe ou n'est pas dans le PATH
    pause
    exit /b 1
)

echo Execution du script de generation...
echo.

python generate-nav.py

if errorlevel 1 (
    echo.
    echo ERROR: Le script a echoue
    pause
    exit /b 1
)

echo.
echo SUCCESS: Navigation structure regeneree avec succes!
echo.
echo Prochaines etapes:
echo 1. Commitez le fichier assets/nav-structure.json
echo 2. Poussez vers GitHub (git push)
echo 3. Rafraichissez votre navigateur
echo.

pause
