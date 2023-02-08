const linkItems = document.querySelectorAll(
  "#sidebar .side-menu.top .list-item a.list-link"
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

  if (window.innerWidth > 576) {
    searchIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

// Calendar
const calendarTemplate = document.createElement("template");

calendarTemplate.innerHTML = `
<div class="calendar-container">
    <div class="calendar_header">
      <i class="bx bxs-chevron-left"></i>
      <h4 class="heading"></h4>
      <i class="bx bxs-chevron-right"></i>
    </div>

    <ul class="calendar_weekdays">
      <li id="week-day"></li>
      <li id="week-day"></li>
      <li id="week-day"></li>
      <li id="week-day"></li>
      <li id="week-day"></li>
      <li id="week-day"></li>
      <li id="week-day"></li>
    </ul>
    
    <ul class="calendar_content">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
`;

class Calendar extends HTMLElement {
  // CALENDAR
  static months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  static monthColors = [
    "saddlebrown",
    "darkseagreen",
    "darksalmon",
    "darkgoldenrod",
    "darkolivegreen",
    "teal",
    "#292c35",
    "firebrick",
    "indigo",
    "dodgerblue",
    "orange",
    "darkslategrey",
  ];
  static daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  static weekDays;

  static date = new Date();
  static month = Calendar.date.getMonth();
  static year = Calendar.date.getFullYear();
  static today = Calendar.date.getDate();

  constructor() {
    super();
    this.append(calendarTemplate.content.cloneNode(true));

    // Rendering days of the week
    Calendar.weekDays = this.querySelectorAll("#week-day");
    this.calenderHeader = this.querySelector(".calendar_header");
    this.calendarHeading = this.calenderHeader.querySelector(".heading");

    this.nthDay = this.querySelector(
      `.calendar-container .calendar_content > *:nth-child(${Calendar.today})`
    );
    this.calendarDays = document.querySelectorAll(".calendar_content li");

    Calendar.weekDays.forEach((weekDay, index) => {
      const dayOfWeek = Calendar.daysOfWeek[index].substring(0, 3);
      weekDay.textContent = dayOfWeek;
      weekDay.style.color = `${Calendar.monthColors[Calendar.month]}`;
      weekDay.style.transition = "all 2000ms ease";

      this.nthDay.style.backgroundColor = `${
        Calendar.monthColors[Calendar.month]
      }`;
      this.nthDay.style.color = `white`;
      this.nthDay.style.transition = "all 2000ms ease";

      // Rendering dates of the month
      this.calendarHeading.textContent = `${Calendar.months[Calendar.month]} ${
        Calendar.year
      }`;
      this.calenderHeader.style.backgroundColor = `${
        Calendar.monthColors[Calendar.month]
      }`;
      this.calenderHeader.style.transition = "all 2000ms ease";
    });

    this.calendarDays.forEach((calendarDay, index) => {
      calendarDay.textContent = this.getAllDaysInMonth(
        Calendar.year,
        Calendar.month
      )[index];
    });
  }

  connectedCallback() {
    const bxPrev = this.querySelector(".bxs-chevron-left");
    const bxNext = this.querySelector(".bxs-chevron-right");

    bxPrev.addEventListener("click", () => {
      Calendar.month -= 1;
      this.calendarHeading.textContent = `${Calendar.months[Calendar.month]} ${
        Calendar.year
      }`;
      this.calenderHeader.style.backgroundColor = `${
        Calendar.monthColors[Calendar.month]
      }`;
      this.nthDay.style.backgroundColor = `${
        Calendar.monthColors[Calendar.month]
      }`;

      //
      Calendar.weekDays.forEach((weekDay) => {
        weekDay.style.color = `${Calendar.monthColors[Calendar.month]}`;
      });
      this.calendarDays.forEach((calendarDay, index) => {
        calendarDay.textContent = this.getAllDaysInMonth(
          Calendar.year,
          Calendar.month
        )[index];
      });

      if (Calendar.month < 0) {
        Calendar.month = 11;
        const newYear = Calendar.year - 1;
        this.calendarHeading.textContent = `${
          Calendar.months[Calendar.month]
        } ${newYear}`;
        this.calenderHeader.style.backgroundColor = `${
          Calendar.monthColors[Calendar.month]
        }`;
        this.nthDay.style.backgroundColor = `${
          Calendar.monthColors[Calendar.month]
        }`;
        Calendar.weekDays.forEach((weekDay) => {
          weekDay.style.color = `${Calendar.monthColors[Calendar.month]}`;
        });
        this.calendarDays.forEach((calendarDay, index) => {
          calendarDay.textContent = this.getAllDaysInMonth(
            Calendar.year,
            Calendar.month
          )[index];
        });
        Calendar.year = newYear;
      }
    });

    bxNext.addEventListener("click", () => {
      Calendar.month += 1;
      this.calendarHeading.textContent = `${Calendar.months[Calendar.month]} ${
        Calendar.year
      }`;
      this.calenderHeader.style.backgroundColor = `${
        Calendar.monthColors[Calendar.month]
      }`;
      this.nthDay.style.backgroundColor = `${
        Calendar.monthColors[Calendar.month]
      }`;
      Calendar.weekDays.forEach((weekDay) => {
        weekDay.style.color = `${Calendar.monthColors[Calendar.month]}`;
      });
      this.calendarDays.forEach((calendarDay, index) => {
        calendarDay.textContent = this.getAllDaysInMonth(
          Calendar.year,
          Calendar.month
        )[index];
      });

      if (Calendar.month > 11) {
        Calendar.month = 0;
        const newYear = Calendar.year + 1;
        this.calendarHeading.textContent = `${
          Calendar.months[Calendar.month]
        } ${newYear}`;
        this.calenderHeader.style.backgroundColor = `${
          Calendar.monthColors[Calendar.month]
        }`;
        this.nthDay.style.backgroundColor = `${
          Calendar.monthColors[Calendar.month]
        }`;
        Calendar.weekDays.forEach((weekDay) => {
          weekDay.style.color = `${Calendar.monthColors[Calendar.month]}`;
        });
        this.calendarDays.forEach((calendarDay, index) => {
          calendarDay.textContent = this.getAllDaysInMonth(
            Calendar.year,
            Calendar.month
          )[index];
        });
        Calendar.year = newYear;
      }
    });
  }

  getAllDaysInMonth(year, month) {
    const date = new Date(year, month, 1);
    const dates = [];

    while (date.getMonth() === month) {
      dates.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
}
customElements.define("nyc-calendar", Calendar);
