chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveLink") {
      const link = window.location.href;
      const title = document.title;
      const description = document.querySelector('meta[name="description"]') ? 
                           document.querySelector('meta[name="description"]').content : 
                           "No description provided";
  
      const favicon = `https://www.google.com/s2/favicons?domain=${new URL(link).hostname}`;
      const newLink = { link, title, description, favicon };
  
      let links = JSON.parse(localStorage.getItem("links")) || [];
      links.push(newLink);
      localStorage.setItem("links", JSON.stringify(links));
  
      sendResponse({status: "Link Saved"});
    }
    return true;
  });
  