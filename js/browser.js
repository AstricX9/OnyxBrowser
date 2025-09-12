"use strict";

/*
 #####  ######  ####  #    # # #####  ######
 #    # #      #    # #    # # #    # #
 #    # #####  #    # #    # # #    # #####
 #####  #      #  # # #    # # #####  #
 #   #  #      #   #  #    # # #   #  #
 #    # ######  ### #  ####  # #    # ######
*/

const { ipcRenderer } = require("electron");
const dragula = require("dragula");

const applyTheme = require("../modules/applyTheme.js");
const loadTheme = require("../modules/loadTheme.js");
const applyWinControls = require("../modules/applyWinControls.js");
const loadWinControlsModule = require("../modules/loadWinControls.js");

const NotificationManager = require("../modules/NotificationManager/NotificationManager.js");
const TabRenderer = require("../modules/TabManager/TabRenderer.js");

/*
 ###### #    # #    #  ####              ##### #    # ###### #    # ######  ####
 #      #    # ##   # #    #               #   #    # #      ##  ## #      #
 #####  #    # # #  # #         #####      #   ###### #####  # ## # #####   ####
 #      #    # #  # # #                    #   #    # #      #    # #           #
 #      #    # #   ## #    #               #   #    # #      #    # #      #    #
 #       ####  #    #  ####                #   #    # ###### #    # ######  ####
*/

function updateTheme() {
  loadTheme().then(({theme, dark}) => {
    applyTheme(theme, dark);
  });
}

/*
 #    #  ####  ##### # ###### #  ####    ##   ##### #  ####  #    #  ####
 ##   # #    #   #   # #      # #    #  #  #    #   # #    # ##   # #
 # #  # #    #   #   # #####  # #      #    #   #   # #    # # #  #  ####
 #  # # #    #   #   # #      # #      ######   #   # #    # #  # #      #
 #   ## #    #   #   # #      # #    # #    #   #   # #    # #   ## #    #
 #    #  ####    #   # #      #  ####  #    #   #   #  ####  #    #  ####
*/

let notificationManager = new NotificationManager(document.getElementById("notif-panel"));

notificationManager.on("notif-added", (notif) => {
  updateTheme();
});

/*
 #####   ##   #####   ####
   #    #  #  #    # #
   #   #    # #####   ####
   #   ###### #    #      #
   #   #    # #    # #    #
   #   #    # #####   ####
*/

let tabRenderer = new TabRenderer();

let tabDrag = dragula([tabRenderer.getTabContainer()], {
  direction: "vertical"
});

tabDrag.on("drag", function(el, source) {
  let div = el.getElementsByClassName("tabman-tab-preview")[0];
  if(div != null) {
    div.parentNode.removeChild(div);
  }
});

tabDrag.on("drop", function(el, target, source, sibling) {
  tabRenderer.updateTabsPositions();
});

/*
.########.##.....##.##....##..######..########.####..#######..##....##..######.
.##.......##.....##.###...##.##....##....##.....##..##.....##.###...##.##....##
.##.......##.....##.####..##.##..........##.....##..##.....##.####..##.##......
.######...##.....##.##.##.##.##..........##.....##..##.....##.##.##.##..######.
.##.......##.....##.##..####.##..........##.....##..##.....##.##..####.......##
.##.......##.....##.##...###.##....##....##.....##..##.....##.##...###.##....##
.##........#######..##....##..######.....##....####..#######..##....##..######.
*/

function prevDef(event) {
  event.preventDefault();
}

function popupInfoContextMenu() {
  ipcRenderer.send("request-info-contextmenu");
}

function requestSideMenu() {
  ipcRenderer.send("request-side-menu");
}

function installUpdate() {
  ipcRenderer.send("main-installUpdate");
}

function downloadUpdate() {
  ipcRenderer.send("main-downloadUpdate");
}

function clearDownloads() {
  ipcRenderer.send("overlay-clearDownloads");
}

function clearHistory() {
  ipcRenderer.send("overlay-clearHistory")
}

function cancelUpdate() {
  ipcRenderer.send("main-cancelUpdate");
  notificationManager.addStatusNotif("Update cancelled", "error");
}

function checkForUpdates() {
  ipcRenderer.send("main-checkForUpdates");
}

function exitAppAnyway() {
  ipcRenderer.send('request-exit-app-anyway');
}

