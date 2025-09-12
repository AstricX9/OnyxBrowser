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

const loadTheme = require("../modules/loadTheme.js");
const applyTheme = require("../modules/applyTheme.js");
const applyWinControls = require("../modules/applyWinControls.js");
const loadWinControlsModule = require("../modules/loadWinControls.js");

/*
.########.##.....##.##....##..######..########.####..#######..##....##..######.
.##.......##.....##.###...##.##....##....##.....##..##.....##.###...##.##....##
.##.......##.....##.####..##.##..........##.....##..##.....##.####..##.##......
.######...##.....##.##.##.##.##..........##.....##..##.....##.##.##.##..######.
.##.......##.....##.##..####.##..........##.....##..##.....##.##..####.......##
.##.......##.....##.##...###.##....##....##.....##..##.....##.##...###.##....##
.##........#######..##....##..######.....##....####..#######..##....##..######.
*/

function openLicenseFile() {
  ipcRenderer.send("tabManager-addTab", "file://" + __dirname + "/../LICENSE", true);
}

function loadAbout() {
  document.getElementById("about-electron").innerHTML = "Electron: v" + process.versions.electron;
  document.getElementById("about-chrome").innerHTML = "Chrome: v" + process.versions.chrome;
  document.getElementById("about-node").innerHTML = "Node: " + process.version;

  ipcRenderer.send("request-set-about");
}

function openIssuesPage() {
  ipcRenderer.send("tabManager-addTab", "https://github.com/AstricX9/OnyxBrowser/issues", true);
}

function openDonatePage() {
  ipcRenderer.send("tabManager-addTab", "https://www.patreon.com/moduleart", true);
}

function openDeveloperPage() {
  ipcRenderer.send("tabManager-addTab", "https://github.com/AstricX9", true);
}

function openAppPage() {
  ipcRenderer.send("tabManager-addTab", "https://github.com/AstricX9/OnyxBrowser", true);
}

function openReleasesPage() {
  ipcRenderer.send("tabManager-addTab", "https://github.com/AstricX9/OnyxBrowser/releases", true);
}

function openPlannerPage() {
  // No planner board for Onyx currently; open issues as roadmap
  ipcRenderer.send("tabManager-addTab", "https://github.com/AstricX9/OnyxBrowser/issues", true);
}

function openSourcePage() {
  ipcRenderer.send("tabManager-addTab", "https://github.com/AstricX9/OnyxBrowser", true);
}

function openElectronPage() {
  ipcRenderer.send("tabManager-addTab", "https://electronjs.org/releases", true);
}

function openChromePage() {
  ipcRenderer.send("tabManager-addTab", "https://chromereleases.googleblog.com", true);
}

function openNodePage() {
  ipcRenderer.send("tabManager-addTab", "https://nodejs.org/en/download/releases", true);
}

function openDiscordPage() {
  ipcRenderer.send("tabManager-addTab", "https://discord.gg/9q4D8SJ", true);
}

function openLicensePage() {
  ipcRenderer.send("tabManager-addTab", "https://github.com/AstricX9/OnyxBrowser/blob/main/LICENSE", true);
}

function checkForUpdates() {
  ipcRenderer.send("main-checkForUpdates");
}

/*
 ###### #    # #    #  ####              ##### #    # ###### #    # ######  ####
 #      #    # ##   # #    #               #   #    # #      ##  ## #      #
 #####  #    # # #  # #         #####      #   ###### #####  # ## # #####   ####
 #      #    # #  # # #                    #   #    # #      #    # #           #
 #      #    # #   ## #    #               #   #    # #      #    # #      #    #
 #       ####  #    #  ####                #   #    # ###### #    # ######  ####
*/

function updateTheme() {
  loadTheme().then(({ theme, dark }) => {
    console.log(theme)
    applyTheme(theme, dark);
  });
}

/*
 ###### #    # #    #  ####              #    # # #    # #####   ####  #    #
 #      #    # ##   # #    #             #    # # ##   # #    # #    # #    #
 #####  #    # # #  # #         #####    #    # # # #  # #    # #    # #    #
 #      #    # #  # # #                  # ## # # #  # # #    # #    # # ## #
 #      #    # #   ## #    #             ##  ## # #   ## #    # #    # ##  ##
 #       ####  #    #  ####              #    # # #    # #####   ####  #    #
*/

function closeWindow() {
  // If loaded inside a tab, close the tab; else close separate window
  if (window.top === window) {
    ipcRenderer.send("about-closeWindow");
  } else {
    ipcRenderer.send("tabManager-closeActiveTab");
  }
}

/*
# #####   ####                ##   #####   ####  #    # ##### 
# #    # #    #              #  #  #    # #    # #    #   #   
# #    # #         #####    #    # #####  #    # #    #   #   
# #####  #                  ###### #    # #    # #    #   #   
# #      #    #             #    # #    # #    # #    #   #   
# #       ####              #    # #####   ####   ####    #   
*/

ipcRenderer.on("action-set-about", (event, arg) => {
  document.getElementById("about-app").innerHTML = "Beta v" + arg.version + "<br>" + arg.platform + " / " + arg.arch;
});

/*
 # #####   ####              #    # # #    # #####   ####  #    #
 # #    # #    #             #    # # ##   # #    # #    # #    #
 # #    # #         #####    #    # # # #  # #    # #    # #    #
 # #####  #                  # ## # # #  # # #    # #    # # ## #
 # #      #    #             ##  ## # #   ## #    # #    # ##  ##
 # #       ####              #    # # #    # #####   ####  #    #
*/

ipcRenderer.on("window-blur", (event) => {
  document.getElementById("titlebar").classList.add("blur");
});

ipcRenderer.on("window-focus", (event) => {
  document.getElementById("titlebar").classList.remove("blur");
});

/*
 # #    # # #####
 # ##   # #   #
 # # #  # #   #
 # #  # # #   #
 # #   ## #   #
 # #    # #   #
*/

function init() {

  updateTheme();

  loadAbout();
}

document.onkeyup = function(e) {
  if (e.which == 27) {
    closeWindow();
  } 
};

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
      init();
  }
};

/*
##### #    # ######    ###### #    # #####  
  #   #    # #         #      ##   # #    # 
  #   ###### #####     #####  # #  # #    # 
  #   #    # #         #      #  # # #    # 
  #   #    # #         #      #   ## #    # 
  #   #    # ######    ###### #    # #####  
*/