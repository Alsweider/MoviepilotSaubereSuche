// ==UserScript==
// @name         Moviepilot saubere Suche
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Entfernt den "Anzeige"-Eintrag aus der Filmsuche auf moviepilot.de
// @author       Alsweider
// @match        https://www.moviepilot.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=moviepilot.de
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeAnzeige() {
        document.querySelectorAll('div.sc-76af267a-6').forEach(el => {
            if (el.textContent.trim() === "Anzeige") {
                const entry = el.closest('a.sc-76af267a-0');
                if (entry) entry.remove();
            }
        });
    }

    // Änderungen im DOM beobachten (Dropdown wird dynamisch geladen)
    new MutationObserver(removeAnzeige).observe(document.body, { childList: true, subtree: true });

    removeAnzeige();
})();