function maximizeWindow() {
  ipcRenderer.send('request-maximize-window');
}

function minimizeWindow() {
  ipcRenderer.send('request-minimize-window');
}

function restoreWindow() {
  ipcRenderer.send('request-unmaximize-window');
}

function closeWindow() {
  ipcRenderer.send('request-quit-app');
}

function zoomIn() {
  ipcRenderer.send("tabManager-zoomIn");
}

function zoomOut() {
  ipcRenderer.send("tabManager-zoomOut");
}

function zoomToActualSize() {
  ipcRenderer.send("tabManager-zoomToActualSize");
}

function focusSearch() {
  let s = document.getElementById('search-input');
  s.focus();
  s.select();
}

function createBookmark() {
  ipcRenderer.send("overlay-bookmarkThisPage");
}

function bookmarkAllTabs() {
  ipcRenderer.send("main-bookmarkAllTabs");
}

function popupTabHistory() {
  ipcRenderer.send("tabManager-popupTabHistory");
}

function popupHomePageOptions() {
  ipcRenderer.send("main-popupHomePageOptions");
}

/*
 ###### #    # #    #  ####               ####  #    # ###### #####  #        ##   #   #
 #      #    # ##   # #    #             #    # #    # #      #    # #       #  #   # #
 #####  #    # # #  # #         #####    #    # #    # #####  #    # #      #    #   #
 #      #    # #  # # #                  #    # #    # #      #####  #      ######   #
 #      #    # #   ## #    #             #    #  #  #  #      #   #  #      #    #   #
 #       ####  #    #  ####               ####    ##   ###### #    # ###### #    #   #
*/

function showOverlay() {
  ipcRenderer.send("overlay-show");
}

function showOverlayButtonMenu() {
  ipcRenderer.send("overlay-showButtonMenu");
}

function goToSearch(text, selectionStart) {
  ipcRenderer.send("overlay-goToSearch", text, selectionStart);
}

// Perform search/navigation when pressing Enter in the titlebar address bar
function handleAddressBarKeyUp(event) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    const value = document.getElementById('search-input').value;
    // Route directly to overlay search handler (it decides URL vs text)
    ipcRenderer.send('overlay-performSearch', value);
  }
}

function removeFolder(id) {
  ipcRenderer.send("overlay-removeFolder", id);
}

function showOverlayMenu() {
  ipcRenderer.send("overlay-showMenu");
}

/*
 ###### #    # #    #  ####              #####   ##   #####     #    #   ##   #    #   ##    ####  ###### #####
 #      #    # ##   # #    #               #    #  #  #    #    ##  ##  #  #  ##   #  #  #  #    # #      #    #
 #####  #    # # #  # #         #####      #   #    # #####     # ## # #    # # #  # #    # #      #####  #    #
 #      #    # #  # # #                    #   ###### #    #    #    # ###### #  # # ###### #  ### #      #####
 #      #    # #   ## #    #               #   #    # #    #    #    # #    # #   ## #    # #    # #      #   #
 #       ####  #    #  ####                #   #    # #####     #    # #    # #    # #    #  ####  ###### #    #
*/

function newTab() {
  ipcRenderer.send("tabManager-newTab");
}

function newBackgroundTab() {
  event.preventDefault();
  if(event.which === 2) {
    ipcRenderer.send("tabManager-newBackgroundTab");
  }
}

function showTabList() {
  tabRenderer.showTabList();
}

function goBack() {
  ipcRenderer.send("tabManager-goBack");
}

function goForward() {
  ipcRenderer.send("tabManager-goForward");
}

function reload() {
  ipcRenderer.send("tabManager-reload");
}

function reloadIgnoringCache() {
  ipcRenderer.send("tabManager-reloadIgnoringCache");
}

function stop() {
  ipcRenderer.send("tabManager-stop");
}

function newTabDrop(event) {
  event.preventDefault();
  let textData = event.dataTransfer.getData("Text");
  if (textData) {
    ipcRenderer.send("tabManager-addTab", "file://" + textData, false);
  } else if(event.dataTransfer.files.length > 0) {
    for(let i = 0; i < event.dataTransfer.files.length; i++) {
      ipcRenderer.send("tabManager-addTab", "file://" + event.dataTransfer.files[i].path, false);
    }
  }
}

function tabsWheel(event) {
  // Vertical sidebar scrolls vertically
  const container = tabRenderer.getTabContainer();
  container.scrollTop += event.deltaY;
}

