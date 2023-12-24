var imageCard;

document.addEventListener("DOMContentLoaded", () => {
    let gallery = document.getElementById("gallery");

    // Set base image card
    imageCard = gallery.children[0].cloneNode(true);

    generateGallery();
});

// Creates all cards for each image link in products data
async function generateGallery() {
    let gallery = document.getElementById("gallery");

    // Load products data
    let productsData = await fetch("data/products.json").then(file => { return file.json()});
    let images = productsData["products"];

    // Create card for each product
    for (const image of images) {
        let card = createCard(image);
        gallery.append(card);
    }
}

// Returns an image card with the image set from src
function createCard(src) {
    let newCard = imageCard.cloneNode(true);
    newCard.classList.remove("d-none");
    newCard.children[0].src = src;
    newCard.children[0].alt = "";
    return newCard;
}

// TODO: Image modal viewer
function openImageModal() {

}
