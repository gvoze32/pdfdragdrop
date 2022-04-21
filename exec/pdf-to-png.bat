echo off
echo.
echo.

set DPI=300
set ALPHABITS=2
set QUALITY=80
set FIRSTPAGE=1
set LASTPAGE=9999
REM MEMORY in MB
set MEMORY=300

set PDFFILE=%1
set PNGFILE=%PDFFILE:.pdf=-%%%d.png

set GS=%2

echo loading %GS%...
echo.

%~dp0%GS% -sDEVICE=png16m -sOutputFile=%PNGFILE% -r%DPI% -dNOPAUSE -dFirstPage=%FIRSTPAGE% -dLastPage=%LASTPAGE% -dJPEGQ=%QUALITY% -dGraphicsAlphaBits=%ALPHABITS%  -dTextAlphaBits=%ALPHABITS%  -dNumRenderingThreads=4 -dBufferSpace=%MEMORY%000000  -dBandBufferSpace=%MEMORY%000000 -c %MEMORY%000000 setvmthreshold -f %PDFFILE% -c quit

echo Finished.
pause
