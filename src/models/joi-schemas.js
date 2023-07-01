import Joi from "joi";

export const IdSpec = Joi.alternatives()
  .try(Joi.string().example("64832868a4afc1d1b9c633d9"), Joi.object().example("64832868a4afc1d1b9c633d9"))
  .description("a valid ID")
  .label("Id");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  isAdmin: Joi.boolean().example("false"),
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    _id: IdSpec,
  })
  .label("JwtAuth");

export const PlacemarkSpec = Joi.object()
  .keys({
    name: Joi.string().example("Homer's House").required(),
    description: Joi.string().example("Homer's House").required(),
    category: Joi.string().example("Houses").required(),
    image_list: Joi.array().items(Joi.string().example("https://someLink.com/image.jpg")).required(),

    lat: Joi.number().example(51.92893).required(),
    lng: Joi.number().example(-8.46136).required(),
  })
  .label("Placemark");

export const PlacemarkSpecForUpdate = Joi.object()
  .keys({
    name: Joi.string().example("Homer's House"),
    description: Joi.string().example("Homer's House"),
    category: Joi.string().example("Houses"),
    image_list: Joi.array().items(Joi.string().example("https://someLink.com/image.jpg")),

    lat: Joi.number().example(51.92893),
    lng: Joi.number().example(-8.46136),
  })
  .unknown(false)
  .label("PlacemarkForUpdate");

export const PlacemarkSpecWithUser = PlacemarkSpec.keys({
  user: IdSpec,
}).label("PlacemarkWithUser");

export const PlacemarkSpecPlus = PlacemarkSpecWithUser.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArray = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const ImageSpec = Joi.object({
  image: Joi.any().meta({ swaggerType: "file" }),
}).label("Image");

export const ImageUrlSpec = Joi.object({
  imageUrl: Joi.string().uri().required().example("https://someLink.com/image.jpg"),
}).label("ImageUrl");

export const StatisticTypeSpec = Joi.object({
  type: Joi.string().required().example("user"),
}).label("StatisticType");

export const StatisticArray = Joi.array()
  .items(
    Joi.object({
      creationDate: Joi.date().required().example("2020-12-01T00:00:00.000Z"),
      objectCategory: Joi.string().required().example("user"),
      id: IdSpec,
      _id: IdSpec,
      __v: Joi.number(),
    })
  )
  .label("StatisticArray");
