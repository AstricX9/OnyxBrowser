!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "Onyx" "Software\Clients\StartMenuInternet\Onyx\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\Onyx" "" "Onyx web page document"
  WriteRegStr SHCTX "SOFTWARE\Classes\Onyx\Application" "AppUserModelId" "Onyx"
  WriteRegStr SHCTX "SOFTWARE\Classes\Onyx\Application" "ApplicationIcon" "$INSTDIR\Onyx.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Onyx\Application" "ApplicationName" "Onyx"
  WriteRegStr SHCTX "SOFTWARE\Classes\Onyx\Application" "ApplicationCompany" "Onyx"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Onyx\Application" "ApplicationDescription" "Onyx web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Onyx\DefaultIcon" "DefaultIcon" "$INSTDIR\Onyx.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Onyx\shell\open\command" "" '"$INSTDIR\Onyx.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "Onyx" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "Onyx" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx" "" "Onyx"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\DefaultIcon" "" "$INSTDIR\Onyx.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\Capabilities" "ApplicationDescription" "Onyx web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\Capabilities" "ApplicationName" "Onyx"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\Capabilities" "ApplicationIcon" "$INSTDIR\Onyx.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\Capabilities\FileAssociations" ".htm" "Onyx"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\Capabilities\FileAssociations" ".html" "Onyx"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\Capabilities\URLAssociations" "http" "Onyx"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\Capabilities\URLAssociations" "https" "Onyx"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\Capabilities\StartMenu" "StartMenuInternet" "Onyx"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx\shell\open\command" "" "$INSTDIR\Onyx.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\Onyx"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\Onyx"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "Onyx"
!macroend