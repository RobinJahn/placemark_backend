export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },

  placemarks: {
    _model: "Placemark",
    one: {
      name: "Vasa Museum, Stockholm",
      lat: "59.3280",
      lng: "18.0914",
      user: "->users.homer",
      description:
        "The Vasa Museum is a maritime museum in Stockholm, Sweden. Located on the island of Djurgården, the museum displays the only almost fully intact 17th century ship that has ever been salvaged, the 64-gun warship Vasa that sank on her maiden voyage in 1628.",
      image_list: [],
    },
    two: {
      name: "Liseberg Amusement Park, Gothenburg",
      lat: "57.6962",
      lng: "11.9925",
      user: "->users.marge",
      description:
        "Liseberg is an amusement park located in Gothenburg, Sweden, that opened in 1923. It is one of the most visited amusement parks in Scandinavia, attracting around three million visitors annually. Among its major attractions is the wooden roller coaster Balder, twice (2003 and 2005) voted as the Best Wooden Tracked Roller Coaster in the world in a major international poll.",
      image_list: [],
    },
    three: {
      name: "Turning Torso, Malmö",
      lat: "55.6132",
      lng: "12.9762",
      user: "->users.bart",
      description:
        "Turning Torso is a neo-futurist residential skyscraper in Sweden and the tallest building in Scandinavia. Located in Malmö on the Swedish side of the Öresund strait, it was built and is owned by HSB Sweden. The project was designed by Spanish architect Santiago Calatrava and officially opened on 27 August 2005.",
      image_list: [],
    },
    four: {
      name: "Kiruna Church, Kiruna",
      lat: "67.8558",
      lng: "20.2251",
      user: "->users.marge",
      description:
        "Kiruna Church is a church building in Kiruna, Sweden, and is one of Sweden's largest wooden buildings. The church exterior is built in a Gothic Revival style, while the altar is in Art Nouveau.",
      image_list: [],
    },
    five: {
      name: "Visby City Wall, Visby",
      lat: "57.6369",
      lng: "18.2943",
      user: "->users.marge",
      description:
        "Visby City Wall is a medieval defensive wall surrounding the Swedish town of Visby on the island of Gotland. As the strongest, most extensive, and best preserved medieval city wall in Scandinavia, it forms an important and integral part of Visby World Heritage Site.",
      image_list: [],
    },
  },
};
