(function () {
  var storageKey = "flowhr.locale";

  function normalizeLocale(input) {
    if (!input) {
      return "";
    }
    var value = String(input).toLowerCase();
    if (value.indexOf("ko") === 0) {
      return "ko";
    }
    if (value.indexOf("en") === 0) {
      return "en";
    }
    return "";
  }

  function parseVars(raw) {
    if (!raw) {
      return {};
    }
    try {
      return JSON.parse(raw);
    } catch (error) {
      return {};
    }
  }

  function formatMessage(template, vars) {
    return String(template).replace(/\{(\w+)\}/g, function (_, key) {
      return Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : "";
    });
  }

  function resolveLocale() {
    var params = new URLSearchParams(window.location.search);
    var paramLocale = normalizeLocale(params.get("lang"));
    if (paramLocale) {
      window.localStorage.setItem(storageKey, paramLocale);
      return paramLocale;
    }

    var storedLocale = normalizeLocale(window.localStorage.getItem(storageKey));
    if (storedLocale) {
      return storedLocale;
    }

    var tenantLocale = normalizeLocale(document.documentElement.getAttribute("data-tenant-locale"));
    if (tenantLocale) {
      return tenantLocale;
    }

    var browserLocales = navigator.languages || [navigator.language || navigator.userLanguage || ""];
    for (var i = 0; i < browserLocales.length; i += 1) {
      var browserLocale = normalizeLocale(browserLocales[i]);
      if (browserLocale) {
        return browserLocale;
      }
    }

    return "en";
  }

  function translatePage() {
    var locale = resolveLocale();
    var catalog = window.__FLOWHR_I18N__ || {};
    document.documentElement.lang = locale;

    document.querySelectorAll("[data-lid]").forEach(function (node) {
      var key = node.getAttribute("data-lid");
      var entry = catalog[key];
      if (!entry) {
        return;
      }
      var template = entry[locale] || entry.en || entry.ko || "";
      var content = formatMessage(template, parseVars(node.getAttribute("data-lid-vars")));
      if (node.getAttribute("data-lid-html") === "true") {
        node.innerHTML = content;
      } else {
        node.textContent = content;
      }
    });

    window.FlowHRI18n = {
      locale: locale,
      setLocale: function (nextLocale) {
        var normalized = normalizeLocale(nextLocale) || "en";
        window.localStorage.setItem(storageKey, normalized);
        window.location.reload();
      }
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", translatePage);
  } else {
    translatePage();
  }
})();
