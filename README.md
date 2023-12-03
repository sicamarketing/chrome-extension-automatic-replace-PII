# chrome-extension-automatic-replace-PII
Replace personally identifiable information like name, phone number, email address on a webpage with fake placeholder content, to protect sensitive data in screenshots and screen recordings.

**What it does:** When activated on a webpage, it replaces any found names, numbers, and email addresses in the UI with fake names, numbers, email addresses. 

**Why?** Useful for removing PII from screen demo recordings.

**Notes:** On each page, user must click extension button to replace PII, so if a demo involves navigating to multiple pages, you’ll need to edit out the moments when customer data is visible on page load.

**To do:**

• Add more logic to ensure it only changes names (it currently looks for capitalized words to replace, which can result in other UI elements being replaced that aren't names.)

• Make it run automatically when page loads – currently, each new page visited will show new PII, and user must press button in the extension to replace content on every page. This makes it not ideal for any live uses, yet. 

• Add address replacement.

• Add ability to exclude certain words/content from being replaced.

--

**How to install:**

1. Download the files into a folder on your computer.

2. Open Chrome Extensions Page: Open Chrome and navigate to chrome://extensions/ in the address bar.

3. Enable Developer Mode in Chrome: Enable "Developer mode" by toggling the switch in the top-right corner of the Extensions page.

4. Load Unpacked Extension: Click on the "Load unpacked" button which appears after enabling Developer mode. In the file picker dialog, navigate to and select the folder containing the extension files.

5. Complete the Installation: The extension should now appear in your list of installed extensions and be ready to use. Navigate to a page you want to replace personal information on, and click the button in the extension menu to replace the names, phone numbers, and email addresses with fake data. 

You may want to pin the extension so its easily accessible on any page.
