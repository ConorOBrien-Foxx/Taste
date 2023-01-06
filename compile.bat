@ECHO OFF

REM compile webpage
ECHO Making webapp...
elm make --output taste.js src\Main.elm
IF %ERRORLEVEL% NEQ 0 EXIT /B

REM compile node.js
ECHO Making node.js version...
elm make --output taste-compiled.node.js src\NodeOp.elm
