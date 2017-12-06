@echo off
call :treeProcess
goto :eof

:treeProcess
rem Do whatever you want here over the files of this subdir, for example:
for /f "Tokens=*" %%f in ('dir /l/b/a-d') do (ren "%%f" "%%f")
for /D %%d in (*) do (
    cd %%d
    call :treeProcess
    cd ..
)
exit /b