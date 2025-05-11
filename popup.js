function extractDomain(url) {
  return new URL(url).hostname.replace(/^www\./, '');
}

function showStatus(message) {
  document.getElementById('status').textContent = message;
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const tab = tabs[0];
  const domain = extractDomain(tab.url);

  fetch(chrome.runtime.getURL('companies.json'))
    .then(response => response.json())
    .then(companies => {
      if (companies.includes(domain)) {
        showStatus(`${domain} Supports Israel in Genocide.`);

        // Inject content script to apply blackout
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['contentScript.js']
        });

      } else {
        showStatus(`${domain} does not Support Israel in Genocide.`);
      }
    })
    .catch(err => {
      showStatus('Error checking company.');
      console.error(err);
    });
});
