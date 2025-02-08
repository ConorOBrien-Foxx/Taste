@ECHO OFF

REM check if `elm` exists on path
elm 2>&1 2>nul
IF %ERRORLEVEL%==9009 GOTO :NO_ELM

REM compile webpage
ECHO Making webapp...
elm make --output comp\taste.js src\Main.elm
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

REM compile node.js
ECHO Making node.js version...
elm make --output comp\taste-compiled.node.js src\NodeOp.elm
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

EXIT /B

:NO_ELM
    ECHO Fatal error: `elm` was not found on the path. Maybe you need to install the Elm compiler?
    ECHO.
    ECHO   https://guide.elm-lang.org/install/elm.html
    ECHO.
    EXIT /B 9009
