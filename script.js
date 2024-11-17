document.addEventListener("DOMContentLoaded", () => {
  const linksContainer = document.getElementById("links-container");
  const searchInput = document.getElementById("search");
  let links = JSON.parse(localStorage.getItem("links")) || [];

  // Trigger animation on page load
  window.onload = () => {
    const footer = document.querySelector('footer');
    footer.classList.add('show');
  };

  // Save a new link
  function saveLink() {
    const link = document.getElementById("link").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!link || !title) {
      alert("Please provide both a link and a title!");
      return;
    }

    const favicon = `https://www.google.com/s2/favicons?domain=${new URL(link).hostname}`;
    const newLink = { link, title, description, favicon };

    links.push(newLink);
    localStorage.setItem("links", JSON.stringify(links));
    renderLinks();
    document.getElementById("link").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  }

  // Render all links
  function renderLinks() {
    linksContainer.innerHTML = "";
    links.forEach((linkObj, index) => {
      const linkCard = document.createElement("div");
      linkCard.className = "link-card";
      linkCard.innerHTML = `
        <a href="${linkObj.link}" target="_blank" class="card-link">
          <div class="card-content">
            <img src="${linkObj.favicon}" alt="Favicon">
            <h3>${linkObj.title}</h3>
            <p>${linkObj.description || "No description provided"}</p>
          </div>
        </a>
        <button onclick="deleteLink(${index})">Delete</button>
      `;
      linksContainer.appendChild(linkCard);
    });
  }

  // Delete a link
  function deleteLink(index) {
    links.splice(index, 1);
    localStorage.setItem("links", JSON.stringify(links));
    renderLinks();
  }

  // Search through links by title
  function searchLinks() {
    const query = searchInput.value.toLowerCase();
    const filteredLinks = links.filter(link =>
      link.title.toLowerCase().includes(query)
    );
    renderFilteredLinks(filteredLinks);
  }

  // Render filtered links (based on search)
  function renderFilteredLinks(filteredLinks) {
    linksContainer.innerHTML = "";
    filteredLinks.forEach((linkObj, index) => {
      const linkCard = document.createElement("div");
      linkCard.className = "link-card";
      linkCard.innerHTML = `
        <a href="${linkObj.link}" target="_blank" class="card-link">
          <div class="card-content">
            <img src="${linkObj.favicon}" alt="Favicon">
            <h3>${linkObj.title}</h3>
            <p>${linkObj.description || "No description provided"}</p>
          </div>
        </a>
        <button onclick="deleteLink(${index})">Delete</button>
      `;
      linksContainer.appendChild(linkCard);
    });
  }

  // Initial render of links
  renderLinks();
  
  // Add event listener to search input to trigger search on each keystroke
  searchInput.addEventListener("keyup", searchLinks);
});
