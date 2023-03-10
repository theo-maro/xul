export default class Router {
  // create routes
  static urlRoutes = {
    404: {
      template: "/templates/404.html",
      title: "404 | Page not found",
      description: "Page not found",
    },
    "/": {
      template: "/templates/home.html",
      title: "NYC School | Manage your school",
      description: "This is a home page",
    },
    "/teachers": {
      template: "/templates/teachers.html",
      title: "Teachers | NYC School",
      description: "This is a teachers' page",
    },
    "/students": {
      template: "/templates/students.html",
      title: "Students | NYC School",
      description: "This is a students' page",
    },
    "/classes": {
      template: "/templates/classes.html",
      title: "Classes | NYC School",
      description: "This is a classes' page",
    },
    "/subjects": {
      template: "/templates/subjects.html",
      title: "Subjects | NYC School",
      description: "This is a subjects' page",
    },
    "/attendance": {
      template: "/templates/attendance.html",
      title: "Student Attendance | NYC School",
      description: "This is a student attendance",
    },
    "/timetable": {
      template: "/templates/timetable.html",
      title: "General Timetable | NYC School",
      description: "This is a general school timetable",
    },
    "/examination": {
      template: "/templates/examination.html",
      title: "Examination | NYC School",
      description: "This is a general school examination",
    },
    "/necta": {
      template: "/templates/necta.html",
      title: "NECTA | NYC School",
      description: "This is a general school necta",
    },
    "/notify": {
      template: "/templates/notify.html",
      title: "Notify | NYC School",
      description: "This is a general school notify",
    },
    "/events": {
      template: "/templates/events.html",
      title: "Events | NYC School",
      description: "This is a general school events",
    },
    "/message": {
      template: "/templates/message.html",
      title: "Message | NYC School",
      description: "This is a general school message",
    },
    "/reports": {
      template: "/templates/reports.html",
      title: "Reports | NYC School",
      description: "This is a general school reports",
    },
    "/accoutant": {
      template: "/templates/accoutant.html",
      title: "Accoutant | NYC School",
      description: "This is a general school accoutant",
    },
  };

  // watch the url
  static route = (e) => {
    e.preventDefault();
    window.history.pushState(
      {},
      "",
      e.target.parentElement.href || e.target.href
    );
    Router.locationHandler();
  };

  // handle the url location
  static locationHandler = async () => {
    const location = window.location.pathname; // get url path

    if (location.length == 0) location = "/"; // set to primary page route

    const route = Router.urlRoutes[location] || Router.urlRoutes[404]; // get the route object

    // get html template
    const html = await fetch(route.template).then((res) => res.text());
    document.getElementById("main-page_content").innerHTML = html;
    document.title = route.title;
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", route.description);
    //
  };
}
