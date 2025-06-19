import teamLogo from "../../assets/img/team_2_logo_big.png";
import allProductsPicture from "../../assets/img/main-pic.jpg";
import womanClothesImage from "../../assets/img/woman-clothes.jpg";
import manClothesImage from "../../assets/img/man-clothes.jpg";
import jewelryImage from "../../assets/img/jewelry.jpg";
import electronicImage from "../../assets/img/electronic.jpg";
import { getProductsFromApi } from "../api/getProductsFromApi";

const imageMap = {
    allProductsPicture,
    womanClothesImage,
    manClothesImage,
    jewelryImage,
    electronicImage
};

export function headerCompontantTwo() {
    const mainMenuSelector = document.querySelector("#mainMenu");
    const popupSelector = document.querySelector("#popup");
    const bodySelector = document.querySelector("body");

    // Menu button
    mainMenuSelector.addEventListener("click", () => {
        if (popupSelector.style.display === "flex") {
            popupSelector.style.display = "none";
            bodySelector.style.height = "auto";
            bodySelector.style.overflow = "visible";
            mainMenuSelector.textContent = "Menu";
        } else {
            popupSelector.style.display = "flex";
            bodySelector.style.height = "100vh";
            bodySelector.style.overflow = "hidden";
            mainMenuSelector.textContent = "Close";
        }
    });

    // Logo
    const logoSelector = document.querySelector("#logo");
    logoSelector.src = teamLogo;

    // Popup hover
    const links = document.querySelectorAll("#popup a");
    let hoverImage = document.createElement("img");
    hoverImage.style.position = "absolute";
    hoverImage.style.inset = "0px";
    hoverImage.style.width = "100%";
    hoverImage.style.height = "100%";
    hoverImage.style.display = "none";
    hoverImage.style.zIndex = "1";
    hoverImage.style.backgroundSize = "cover";
    popupSelector.appendChild(hoverImage);

    links.forEach(link => {
        const imageKey = link.dataset.bg;
        const imageUrl = imageMap[imageKey];

        link.addEventListener("mouseenter", () => {
            hoverImage.src = imageUrl;
            hoverImage.style.display = "block"; // Show the image on hover
        });

        link.addEventListener("mouseleave", () => {
            hoverImage.style.display = "none"; // Hide the image on mouse leave
        });

        link.addEventListener("click", () => {
            popupSelector.style.display = "none";
            bodySelector.style.height = "auto";
            bodySelector.style.overflow = "visible";
            mainMenuSelector.textContent = "Menu";

            const productCategory = link.dataset.category;

            if (productCategory === "allproducts") {
                const productUrl = "products";
                getProductsFromApi(productUrl);
            } else {
                const productUrl = `products/category/${productCategory}`;
                getProductsFromApi(productUrl);
            }
        });
    });
}