function goHome() {
  ipcRenderer.send("tabManager-goHome");
}

/*                                                                                                     
  ###### #    # #    #  ####              ###### # #    # #####     # #    #    #####    ##    ####  ###### 
  #      #    # ##   # #    #             #      # ##   # #    #    # ##   #    #    #  #  #  #    # #      
  #####  #    # # #  # #         #####    #####  # # #  # #    #    # # #  #    #    # #    # #      #####  
  #      #    # #  # # #                  #      # #  # # #    #    # #  # #    #####  ###### #  ### #      
  #      #    # #   ## #    #             #      # #   ## #    #    # #   ##    #      #    # #    # #      
  #       ####  #    #  ####              #      # #    # #####     # #    #    #      #    #  ####  ###### 
*/

function findNext() {
  document.getElementById("find-container").classList.add("show");
  let findInput = document.getElementById("find-input");
  findInput.focus();
  if(findInput.value.length > 0) {
    ipcRenderer.send("tabManager-findInPage", findInput.value, true);
  }
}

function findPrev() {
  document.getElementById("find-container").classList.add("show");
  let findInput = document.getElementById("find-input");
  findInput.focus();
  if(findInput.value.length > 0) {
    ipcRenderer.send("tabManager-findInPage", findInput.value, false);
  }
}

function findInputKeyUp() {
  let findInput = document.getElementById("find-input");
  if(findInput.value.length <= 0) {
    ipcRenderer.send("tabManager-stopFindInPage", false);
  }
}

function closeFindPanel() {
  document.getElementById("find-container").classList.remove("show");
  ipcRenderer.send("tabManager-stopFindInPage", true);
}

/*                                                          
  # #####   ####              ###### # #    # #####     # #    #    #####    ##    ####  ###### 
  # #    # #    #             #      # ##   # #    #    # ##   #    #    #  #  #  #    # #      
  # #    # #         #####    #####  # # #  # #    #    # # #  #    #    # #    # #      #####  
  # #####  #                  #      # #  # # #    #    # #  # #    #####  ###### #  ### #      
  # #      #    #             #      # #   ## #    #    # #   ##    #      #    # #    # #      
  # #       ####              #      # #    # #####     # #    #    #      #    #  ####  ###### 
*/

ipcRenderer.on("findInPage-findNext", (event) => {
  findNext();
});

ipcRenderer.on("findInPage-findPrev", (event) => {
  findPrev();
});

ipcRenderer.on("findInPage-updateFindInPage", (event) => {
  if(document.getElementById("find-container").classList.contains("show")) {
    let findInput = document.getElementById("find-input");
    if(findInput.value.length > 0) {
      findNext();
    }
  }
});

/*
 # #####   ####              #    #  ####  ##### # ######
 # #    # #    #             ##   # #    #   #   # #
 # #    # #         #####    # #  # #    #   #   # #####
 # #####  #                  #  # # #    #   #   # #
 # #      #    #             #   ## #    #   #   # #
 # #       ####              #    #  ####    #   # #
*/

ipcRenderer.on("notificationManager-addStatusNotif", (event, arg) => {
  notificationManager.addStatusNotif(arg.text, arg.type);
});

ipcRenderer.on("notificationManager-addQuestNotif", (event, arg) => {
  notificationManager.addQuestNotif(arg.text, arg.ops);
});

ipcRenderer.on("notificationManager-refreshZoomNotif", (event, zoomFactor) => {
  notificationManager.refreshZoomNotif(zoomFactor);
});

/*                                                            
  # #####   ####               ####   ####  #    #  ####   ####  #      ###### 
  # #    # #    #             #    # #    # ##   # #      #    # #      #      
  # #    # #         #####    #      #    # # #  #  ####  #    # #      #####  
  # #####  #                  #      #    # #  # #      # #    # #      #      
  # #      #    #             #    # #    # #   ## #    # #    # #      #      
  # #       ####               ####   ####  #    #  ####   ####  ###### ###### 
*/

ipcRenderer.on("console-log", (event, text) => {
  console.log(text);
});

/*
 # #####   ####              #    # # #    # #####   ####  #    #
 # #    # #    #             #    # # ##   # #    # #    # #    #
 # #    # #         #####    #    # # # #  # #    # #    # #    #
 # #####  #                  # ## # # #  # # #    # #    # # ## #
 # #      #    #             ##  ## # #   ## #    # #    # ##  ##
 # #       ####              #    # # #    # #####   ####  #    #
*/

