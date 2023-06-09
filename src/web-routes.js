export const webRoutes = [
  {
    method: "GET",
    path: "/",
    handler: function (request, h) {
      return h.view("index", { title: "Welcome to Points of Interest" });
    },
  },
];
