echo off
echo.
echo.

set PDFFILE=%1
set ROTATEFILE=%PDFFILE:.pdf=-rotated%.pdf

set GS=%2

echo loading %GS%...
echo.

%~dp0%GS% %PDFFILE% cat 1-endwest output %ROTATEFILE%

echo Finished.
pause