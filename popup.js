document.addEventListener('DOMContentLoaded', () => {
    const savedLinksList = document.getElementById('savedLinks');
    const addLinkForm = document.getElementById('addLinkForm');
    const linkInput = document.getElementById('linkInput');
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
  
    let savedLinks = JSON.parse(localStorage.getItem("links")) || [];
  
    // Function to render saved links in the popup
    function renderSavedLinks() {
      savedLinksList.innerHTML = ''; // Clear existing list
      savedLinks.forEach((linkObj, index) => {
        const listItem = document.createElement('li');
        const linkElement = document.createElement('a');
        linkElement.href = linkObj.link;
        linkElement.target = '_blank'; // Open in new tab
        linkElement.textContent = linkObj.title;
  
        listItem.appendChild(linkElement);
        savedLinksList.appendChild(listItem);
      });
    }
  
    // Event listener for adding a new link
    addLinkForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent form from submitting
  
      const link = linkInput.value;
      const title = titleInput.value;
      const description = descriptionInput.value || "No description provided"; // Default if not provided
  
      // Check if the link already exists
      const linkExists = savedLinks.some(existingLink => existingLink.link === link);
      if (linkExists) {
        alert("This link has already been saved.");
        return;
      }
  
      // Get the favicon URL
      const favicon = `https://www.google.com/s2/favicons?domain=${new URL(link).hostname}`;
  
      // Add the new link
      const newLink = { link, title, description, favicon };
      savedLinks.push(newLink);
      localStorage.setItem("links", JSON.stringify(savedLinks));
  
      // Reset form inputs
      linkInput.value = '';
      titleInput.value = '';
      descriptionInput.value = '';
  
      // Re-render the saved links
      renderSavedLinks();
    });
  
    // Initial render of saved links
    renderSavedLinks();
  });
  