echo off
echo.
echo.

set PDFFILE1=%1
set PDFFILE2=%2
set MERGEFILE=%PDFFILE1:.pdf=-merged%.pdf

set GS=%3

echo loading %GS%...
echo.

%~dp0%GS% -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -sOutputFile=%MERGEFILE% %PDFFILE1% %PDFFILE2%

echo Finished.
pause
