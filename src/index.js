import "./styles/footer.css";
import "./styles/header.css";
import "./styles/style.css";
import "./styles/products-style.css";
import "./styles/categories-style.css";
import "./styles/homepage-style.css";
import "./styles/cart.css";
import "./styles/checkout-page-style.css";
import { categoriePage } from "./scripts/pages/categoriePage";
import { renderHomepage } from "./scripts/pages/homepage";
import { header } from "./scripts/header/headercomponant";
import { headerCompontantTwo } from "./scripts/header/headerComponantTwo.js";
import { cartDisplay } from "./scripts/cart/displayCart.js";
import { newsletter } from "./scripts/pages/nieuwsletterPage.js";
import { footer } from "./scripts/pages/footer";

// header();
headerCompontantTwo();

document.addEventListener('DOMContentLoaded', cartDisplay);

// Product page
//productPage();

categoriePage();
renderHomepage();

newsletter();
footer();
