# Car Rental App

A React Native car rental application developed as part of our Mobile Application Development course.

## Technologies

* React Native
* Expo
* TypeScript

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/TheBarlach/car-rental-app.git
cd car-rental-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the application

```bash
npx expo start
```

Scan the QR code using Expo Go on your mobile device.

If you are working on a remote development server, you may need to use:

```bash
npx expo start --tunnel
```

## Development workflow

Create a new branch before starting work on a feature:

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

When your implementation is ready, push your branch to GitHub and create a pull request.

All changes must be reviewed before merging into main.

## Project requirements

The application must allow users to:

* View available cars.
* View the details of individual cars.
* Book a car.
* Retrieve data through an API.
* Persist retrieved data.

Initially, the application uses dummy data. Backend integration will be added later in the project.

## AI usage

All significant AI usage must be documented in accordance with the project requirements.

AI-generated code must be submitted through a pull request, reviewed by another team member, tested, and pass CI before merging into main.
