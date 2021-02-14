# Crime Map

# Functionality of the application

This application allow users to add areas reported with crimes to a crime map.

# Deployment

## Link

the frontend have been deployed as a static website using Firebase hosting.

- frontend link [https://crime-alert-eea56.web.app](https://crime-alert-eea56.web.app)

## CI/CD Pipelines

this project use Github actions to automatically build and deploy the app to firebase hosting

# Frontend credentials

## Google Maps API Key

To use the Maps JavaScript API, you must include an API key with all API requests, and you must enable billing on each
of your projects.
> _tip_: I have included a default key, but this key is limited in terms of quota and will be deactivated soon. please use your own API key

- follow this guide to get an API
  Key [https://developers.google.com/maps/documentation/javascript/get-api-key](https://developers.google.com/maps/documentation/javascript/get-api-key)

# How to run the application

## Frontend Web

To run a client application first edit the `src/environments/environment.ts` file to set correct parameters. Then run the following commands:
> _tip_: the default credentials have already been added in the file

```
npm install
ionic serve
```

This should start a development server with the Ionic application that will interact with Firebase.
> _tip_: you can view it in your browser at `localhost:8100`

## Native App

### Capacitor

Capacitor uses Android Studio/Xcode to build and run apps to simulators and devices. to run and debug Ionic apps on Android
emulators and devices using Capacitor, run

```
ionic capacitor add android # to generate the native project, if it does not already exist
ionic capacitor copy android # to open Android Studio
```

in Android Studio, click the Run button and then select the target simulator or device.
