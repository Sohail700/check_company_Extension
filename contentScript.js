// contentScript.js

// Function to extract domain name from URL
function extractDomain(url) {
  // Remove protocol and www. (if present) from the URL
  return new URL(url).hostname.replace(/^www\./, '');
}

// Function to check if the domain belongs to the company
function checkCompany(domain) {
  // Fetch the list of companies from companies.json
  fetch(chrome.extension.getURL('companies.json'))
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(companies => {
          if (companies.includes(domain)) {
              showStatus(`${domain} Supports Isreal in Genocide.`);
          } else {
              showStatus(`${domain} does not Support Isreal in Genocide.`);
          }
      })
      .catch(error => {
          showStatus('Error fetching company data.');
          console.error('Error:', error);
      });
}

// Function to display status in the popup
function showStatus(message) {
  document.getElementById('status').textContent = message;
}

// Event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
  // Retrieve the current tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let url = tabs[0].url;
      let domain = extractDomain(url);
      checkCompany(domain);
  });
});
