// Mimiru automatically merges your page with another HTML file as a base.

document.addEventListener("DOMContentLoaded", () => {
    // Some of these variables are expected to be set on another <script> tag before this one.
    setTemplate(template);
    document.title = title;
});

// Overrides the current html page's head and body according to template
function setTemplate(template) {
    fetch(template)
    .then(file => file.text())
    .then(string => {
        // Convert to a document
        let parser = new DOMParser();
        let html = parser.parseFromString(string, "text/html");

        // Set the HTML element's attributes
        let htmlElement = html.documentElement;
        for (const attribute of htmlElement.attributes) {
            document.documentElement.setAttribute(attribute.name, attribute.value);
        }

        // Set the head and body
        let head = html.head.children;
        let body = html.body.children;

        for (const child of head) {
            document.head.prepend(child);
        }

        for (const child of body) {
            document.body.prepend(child);
        }

        // Set the current active page on navbar if it exists in the template
        let navbarNav = document.getElementById("navbarNav");
        if (!navbarNav) {
            return;
        }
        setNavBarActive(navbarNav);

    });
}

// Sets the active link in navbarNav depending on the current page
function setNavBarActive(navbarNav) {
    let filename = window.location.href;

    // Find the link to this current page in the navbar
    let items = navbarNav.children[0].children;
    for (const item of items) {
        let a = item.children[0];
        if (a.href == filename ||
            a.href == window.location.hostname) {
            // Set this link as the active one
            a.classList.add("active");
            a.setAttribute("aria-current", "page");
        }
    }
}
