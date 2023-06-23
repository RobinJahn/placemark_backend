import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string().example("64832868a4afc1d1b9c633d9"), Joi.object().example("64832868a4afc1d1b9c633d9")).description("a valid ID");

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
    description: Joi.string().example("Homer's House"),
    lat: Joi.number().example(51.92893).required(),
    lng: Joi.number().example(-8.46136).required(),
    image_list: Joi.array().items(Joi.string().example("https://www.google.com/maps/uv?pb=!1s0x484490b4c0b1d6f5%3A0x260c3c3c3c3c3c3")).required(),
  })
  .label("Placemark");

export const PlacemarkSpecWithUser = PlacemarkSpec.keys({
  user: IdSpec,
}).label("PlacemarkWithUser");

export const PlacemarkSpecPlus = PlacemarkSpecWithUser.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArray = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");
