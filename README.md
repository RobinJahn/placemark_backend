# Globe Lens Backend

### Features
- Statistics api for admins
- Image upload and delete
- Landing page
- Restful api for users, placemarks and statistics
- JWT Authentication
- Swagger documentation
- Mongo database integration
- Unit tests

### Deployment
This project is deployed at [globelensBackend](https://placemark-backend.onrender.com/).
Here also the swagger documentation can be found.

### Corresponding Frontend
The frontend for this project can be found at [globelens-frontend](https://github.com/RobinJahn/placemark_frontend)

### Project Setup

- Clone the repository
- Install dependencies with `npm install`
- Add a .env File with:
  - `COOKIE_NAME` as the name of the cookie
  - `COOKIE_PASSWORD` as the password for the cookie
  - `DB` as the mongodb connection string
  - `CLOUDINARY_NAME` as the cloudinary name
  - `CLOUDINARY_KEY` as the cloudinary api key
  - `CLOUDINARY_SECRET` as the cloudinary secret
- Run the server with `npm run dev`