// EXCLUSION WORD LIST
const exclusionList = ["Web Chat", "Business App", "Website Lead", "Automated Assistant"];

function isExcluded(text) {
    return exclusionList.some(excluded => text.includes(excluded));
}

function replaceTextContent(text, replacementFunction) {
    if (isExcluded(text)) {
        return text; // Skip replacement
    }
    return replacementFunction(text);
}

function replaceDataInElement(element) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach(replaceDataInElement);
    } else if (element.nodeType === Text.TEXT_NODE) {
        element.textContent = replaceTextContent(element.textContent, replaceNamesInText);
        element.textContent = replaceTextContent(element.textContent, replacePhoneNumbersInText);
        element.textContent = replaceTextContent(element.textContent, replaceEmailsInText);
    }
}

// NAME

// Function to identify if a word is likely a name
function isName(word) {
    return word.charAt(0) === word.charAt(0).toUpperCase() && word.length > 2;
}

function generateFakeName() {
    const firstNames = [
        "John", "Jane", "Alex", "Laura", "Chris",
        "Aisha", "Ming", "Carlos", "Fatima", "Ivan",
        "Yuki", "Nia", "Raj", "Sofia", "Liam",
        "Olivia", "Mohamed", "Maria", "Kwame", "Anika",
        "Hiro", "Lena", "Dev", "Isabella", "Samuel",
        "Zara", "Felix", "Amina", "Ravi", "Elena",
        "Mateo", "Leila", "Ken", "Diana", "Jin",
        "Layla", "Arjun", "Nadia", "Amir", "Sara"
    ];
    const lastNames = [
        "Doe", "Smith", "Johnson", "Williams", "Brown",
        "Garcia", "Chen", "Singh", "Martinez", "Khan",
        "Nguyen", "Kim", "Patel", "Jones", "Lee",
        "Anderson", "Lopez", "Hernandez", "Rodriguez", "Perez",
        "Wang", "Murphy", "Cohen", "Davis", "Miller",
        "Wilson", "Taylor", "Thomas", "Moore", "Jackson",
        "Martin", "Lee", "Clark", "Yang", "Harris",
        "Lewis", "Robinson", "Walker", "Young", "Allen"
    ];

    return firstNames[Math.floor(Math.random() * firstNames.length)] + 
           " " + 
           lastNames[Math.floor(Math.random() * lastNames.length)];
}


function replaceNamesInTable() {
    // Query for table cells that contain names
    const nameCells = document.querySelectorAll('td.mat-column-fullName a');
    nameCells.forEach(function(anchor) {
        // Only replace the text if it's not in the exclusion list
        if (!isExcluded(anchor.textContent)) {
            anchor.textContent = replaceNamesInText(anchor.textContent);
        }
    });
}

function replaceNamesInText(text) {
    // Regular expression to match two-word names
    const nameRegex = /\b([A-Z][a-z]+ [A-Z][a-z]+)\b/g;

    // Replace each match with a fake name, unless it's an excluded string
    return text.replace(nameRegex, (matchedName) => {
        if (isExcluded(matchedName)) {
            return matchedName; // Return the original name if it's in the exclusion list
        }
        return generateFakeName(); // Otherwise, replace it
    });
}



// Event listener to trigger the name replacement when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    replaceNamesInElement(document.body);
});

// PHONE
function generateFakePhoneNumber(format) {
    // Generates a fake phone number based on the detected format
    if (format === 'US') {
        // US Format: +1 555 XXX XXXX
        return '+1 555 ' + Math.floor(100 + Math.random() * 900) + ' ' + 
               Math.floor(1000 + Math.random() * 9000);
    } else if (format === 'EU') {
        // EU Format: +41 76 237 XX XX
        return '+41 76 237 ' + Math.floor(10 + Math.random() * 90) + ' ' + 
               Math.floor(10 + Math.random() * 90);
    }
    // Default format (can add more as needed)
    return '+1 555 ' + Math.floor(100 + Math.random() * 900) + ' ' + 
           Math.floor(1000 + Math.random() * 9000);
}

function replacePhoneNumbersInText(text) {
    // Regular expression to match various phone number formats
    const phoneNumberRegex = /\+\d{1,3}[\s-]?\d{1,3}[\s-]?\d{1,4}[\s-]?\d{1,4}/g;

    // Replace each phone number with a fake phone number based on the format
    return text.replace(phoneNumberRegex, (match) => {
        // Determine format based on the match (add more logic as needed)
        if (match.startsWith('+1')) {
            return generateFakePhoneNumber('US');
        } else if (match.startsWith('+41')) {
            return generateFakePhoneNumber('EU');
        }
        return generateFakePhoneNumber('default');
    });
}

// EMAIL
function generateFakeEmail() {
    const words = ["blue", "green", "happy", "travel", "book",
                   "sunny", "moon", "star", "mountain", "river",
                   "ocean", "tree", "sky", "summer", "winter",
                   "autumn", "spring", "city", "forest", "flower"];
    const separators = ["", ".", "_"];

    const word1 = words[Math.floor(Math.random() * words.length)];
    const word2 = words[Math.floor(Math.random() * words.length)];
    const separator = separators[Math.floor(Math.random() * separators.length)];
    const number = Math.floor(Math.random() * 100);

    const userName = `${word1}${separator}${word2}${number}`;
    const domains = ["example.com", "placeholder.org", "sample.net"];
    const domain = domains[Math.floor(Math.random() * domains.length)];

    return userName + "@" + domain;
}


function replaceEmailsInText(text) {
    // Regular expression to match email addresses
    const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g;

    // Replace each email address with a fake email address
    return text.replace(emailRegex, generateFakeEmail);

}

// LAST
// Listener for the replaceData action from the popup
function replaceDataInElement(element) {
    // Define a list of classes or IDs to exclude from replacement
    const excludeClasses = ["business-navbar__item", "bc-nav__text", "business-navbar__sidebar__footer__contact", "name-and-address", "business-navbar__sidebar__header__center", "atlas-navbar__user-content-wrapper"];
    const excludeIds = ["navbarId", "footerId"];

    if (element.hasChildNodes()) {
        // Exclude specific elements based on class or ID
        let shouldExclude = element.classList && excludeClasses.some(cls => element.classList.contains(cls)) ||
                            excludeIds.includes(element.id);

        if (!shouldExclude) {
            element.childNodes.forEach(replaceDataInElement);
        }
    } else if (element.nodeType === Text.TEXT_NODE) {
        element.textContent = replaceNamesInText(element.textContent);
        element.textContent = replacePhoneNumbersInText(element.textContent);
        element.textContent = replaceEmailsInText(element.textContent);
    }
}


// When button pressed
chrome.runtime.onMessage.addListener(function(request) {
    if (request.action === "replaceData") {
        replaceDataInElement(document.body);
    }
});