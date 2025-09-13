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
const SearchManager = require("../modules/SearchManager/SearchManager.js");

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
  direction: "horizontal"
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

// Focus / Flow Mode toggle
let isFocusMode = false;
function setFocusMode(next) {
  isFocusMode = !!next;
  if (isFocusMode) {
    document.body.classList.add('focus-mode');
  } else {
    document.body.classList.remove('focus-mode');
  }
  const btn = document.getElementById('focus-btn');
  if (btn) btn.setAttribute('aria-pressed', String(isFocusMode));
}

function toggleFocusMode() {
  setFocusMode(!isFocusMode);
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
  if (event.deltaY < 0) {
    tabRenderer.scrollLeft();
  }
  if (event.deltaY > 0) {
    tabRenderer.scrollRight();
  }
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

// IPC from main to toggle focus mode (global shortcut)
ipcRenderer.on('browser-toggle-focus', () => {
  try { notificationManager.addStatusNotif('[Debug] Received browser-toggle-focus', 'info'); } catch (e) {}
  toggleFocusMode();
});

// Spotlight state and helpers
let spotlightOpen = false;
let spotlightSearch = null;
let spotlightShortcutRegistered = true; // assume true until main tells us
function openSpotlight(prefillText = "", cursorPos = null) {
  const root = document.getElementById('spotlight');
  if (!root) return;
  root.style.display = '';
  root.setAttribute('aria-hidden', 'false');
  spotlightOpen = true;
  try {
    if (!spotlightSearch) initSpotlight();
    if (prefillText != null) {
      spotlightSearch.goToSearch(prefillText, cursorPos);
    }
  } catch(e) {}
}

function closeSpotlight() {
  const root = document.getElementById('spotlight');
  if (!root) return;
  root.setAttribute('aria-hidden', 'true');
  root.style.display = 'none';
  spotlightOpen = false;
}

function toggleSpotlight() {
  if (spotlightOpen) closeSpotlight(); else openSpotlight('');
}

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

  // Ensure button reflects initial state
  setFocusMode(false);

  // Fallback in-window shortcut: Ctrl/Cmd+K toggles in-page Spotlight ONLY if global shortcut failed to register
  window.addEventListener('keydown', (e) => {
    const key = (e.key || '').toLowerCase();
    const mod = e.ctrlKey || e.metaKey;
    if (mod && !e.altKey && !e.shiftKey && key === 'k' && !spotlightShortcutRegistered) {
      e.preventDefault();
      toggleSpotlight();
    }
    // ESC closes spotlight
    if (e.key === 'Escape' && spotlightOpen) {
      e.preventDefault();
      closeSpotlight();
    }
  }, true);
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

// Initialize Spotlight wiring and SearchManager instance
function initSpotlight() {
  const input = document.getElementById('spotlight-input');
  const suggest = document.getElementById('spotlight-suggest');
  const suggestContainer = document.getElementById('spotlight-suggest-container');
  const engines = document.getElementById('spotlight-engines');
  const clearBtn = document.getElementById('spotlight-clear');
  const goBtn = document.getElementById('spotlight-go');

  if (!(input && suggest && suggestContainer && engines && clearBtn && goBtn)) return;

  spotlightSearch = new SearchManager(input, suggest, suggestContainer, engines, clearBtn);
  // mirror icon behavior used in overlay
  try {
    const iconEl = document.getElementById('spotlight-search-icon');
    const active = engines.getElementsByClassName('active')[0];
    if (iconEl && active) {
      iconEl.src = active.getElementsByTagName('img')[0].src;
    }
  } catch (e) {}

  goBtn.addEventListener('click', () => {
    try { spotlightSearch.performSearch(input.value); } finally { closeSpotlight(); }
  });

  // Enter triggers search (SearchManager handles Enter on input as well)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      try { spotlightSearch.performSearch(input.value); } finally { closeSpotlight(); }
    }
  });

  // Click outside to close
  const backdrop = document.querySelector('#spotlight .spotlight-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeSpotlight);
}

// IPC from main: state of global shortcut registration for Ctrl/Cmd+K
ipcRenderer.on('spotlight-shortcut-state', (_evt, ok) => {
  spotlightShortcutRegistered = !!ok;
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
