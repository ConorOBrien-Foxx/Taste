@ECHO OFF

REM compile webpage
ECHO Making webapp...
elm make --output comp\taste.js src\Main.elm
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

REM compile node.js
ECHO Making node.js version...
elm make --output comp\taste-compiled.node.js src\NodeOp.elm
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%
