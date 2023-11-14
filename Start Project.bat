@echo off

echo Starting Expo development server...

REM Get the current directory
set "current_directory=%CD%"

REM Print the current directory for verification
echo Current Directory: %current_directory%

REM Change to the current directory
cd /d %current_directory%

REM Run Expo start
expo start