ipcRenderer.on("action-page-focussearch", (event, arg) => {
  focusSearch();
});

ipcRenderer.on("window-updateTheme", (event) => {
  updateTheme();
});

ipcRenderer.on("window-blur", (event) => {
  document.body.classList.add("blur");
});

ipcRenderer.on("window-focus", (event) => {
  document.body.classList.remove("blur");
});

ipcRenderer.on("window-maximize", (event) => {
  document.getElementById("drag-zone").classList.add("maximize");
  document.getElementById("max-btn").style.display = "none";
  document.getElementById("restore-btn").style.display = "";
});

ipcRenderer.on("window-unmaximize", (event) => {
  document.getElementById("drag-zone").classList.remove("maximize");
  document.getElementById("max-btn").style.display = "";
  document.getElementById("restore-btn").style.display = "none";
});

/*
 # #####   ####               ####  #    # ###### #####  #        ##   #   #
 # #    # #    #             #    # #    # #      #    # #       #  #   # #
 # #    # #         #####    #    # #    # #####  #    # #      #    #   #
 # #####  #                  #    # #    # #      #####  #      ######   #
 # #      #    #             #    #  #  #  #      #   #  #      #    #   #
 # #       ####               ####    ##   ###### #    # ###### #    #   #
*/

ipcRenderer.on('overlay-toggleButton', (event, bool) => {
  // Overlay now opens as a regular tab. Keep titlebar visible.
  const btn = document.getElementById("overlay-btn");
  if(btn) {
    if(bool) btn.classList.add("active"); else btn.classList.remove("active");
  }
});

/*
 # #####   ####              #####   ##   #####     #####  ###### #    # #####  ###### #####  ###### #####
 # #    # #    #               #    #  #  #    #    #    # #      ##   # #    # #      #    # #      #    #
 # #    # #         #####      #   #    # #####     #    # #####  # #  # #    # #####  #    # #####  #    #
 # #####  #                    #   ###### #    #    #####  #      #  # # #    # #      #####  #      #####
 # #      #    #               #   #    # #    #    #   #  #      #   ## #    # #      #   #  #      #   #
 # #       ####                #   #    # #####     #    # ###### #    # #####  ###### #    # ###### #    #
*/

ipcRenderer.on("tabRenderer-addTab", (event, arg) => {
  tabRenderer.addTab(arg.id, arg.url, arg.active)
});

ipcRenderer.on("tabRenderer-activateTab", (event, id) => {
  tabRenderer.activateTab(id);
});

ipcRenderer.on("tabRenderer-closeTab", (event, id) => {
  tabRenderer.closeTab(id);
});

ipcRenderer.on("tabRenderer-setTabTitle", (event, arg) => {
  tabRenderer.setTabTitle(arg.id, arg.title);
});

ipcRenderer.on("tabRenderer-setTabIcon", (event, arg) => {
  tabRenderer.setTabIcon(arg.id, arg.icon);
});

ipcRenderer.on("tabRenderer-updateNavigationButtons", (event, arg) => {
  tabRenderer.updateNavigationButtons(arg.canGoBack, arg.canGoForward, arg.isLoading);
});

ipcRenderer.on("tabRenderer-updateAddressBar", (event, url) => {
  tabRenderer.updateAddressBar(url);
  ipcRenderer.send("overlay-checkIfBookmarked", url);
});

ipcRenderer.on("tabRenderer-updateBookmarkedButton", (event, exists, id) => {
  tabRenderer.updateBookmarkedButton(exists, id);
});

ipcRenderer.on("tabRenderer-unactivateAllTabs", (event) => {
  tabRenderer.unactivateAllTabs();
});

ipcRenderer.on("tabRenderer-updateTargetURL", (event, url) => {
  tabRenderer.updateTargetURL(url);
});

ipcRenderer.on("tabRenderer-moveTabBefore", (event, id, beforeId) => {
  tabRenderer.moveTabBefore(id, beforeId);
});

ipcRenderer.on("tabRenderer-moveTabToEnd", (event, id) => {
  tabRenderer.moveTabToEnd(id);
});

