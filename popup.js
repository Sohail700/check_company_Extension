// Extract domain from URL (remove protocol and www.)
function extractDomain(url) {
  return new URL(url).hostname.replace(/^www\./, '');
}

// Display message in popup
function showStatus(message) {
  const statusElem = document.getElementById('status');
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
  const domain = extractDomain(tab.url);

  // Fetch the list of companies
  fetch(chrome.runtime.getURL('companies.json'))
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load companies.json');
      }
      return response.json();
    })
    .then(companies => {
      if (companies.includes(domain)) {
        showStatus(`${domain} Supports Israel in Genocide.`);

        // Inject blackout script
        chrome.tabs.executeScript(tab.id, { file: 'contentScript.js' });
      } else {
        showStatus(`${domain} does not Support Israel in Genocide.`);
      }
    })
    .catch(err => {
      showStatus('Error checking company.');
      console.error(err);
    });
});
