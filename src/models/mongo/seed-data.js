export const seedData = {
  users: {
    _model: "User",
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      isAdmin: false,
    },
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      isAdmin: false,
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      isAdmin: true,
    },
  },

  placemarks: {
    _model: "Placemark",
    one: {
      name: "Vasa Museum, Stockholm",
      description:
        "The Vasa Museum is a maritime museum located in Stockholm, Sweden. It is situated on the island of Djurgården and is one of the most popular tourist attractions in the country. The museum's main exhibit is the Vasa, a 64-gun warship that sank on her maiden voyage in 1628. The Vasa is the only almost fully intact 17th century ship that has ever been salvaged. The ship is housed in a purpose-built museum that allows visitors to view it from six different levels. The museum also contains several exhibits related to the ship's construction, naval warfare, and life on board a 17th-century warship. The museum opened in 1990 and has since welcomed millions of visitors from around the world. It offers guided tours and educational programs for children and adults alike. The Vasa Museum is a testament to Sweden's rich maritime history and a reminder of the power and might of the Swedish navy during the 17th century.",
      category: "Historical Sites",
      image_list: [],

      lat: "59.3280",
      lng: "18.0914",
      user: "->users.bart",
    },
    two: {
      name: "Liseberg Amusement Park, Gothenburg",
      description:
        "Liseberg is an amusement park located in Gothenburg, Sweden. It first opened its doors in 1923 and has since become one of the most visited amusement parks in Scandinavia, attracting around three million visitors annually. The park offers a wide range of attractions for all ages. Among its major attractions is the wooden roller coaster Balder, which was twice voted as the Best Wooden Tracked Roller Coaster in the world in a major international poll in 2003 and 2005. In addition to its thrilling rides, Liseberg also features a beautiful garden, a sculpture park, and a variety of restaurants and shops. During the holiday season, the park is transformed into a winter wonderland with millions of Christmas lights, a Christmas market, and ice shows. Liseberg is not just an amusement park, it's a place where memories are created. Whether you're a thrill-seeker or just looking for a fun day out with the family, Liseberg has something for everyone.",
      category: "Amusement Parks",
      image_list: [],

      lat: "57.6962",
      lng: "11.9925",
      user: "->users.bart",
    },
    three: {
      name: "Turning Torso, Malmö",
      description:
        "Turning Torso is a neo-futurist residential skyscraper located in Malmö, Sweden. It is the tallest building in Scandinavia and a prominent landmark in the Malmö skyline. The building was designed by Spanish architect Santiago Calatrava and was officially opened on 27 August 2005. The design of Turning Torso was inspired by a sculpture called 'Twisting Torso', which was also created by Calatrava. The building is characterized by its twisting form, with each floor rotating around the building's vertical axis. The topmost floor is twisted 90 degrees clockwise with respect to the ground floor. Turning Torso is not just a residential building, it's a work of art. It has won several awards for its unique design, including the 2005 Gold Emporis Skyscraper Award.The Turning Torso is a symbol of Malmö's transformation from an industrial city to a city of knowledge and modern architecture. It's a must-see for anyone visiting Malmö.",
      category: "Skyscrapers",
      image_list: [],

      lat: "55.6132",
      lng: "12.9762",
      user: "->users.bart",
    },
    four: {
      name: "Kiruna Church, Kiruna",
      description:
        "Kiruna Church is a church building located in Kiruna, Sweden. It is one of Sweden's largest wooden buildings and is considered one of the country's most notable architectural landmarks. Designed by architect Gustaf Wickman and completed in 1912, Kiruna Church is celebrated for its architectural innovation, particularly its distinctive Art Nouveau aesthetic, making it an enduring symbol of the Kiruna community. The church's silhouette is bold, yet harmonious, its structure crafted to withstand the harsh arctic conditions of northern Sweden. The exterior, constructed predominantly of wood, is painted in a striking falu red, a color traditionally used in Swedish architecture. Wickman's design was influenced by both the local Sami culture and the Art Nouveau movement, an aspect that is noticeable in the organic lines and forms that imbue the church with a sense of dynamism and life. Inside, the vast nave is impressive, with high vaulted ceilings and a large altarpiece that tells stories from the Bible. But the church is not only about grandeur, it also holds smaller, more intimate spaces for reflection and prayer. The interior decor resonates with the color scheme of the exterior, and the use of local materials provides a sense of connection with the surrounding landscape. Apart from its architectural significance, Kiruna Church also serves an important role in the local community. As one of the oldest buildings in Kiruna, it has been a constant presence through the city's numerous transformations, including the ongoing project to move the entire city due to mining activities. Despite these upheavals, the church has been carefully preserved and is set to be relocated to ensure its survival.",
      category: "Historical Sites",
      image_list: [],

      lat: "67.8558",
      lng: "20.2251",
      user: "->users.bart",
    },
    five: {
      name: "Visby City Wall, Visby",
      description:
        "Visby City Wall is a medieval defensive wall surrounding the Swedish town of Visby on the island of Gotland. As the strongest, most extensive, and best preserved medieval city wall in Scandinavia, it forms an important and integral part of Visby World Heritage Site.",
      category: "Historical Sites",
      image_list: [],

      lat: "57.6369",
      lng: "18.2943",
      user: "->users.bart",
    },
    six: {
      name: "Lund Cathedral, Lund",
      description:
        "Lund Cathedral is a prominent historical landmark located in Lund, Sweden. The cathedral was consecrated in 1145, and has been the religious center of Sweden for many centuries. The cathedral is built in the Romanesque architectural style and features a richly decorated interior. The crypt, with its characteristic pillars, is particularly noteworthy. Lund Cathedral is also home to one of the oldest working mechanical clocks in the world, the Horologium mirabile Lundense, which dates back to the 14th century. The cathedral is more than just a place of worship, it's a testament to Sweden's rich history and a symbol of the city of Lund. It is open to visitors and offers guided tours that provide insights into its architectural, historical, and religious significance.",
      category: "Historical Sites",
      image_list: [],

      lat: "55.7047",
      lng: "13.1910",
      user: "->users.marge",
    },
  },
};
