    // This script will move the Spanish translated document link above to the bottom of the page cw 2025-02-18
    document.addEventListener('DOMContentLoaded', (event) => {
        // If the url is "all-publications" page, then set the visibility of spanish-translated-doc-div to "none"
        if (window.location.href.indexOf('all-publications') > -1) {
            document.getElementById('spanish25-translated-doc-div').style.display = 'none';
        }
      // Enter the ending URL publication title  jb 2025-04-17      
    else if (window.location.href.indexOf('air-quality-activity-guide-for-particle-pollution') > -1) {
            document.getElementById('spanish25-translated-doc-div');
        }
 // Else, all other URL's will set the visibility of spanish-translated-doc-div to "none"  jb 2025-04-17  
 else {
   document.getElementById('spanish25-translated-doc-div').style.display = 'none';
}
        // Select the div element by its ID
        const spanish25TranslatedDocDiv = document.getElementById('spanish25-translated-doc-div');
        // Move it to outside and after the parent div element
        spanish25TranslatedDocDiv.parentElement.parentElement.appendChild(spanish25TranslatedDocDiv);

        // Add "in English" behind the title of the english document
        // Find the <a> element within the first of two <h2> elements by its class value
        const englishDocTitle = document.querySelector('.publication-title.publication-download-link a');
        // Add "in English" behind the title of the english document, but outside the <a> element
        englishDocTitle.insertAdjacentHTML('afterend', ' <span style="font-size: 14px; font-weight: normal;">en inglés</span>');
    });