ipcRenderer.on("tabRenderer-setHomePage", (event, homePage) => {
  var btn = document.getElementById("home-btn");
  if(homePage.on == 1) {
    btn.style.display = "";
    btn.onclick = () => {
      goHome();
    }
    btn.title = "Go home\n(" + homePage.url + ")";
  } else {
    btn.style.display = "none";
  }
});

ipcRenderer.on("tabRenderer-setTabVisibility", (event, id, bool) => {
  tabRenderer.setTabVisibility(id, bool);
});

ipcRenderer.on("tabRenderer-updateTabsPositions", (event) => {
  tabRenderer.updateTabsPositions();
});

ipcRenderer.on("tabRenderer-showTabPreview", (event, id, title, url) => {
  tabRenderer.showTabPreview(id, title, url);
});

/*
.####.##....##.####.########
..##..###...##..##.....##...
..##..####..##..##.....##...
..##..##.##.##..##.....##...
..##..##..####..##.....##...
..##..##...###..##.....##...
.####.##....##.####....##...
*/

function init() {
  loadWinControlsModule().then((winControls) => {
    applyWinControls(winControls.systemTitlebar);
  });

  updateTheme();

  // Wire up Enter-to-search on the titlebar address bar
  const addr = document.getElementById('search-input');
  if (addr) {
    addr.addEventListener('keyup', handleAddressBarKeyUp);
  }

  // Sidebar resizer drag
  const resizer = document.getElementById('sidebar-resizer');
  const sidebar = document.getElementById('tabman');
  if (resizer && sidebar) {
    let dragging = false;
    const minW = 160;
    const maxW = 420;
    const root = document.documentElement;

    // Restore saved width (baseline)
    let baselineWidth = parseInt(localStorage.getItem('onyx.sidebarWidth') || '64', 10);
    if (!Number.isFinite(baselineWidth)) baselineWidth = 64;
    const initWidth = Math.max(minW, Math.min(maxW, baselineWidth));
    root.style.setProperty('--sidebar-current', initWidth + 'px');
    ipcRenderer.send('ui-sidebar-resized', initWidth);

    // Helper to set width and notify
    const setSidebarWidth = (widthPx, persist = false) => {
      const w = Math.max(minW, Math.min(maxW, widthPx));
      root.style.setProperty('--sidebar-current', w + 'px');
      if (persist) {
        baselineWidth = w;
        try { localStorage.setItem('onyx.sidebarWidth', String(w)); } catch (e) {}
      }
      ipcRenderer.send('ui-sidebar-resized', w);
    };

    // Drag resize
    const onMove = (e) => {
      if (!dragging) return;
      setSidebarWidth(e.clientX, true);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    resizer.addEventListener('mousedown', () => {
      dragging = true;
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });

    // Hover-to-expand
    const cs = getComputedStyle(document.documentElement);
    const getExpanded = () => parseInt(cs.getPropertyValue('--sidebar-expanded')) || 260;
    sidebar.addEventListener('mouseenter', () => {
      // Expand only if baseline smaller than expanded
      const target = Math.max(baselineWidth, getExpanded());
      setSidebarWidth(target, false);
    });
    sidebar.addEventListener('mouseleave', () => {
      // Revert to baseline width after hover ends (unless dragging updated it)
      setSidebarWidth(baselineWidth, false);
    });
  }
}

document.onkeyup = function(e) {
  if(document.getElementById("find-input") == document.activeElement) {
    if (e.which == 27) {
      closeFindPanel();
    } 
    if (e.which == 13) {
      if (e.shiftKey) {
        findPrev();
      } else {
        findNext();
      }
    } 
    if (e.which == 38) {
      e.preventDefault();
      findPrev();
    }
    if (e.which == 40) {
      e.preventDefault();
      findNext();
    }
  }
};

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
      init();
  }
}

// Apply sidebar width updates coming from main (e.g., changed in Settings)
ipcRenderer.on('ui-apply-sidebar-width', (event, width) => {
  const root = document.documentElement;
  if (typeof width === 'number' && width > 0) {
    root.style.setProperty('--sidebar-current', width + 'px');
  }
});

/*
.########.##.....##.########....########.##....##.########.
....##....##.....##.##..........##.......###...##.##.....##
....##....##.....##.##..........##.......####..##.##.....##
....##....#########.######......######...##.##.##.##.....##
....##....##.....##.##..........##.......##..####.##.....##
....##....##.....##.##..........##.......##...###.##.....##
....##....##.....##.########....########.##....##.########.
*/
