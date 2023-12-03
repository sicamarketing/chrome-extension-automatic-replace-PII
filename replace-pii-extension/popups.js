// popups.js
document.addEventListener('DOMContentLoaded', function () {
    var replaceDataButton = document.getElementById('replaceData');
    replaceDataButton.addEventListener('click', function () {
        // Send a message to the content script
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "replaceData"});
        });
    });
});
