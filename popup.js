// Extract base domain from URL (like "starbucks" from "www.starbucks.com", "starbucks.ro", etc.)
function extractBaseDomain(url) {
  const hostname = new URL(url).hostname.replace(/^www\./, "");
  const parts = hostname.split(".");
  if (parts.length >= 2) {
    return parts[parts.length - 2]; // Get second-to-last part, e.g., "starbucks"
  }
  return hostname;
}

// Display message in popup
function showStatus(message) {
  const statusElem = document.getElementById("status");
  if (statusElem) {
    statusElem.textContent = message;
  }
}

// Main logic when popup is opened
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs.length === 0) {
    showStatus("No active tab found.");
    return;
  }

  const tab = tabs[0];
  const baseDomain = extractBaseDomain(tab.url);

  // Fetch the list of companies
  fetch(chrome.runtime.getURL("companies.json"))
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load companies.json");
      }
      return response.json();
    })
    .then((companies) => {
      if (companies.includes(baseDomain)) {
        showStatus(`${baseDomain} supports Israel in Genocide.`);
        chrome.tabs.executeScript(tab.id, { file: "contentScript.js" });
      } else {
        showStatus(`${baseDomain} does not support Israel in Genocide.`);
      }
    })
    .catch((err) => {
      showStatus("Error checking company.");
      console.error(err);
    });
});

