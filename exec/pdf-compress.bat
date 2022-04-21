echo off
echo.
echo.

set PDFFILE=%1
set COMPRESSFILE=%PDFFILE:.pdf=-compress%.pdf

set GS=%2

echo loading %GS%...
echo.

%~dp0%GS% -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=%COMPRESSFILE% %PDFFILE%

echo Finished.
pause