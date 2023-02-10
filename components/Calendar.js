const calendarTemplate = document.createElement("template");

calendarTemplate.innerHTML = `
<div class="calendar-container">
    <div class="calendar_header">
      <i class="bx bxs-chevron-left"></i>
      <h4 class="heading"></h4>
      <i class="bx bxs-chevron-right"></i>
    </div>

    <ul class="calendar_weekdays"></ul>
    
    <ul class="calendar_content"></ul>
  </div>
`;

export default class Calendar extends HTMLElement {
  static months = [
    { name: "JANUARY", color: "saddlebrown" },
    { name: "FEBRUARY", color: "darkseagreen" },
    { name: "MARCH", color: "darksalmon" },
    { name: "APRIL", color: "darkgoldenrod" },
    { name: "MAY", color: "darkolivegreen" },
    { name: "JUNE", color: "teal" },
    { name: "JULY", color: "#292c35" },
    { name: "AUGUST", color: "firebrick" },
    { name: "SEPTEMBER", color: "indigo" },
    { name: "OCTOBER", color: "dodgerblue" },
    { name: "NOVEMBER", color: "orange" },
    { name: "DECEMBER", color: "darkslategrey" },
  ];

  constructor() {
    super();
    this.append(calendarTemplate.content.cloneNode(true));

    this.date = new Date();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();

    // Rendering year and a month
    this.calenderHeader = this.querySelector(".calendar_header");
    this.calenderHeader.style.transition = "all 1s ease";
    this.calendarHeading = this.calenderHeader.querySelector(".heading");
    this.renderYearMonth(this.year);

    // Rendering days of the week
    this.calendarWeekdays = document.querySelector(".calendar_weekdays");
    this.renderDaysInWeek();

    // Rendering dates in a month
    this.calenderContent = document.querySelector(".calendar_content");
    this.renderDaysInMonth();
  }

  connectedCallback() {
    const bxPrev = this.querySelector(".bxs-chevron-left");
    const bxNext = this.querySelector(".bxs-chevron-right");

    bxPrev.addEventListener("click", () => {
      this.month -= 1;
      this.calendarWeekdays.innerHTML = "";
      this.calenderContent.innerHTML = "";

      if (this.month < 0) {
        this.month = 11;
        const newYear = this.year - 1;

        // Rendering year and a month
        this.renderYearMonth(newYear);

        // Rendering days of the week
        this.renderDaysInWeek();

        // Rendering dates in a month
        this.renderDaysInMonth();

        this.year = newYear;
      } else {
        // Rendering year and a month
        this.renderYearMonth(this.year);

        // Rendering days of the week
        this.renderDaysInWeek();

        // Rendering dates in a month
        this.renderDaysInMonth();
      }
    });

    bxNext.addEventListener("click", () => {
      this.month += 1;
      this.calendarWeekdays.innerHTML = "";
      this.calenderContent.innerHTML = "";

      if (this.month > 11) {
        this.month = 0;
        const newYear = this.year + 1;

        // Rendering year and a month
        this.renderYearMonth(newYear);

        // Rendering days of the week
        this.renderDaysInWeek();

        // Rendering dates in a month
        this.renderDaysInMonth();

        this.year = newYear;
      } else {
        // Rendering day and a month
        this.renderYearMonth(this.year);

        // Rendering days of the week
        this.renderDaysInWeek();

        // Rendering dates in a month
        this.renderDaysInMonth();
      }
    });
  }

  getAllDaysInMonth() {
    const date = new Date(this.year, this.month);
    const dates = [];

    while (date.getMonth() === this.month) {
      dates.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  renderYearMonth(year) {
    this.calenderHeader.style.backgroundColor = `${
      Calendar.months[this.month].color
    }`;

    this.calendarHeading.textContent = `${
      Calendar.months[this.month].name
    }, ${year}`;
  }

  renderDaysInWeek() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    daysOfWeek.forEach((day) => {
      const li = document.createElement("li");
      li.id = "week-day";
      li.appendChild(document.createTextNode(day.substring(0, 3)));

      this.calendarWeekdays.style.color = `${
        Calendar.months[this.month].color
      }`;
      this.calendarWeekdays.style.transition = "all 1s ease";
      this.calendarWeekdays.appendChild(li);
    });
  }

  renderDaysInMonth() {
    const allDaysInMonth = this.getAllDaysInMonth();
    allDaysInMonth.forEach((day) => {
      const li = document.createElement("li");

      li.appendChild(document.createTextNode(day));

      this.calenderContent.appendChild(li);
    });

    this.changeNthDayStyles();
  }

  changeNthDayStyles() {
    const nthDay = this.calenderContent.querySelector(
      `:nth-child(${this.date.getDate()})`
    );

    nthDay.style.color = "white";
    nthDay.style.backgroundColor = `${Calendar.months[this.month].color}`;
  }
}
