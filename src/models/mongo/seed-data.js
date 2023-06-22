export const seedData = {
  users: {
    _model: "User",
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
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
        "The Vasa Museum is a maritime museum located in Stockholm, Sweden. It is situated on the island of Djurgården and is one of the most popular tourist attractions in the country. The museum's main exhibit is the Vasa, a 64-gun warship that sank on her maiden voyage in 1628. The Vasa is the only almost fully intact 17th century ship that has ever been salvaged. The ship is housed in a purpose-built museum that allows visitors to view it from six different levels. The museum also contains several exhibits related to the ship's construction, naval warfare, and life on board a 17th-century warship. The museum opened in 1990 and has since welcomed millions of visitors from around the world. It offers guided tours and educational programs for children and adults alike. The Vasa Museum is a testament to Sweden's rich maritime history and a reminder of the power and might of the Swedish navy during the 17th century.",
      image_list: ["http://res.cloudinary.com/daz7pjw2v/image/upload/v1687427980/edqbisywhvfvpg99zyan.jpg"],
    },
    two: {
      name: "Liseberg Amusement Park, Gothenburg",
      lat: "57.6962",
      lng: "11.9925",
      user: "->users.marge",
      description:
        "Liseberg is an amusement park located in Gothenburg, Sweden. It first opened its doors in 1923 and has since become one of the most visited amusement parks in Scandinavia, attracting around three million visitors annually. The park offers a wide range of attractions for all ages. Among its major attractions is the wooden roller coaster Balder, which was twice voted as the Best Wooden Tracked Roller Coaster in the world in a major international poll in 2003 and 2005. In addition to its thrilling rides, Liseberg also features a beautiful garden, a sculpture park, and a variety of restaurants and shops. During the holiday season, the park is transformed into a winter wonderland with millions of Christmas lights, a Christmas market, and ice shows. Liseberg is not just an amusement park, it's a place where memories are created. Whether you're a thrill-seeker or just looking for a fun day out with the family, Liseberg has something for everyone.",
      image_list: [],
    },
    three: {
      name: "Turning Torso, Malmö",
      lat: "55.6132",
      lng: "12.9762",
      user: "->users.bart",
      description:
        "Turning Torso is a neo-futurist residential skyscraper located in Malmö, Sweden. It is the tallest building in Scandinavia and a prominent landmark in the Malmö skyline. The building was designed by Spanish architect Santiago Calatrava and was officially opened on 27 August 2005. The design of Turning Torso was inspired by a sculpture called 'Twisting Torso', which was also created by Calatrava. The building is characterized by its twisting form, with each floor rotating around the building's vertical axis. The topmost floor is twisted 90 degrees clockwise with respect to the ground floor. Turning Torso is not just a residential building, it's a work of art. It has won several awards for its unique design, including the 2005 Gold Emporis Skyscraper Award.The Turning Torso is a symbol of Malmö's transformation from an industrial city to a city of knowledge and modern architecture. It's a must-see for anyone visiting Malmö.",
      image_list: [],
    },
    four: {
      name: "Kiruna Church, Kiruna",
      lat: "67.8558",
      lng: "20.2251",
      user: "->users.marge",
      description:
        "Kiruna Church is a church building located in Kiruna, Sweden. It is one of Sweden's largest wooden buildings and is considered one of the country's mostSure, here are the updated descriptions for the five points of interest (POIs) in Sweden, each divided into four paragraphs:",
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
