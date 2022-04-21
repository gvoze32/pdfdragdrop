echo off
echo.
echo.

set PDFFILE1=%1
set PDFFILE2=%2
set MERGEFILE=%PDFFILE1:.pdf=-merged%.pdf

set GS=%3

echo loading %GS%...
echo.

%~dp0%GS% %PDFFILE1% %PDFFILE2% output %MERGEFILE%

echo Finished.
pause
