// ==UserScript==
// @name         Moviepilot saubere Suche
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  Entfernt den "Anzeige"-Eintrag aus der Filmsuche auf moviepilot.de
// @author       Alsweider
// @match        https://www.moviepilot.de/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=moviepilot.de
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeAnzeige() {
        // Auf den Suchbereich neben dem Suchformular beschränken (id="navSearch"
        // ist als Funktionsanker deutlich beständiger als die von styled-components
        // vergebenen "sc-…"-Klassen, die sich bei jedem Deployment ändern können)
        const suchfeld = document.getElementById('navSearch');
        const bereich = suchfeld ? suchfeld.parentElement : document.body;
        if (!bereich) return;

        bereich.querySelectorAll('div').forEach(el => {
            // Nur Blattelemente (ohne Kindknoten) mit exaktem Text "Anzeige" zählen als Treffer,
            // damit übergeordnete Container nicht versehentlich erfasst werden
            if (el.children.length === 0 && el.textContent.trim() === "Anzeige") {
                const eintrag = el.closest('a[href]');
                if (eintrag) eintrag.remove();
            }
        });
    }

    // Änderungen im DOM beobachten (Dropdown wird dynamisch geladen)
    new MutationObserver(removeAnzeige).observe(document.body, { childList: true, subtree: true });

    removeAnzeige();
})();
