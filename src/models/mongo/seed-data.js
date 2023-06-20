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
      name: "Placemark 1",
      lat: "52.160858",
      lng: "-7.152420",
      user: "->users.homer",
      images: ["https://res.cloudinary.com/daz7pjw2v/image/upload/v1683366714/qqra46cr1wbn0n7ps8al.jpg"],
    },
    two: {
      name: "Placemark 2",
      lat: "52.149220",
      lng: "-6.994620",
      user: "->users.marge",
    },
    three: {
      name: "Placemark 3",
      lat: "52.161290",
      lng: "-7.231540",
      user: "->users.bart",
    },
  },
};
