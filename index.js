const linkItems = document.querySelectorAll(
  "#sidebar .side-menu.top .list-item a.list-link"
);
const spanItem = document.querySelector(
  "#sidebar .side-menu.top .list-item a.list-link span"
);
const sideBar = document.querySelector("#sidebar");
const menuBar = document.querySelector("#content .bx-menu");
const searchBtn = document.querySelector("#content .form-input button");
const searchIcon = document.querySelector("#content .form-input button .bx");
const searchForm = document.querySelector("#content nav form");
const activeBreadCrumb = document.querySelector(".breadcrumb li a.active");
const bxIcon = document.querySelectorAll(
  "#sidebar .side-menu .list-item small"
);
const navBar = document.querySelector("#content nav");
const themeTogglers = document.querySelectorAll(
  "#content nav .theme-toggler .icon"
);
const dropMenuToggler = document.querySelector("#content nav .profile");

// PROFILE DROPDOWN MENU
dropMenuToggler.addEventListener("click", () => {
  const ul = dropMenuToggler.lastElementChild;
  const bx = ul.previousElementSibling;

  ul.classList.toggle("show");
  if (bx.classList.contains("bx-chevron-down"))
    bx.classList.replace("bx-chevron-down", "bx-chevron-up");
  else bx.classList.replace("bx-chevron-up", "bx-chevron-down");
});

// THEME TOGGLER
themeTogglers.forEach((themeToggler) => {
  themeToggler.addEventListener("click", () => {
    themeTogglers.forEach((icon) => {
      icon.classList.add("active");
    });

    themeToggler.classList.toggle("active");
  });
});

// TOGGLE SIDE MENU
linkItems.forEach((linkItem) => {
  const li = linkItem.parentElement;

  linkItem.addEventListener("click", () => {
    linkItems.forEach((item) => {
      item.parentElement.classList.remove("active");

      if (item.children.length > 2) {
        item.children[2].textContent = "arrow_drop_down";
      }
    });
    li.classList.add("active");

    if (linkItem.children.length > 2) {
      linkItem.addEventListener("click", () => {
        linkItems.forEach((item) => {
          if (item.children.length > 2) {
            item.parentElement.classList.remove("active");
            item.children[2].textContent = "arrow_drop_down";
          }
        });

        if (linkItem.children[2].textContent === "arrow_drop_down") {
          linkItem.children[2].textContent = "chevron_right";
          li.classList.add("active");
        }
      });
      linkItem.children[2].textContent = "chevron_right";
    }

    // BREADCRUMB
    activeBreadCrumb.textContent =
      linkItem.lastElementChild.textContent === "Dashboard"
        ? "Home"
        : linkItem.lastElementChild.classList.contains("drop-down")
        ? linkItem.lastElementChild.previousElementSibling.textContent
        : linkItem.lastElementChild.textContent;
  });
});

// TOGGLE SIDEBAR
menuBar.addEventListener("click", () => {
  sideBar.classList.toggle("hide");
  bxIcon.forEach((element) => {
    element.classList.toggle("resized");
  });
});

searchBtn.addEventListener("click", (e) => {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sideBar.classList.toggle("hide");
  bxIcon.forEach((element) => {
    element.classList.toggle("resized");
  });
} else if (window.innerWidth > 576) {
  searchIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("click", (e) => {
  const targeted = e.target.parentElement;
  const ul = dropMenuToggler.lastElementChild;
  const bx = ul.previousElementSibling;

  if (
    targeted !== dropMenuToggler &&
    targeted.parentElement !== dropMenuToggler
  ) {
    ul.classList.remove("show");
    bx.classList.replace("bx-chevron-up", "bx-chevron-down");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    sideBar.classList.add("hide");
    bxIcon.forEach((element) => {
      element.classList.add("resized");
    });
  } else {
    sideBar.classList.remove("hide");
    bxIcon.forEach((element) => {
      element.classList.remove("resized");
    });
  }

  if (this.innerWidth > 576) {
    searchIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});
