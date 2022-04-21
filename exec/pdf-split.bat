echo off
echo.
echo.

set PDFFILE=%1
set SPLITFILE=%PDFFILE:.pdf=-%%%d.pdf

set GS=%2

echo loading %GS%...
echo.

%~dp0%GS% %PDFFILE% burst output %SPLITFILE%

echo Finished.
pause
