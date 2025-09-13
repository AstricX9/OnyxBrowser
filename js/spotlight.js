"use strict";

const { ipcRenderer } = require("electron");
const SearchManager = require("../modules/SearchManager/SearchManager.js");

let sm = null;

function init() {
  try {
    const searchInput = document.getElementById("search-input");
    const backdrop = document.getElementById("backdrop");
    const searchSuggest = document.getElementById("search-suggest");
    const searchSuggestContainer = document.getElementById("search-suggest-container");
    const searchEngines = document.getElementById("search-engines");
    const clearBtn = document.getElementById("clear-search-btn");

    sm = new SearchManager(searchInput, searchSuggest, searchSuggestContainer, searchEngines, clearBtn);

    clearBtn.addEventListener("click", () => {
      try { sm.clearSearch(); } catch (e) {}
      searchInput.focus();
    });

    // Close on ESC
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        try { window.close(); } catch (_) {}
      }
    });

    // Close when clicking outside the panel
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        // If the click is directly on the backdrop (not inside the panel), close
        if (e.target === backdrop) {
          try { window.close(); } catch (_) {}
        }
      });
    }
    
      // Toggle fade/scroll classes based on content height
      function refreshSuggestOverflowState() {
        if (!searchSuggest || !searchSuggestContainer) return;
        const scrollable = searchSuggestContainer.scrollHeight > searchSuggestContainer.clientHeight + 1;
        searchSuggest.classList.toggle('scrollable', scrollable);
        const atBottom = Math.ceil(searchSuggestContainer.scrollTop + searchSuggestContainer.clientHeight) >= searchSuggestContainer.scrollHeight;
        searchSuggest.classList.toggle('at-bottom', atBottom);
      }
    
      // Observe DOM changes in suggestions and resize events
      const mo = new MutationObserver(refreshSuggestOverflowState);
      mo.observe(searchSuggestContainer, { childList: true, subtree: false });
      searchSuggestContainer.addEventListener('scroll', refreshSuggestOverflowState);
      window.addEventListener('resize', refreshSuggestOverflowState);
      // Initial state
      setTimeout(refreshSuggestOverflowState, 100);

    // Focus input on ready
    setTimeout(() => searchInput.focus(), 50);
  } catch (e) {
    try { ipcRenderer.send("main-addStatusNotif", { type: "error", text: `Spotlight init error: ${e?.message || e}` }); } catch (_) {}
    console.error("Spotlight init error", e);
  }
}

window.addEventListener("DOMContentLoaded", init);
