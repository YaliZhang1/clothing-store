import image from "../../assets/img/team_2_logo_big.png";
import imageTwo from "../../assets/img/main-pic.jpg";
import imageThree from "../../assets/img/woman-clothes.jpg";
import imageF from "../../assets/img/man-clothes.jpg";
import imageFi from "../../assets/img/jewelry.jpg";
import imageSi from "../../assets/img/electronic.jpg";
import { getProductsFromApi } from "../api/getProductsFromApi";

export function header() {
  const header = document.getElementById("header");
  header.innerHTML = `
<div id="menu-header" >
  <div id="topButtons">
    <button id="menu-btn" class="span-color">MENU</button>
    <button id="close-btn" class="span-color">CLOSE</button>
    <a id="top-logo" href="#header">
    <img id="logo-big" class="span-color" src="${image}"></img>
    </a>
    <div class="cartButton">
    <button id="cart-btn" class="span-color">CART
    <span id="cart-count" class="cart-count">[0]</span>
    </button>
    </div>
  </div>
</div>
<div id="topMenu">
  <ul id="topMenuUl">
    <li>
      <a id="shop-all-btn" class="shopBtn" data-bg="${imageTwo}" data-category="allproducts" href="#">
        <div class="span-color">
          <span>SHOP</span>&nbsp<span>ALL</span>
        </div>
      </a>
    </li>
    <li>
      <a id="woman-clothes-btn" class="shopBtn" data-bg="${imageThree}" data-category="women's clothing" href="#">
        <div class="span-color">
          <span>WOMEN'S</span>&nbsp<span>CLOTHES</span>
        </div>
      </a>
    </li>
    <li>
      <a id="man-clothes" class="shopBtn" data-bg="${imageF}" data-category="men's clothing" href="#">
        <div class="span-color">
          <span>MEN'S</span>&nbsp<span>CLOTHES</span>
        </div>
      </a>
    </li>
    <li><a id="jeweley-btn" class="shopBtn" data-bg="${imageFi}" data-category="jewelery" href="#">
        <div class="span-color">JEWELRY</div>
      </a></li>
    <li><a id="electronices-btn" class="shopBtn " data-bg="${imageSi}" data-category="electronics" href="#">
        <div class="span-color">ELECTRONICS</div>
      </a></li>
  </ul>
</div>`;

  const buttonContainer = document.querySelector("body");

  document.getElementById("close-btn").onclick = function () {
    document.getElementById("menu-btn").style.display = "block";
    document.getElementById("close-btn").style.display = "none";
    document.getElementById("topMenu").style.display = "none";
    document.getElementById("categories").style.display = "block";
    buttonContainer.style.backgroundImage = "none";
    document.getElementById("topButtons").style.backgroundColor = "#f3f1e0";
    document.getElementById("products").style.display = "grid";
    document.getElementById("homepage").style.display = "block";
    document.getElementById("checkout-page").style.display = "block";
    document.getElementById("footer").style.display = "flex";
  };

  document.getElementById("menu-btn").onclick = function () {
    document.getElementById("close-btn").style.display = "block";
    document.getElementById("menu-btn").style.display = "none";
    document.getElementById("topMenu").style.display = "flex";
    document.getElementById("categories").style.display = "none";
    document.getElementById("topMenuUl").style.display = "flex";
    document.getElementById("topMenu").style.display = "flex";
    document.getElementById("products").style.display = "none";
    document.getElementById("homepage").style.display = "none";
    document.getElementById("checkout-page").style.display = "none";
    document.getElementById("footer").style.display = "none";
    buttonContainer.style.height = "100vh";
    buttonContainer.style.backgroundRepeat = "cover";
    
  };

  const shopBtns = document.querySelectorAll(".shopBtn");

  const buttonSpanColors = document.querySelectorAll(".span-color");

  document.addEventListener("DOMContentLoaded", () => {
    const topLogo = document.getElementById("top-logo");
    topLogo.onclick = function () {
      const productUrl = "products";

      getProductsFromApi(productUrl);
    };

    const shopBtns = document.querySelectorAll(".shopBtn");

    shopBtns.forEach((button) => {
      const img = new Image();
      img.src = button.getAttribute("data-bg");
    });

    shopBtns.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        const bgImage = button.getAttribute("data-bg");
        buttonContainer.style.backgroundImage = `url('${bgImage}')`;
        document.getElementById("topButtons").style.backgroundColor =
          "transparent";
      });
    });

    shopBtns.forEach((button) => {
      button.addEventListener("click", () => {
        document.getElementById("close-btn").style.display = "none";
        document.getElementById("menu-btn").style.display = "block";
        const productCategory = button.dataset.category;
        document.getElementById("topMenuUl").style.display = "none";
        buttonContainer.style.backgroundImage = "";
        document.getElementById("topMenu").style.display = "none";
        document.getElementById("categories").style.display = "block";
        document.getElementById("products").style.display = "grid";
        document.getElementById("homepage").style.display = "block";
        document.getElementById("checkout-page").style.display = "block";
        document.getElementById("footer").style.display = "flex";
        document.getElementById("topButtons").style.backgroundColor =
          "var(--bg-color)";
        // If all products are clicked show them all
        if (productCategory === "allproducts") {
          const productUrl = "products";
          getProductsFromApi(productUrl);
        } else {
          const productUrl = `products/category/${productCategory}`;

          getProductsFromApi(productUrl);

          document.getElementById("products").style.display = "grid";
        }
      });
    });

    buttonSpanColors.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.classList.add("transparent");
        btn.classList.add("active");

        buttonSpanColors.forEach((btnOther) => {
          if (btnOther !== btn) {
            btnOther.classList.add("transparent");
          }
        });
      });
      btn.addEventListener("mouseleave", () => {
        btn.classList.remove("active");
      });
    });
  });
}
