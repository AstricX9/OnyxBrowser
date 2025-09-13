"use strict";

const ppath = require("persist-path")("Onyx");
const fs = require("fs");

const saveFileToJsonFolder = require("./saveFileToJsonFolder.js");

function loadSpotlightShortcut() {
  return new Promise((resolve) => {
    const def = "CommandOrControl+K";
    try {
      fs.readFile(ppath + "/json/spotlight-shortcut.json", (err, data) => {
        if (err) return resolve(def);
        const s = (data || "").toString().trim();
        if (s && s.length > 0) return resolve(s);
        resolve(def);
      });
    } catch (e) {
      saveFileToJsonFolder(null, "spotlight-shortcut", def).then(() => resolve(def)).catch(() => resolve(def));
    }
  });
}

module.exports = loadSpotlightShortcut;
