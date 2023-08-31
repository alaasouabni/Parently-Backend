# EveMark

EveMark is a revolutionary event ticketing management app that makes it easy for event organizers to sell tickets, manage attendees, and track ticket sales in real-time and for event enthusiasts to find the newest events available and book their tickets. With EveMark, you can easily create event pages and set up ticket pricing. The app also provides advanced security features to prevent ticket fraud and scalping, and allows for seamless check-in and entry at the event. EveMark is the perfect solution for any event organizer looking to streamline their ticketing process and sell more tickets. With EveMark you can make your event a huge success.

## About The Backend

EveMark Backend makes use of the expressjs framework, which is a Node.js-based back end web application framework for building RESTful APIs. 

Backend features include creating/reading/updating/deleting/authenticating the user with JWT tokens. We also used authorizations to improve server security. It also allows users to create/read/update/delete events stored on our MongoDB database at last mongodb. 
the app features uploading images and hosting them on cloudinary, as well as sending emails to participants via our dashboard using mailgun.

## API Reference

### Events APIs
| API Endpoint            | Type   | Description                                                              |
|-------------------------|--------|--------------------------------------------------------------------------|
| /event/create           | POST   | Create an event                                                          |
| /event/get-all          | GET    | Retrieve all events                                                      |
| /event/update/:eventId  | PUT    | Update an event with eventId                                             |
| /event/get-one/:eventId | GET    | Retrieve a specific event with eventId                                   |
| /event/buy              | POST   | Buy ticket for a specific event passed in body                           |
| /event/checkin          | POST   | Check in an attendee with userId in a specific event with eventId        |
| /event/delete/:eventId  | DELETE | Delete a specific event with eventId                                     |
| /event/mail/:eventId    | POST   | Send mail to participants with eventId and email content in request body |

### Users APIs
| API Endpoint             | Type   | Description                                                              |
|--------------------------|--------|--------------------------------------------------------------------------|
| /user/create             | POST   | Create a user                                                            |
| /user/login              | POST   | Login a user                                                             |
| /user/logout             | POST   | Logout a user                                                            |
| /user/get-my-event       | GET    | Retrieve events that this user is participating in                       |
| /user/get-created-events | GET    | Retrieve events created by this user                                     |
| /event/checkin           | POST   | Check in an attendee with userId in a specific event with eventId        |
| /event/delete/:eventId   | DELETE | Delete a specific event with eventId                                     |
| /event/mail/:eventId     | POST   | Send mail to participants with eventId and email content in request body |

## Installing Dependencies

After cloning the project, you need to install all the dependencies with you favourite package manager (We recommend using yarn as npm is not working correctly)
```sh
yarn 
//or
npm install

```
## Configuring environment variables

you need to add .env file to the project and add the appropriate values.
To get your Api keys go to https://cloudinary.com and https://www.mailgun.com

```sh
AUTH_SECRET=
PORT=3001
CLOUDINARY_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MAILGUN_API_KEY=
MAILGUN_DOMAIN=

```



## Running The Project
To run the project in the development environment, use the following command
```sh
yarn dev

```

To run the project in the production environment, use the following command
```sh
yarn start

```

