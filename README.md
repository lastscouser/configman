# Configman

Configman is a simple Node.js application that demonstrates Firebase/Firestore authentication and configuration management using environment variables. Follow the steps below to set up and run the application.

## Getting Started

### 1. Set Environment Variables

To authenticate with Firebase/Firestore, you need to set the following environment variables:

```bash
NODE_ENV=development
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
FIREBASE_SERVICE_ACCOUNT=
```
You can obtain the values for these variables (except FIREBASE_SERVICE_ACCOUNT) from your Firebase project settings.
To set the FIREBASE_SERVICE_ACCOUNT, you need a JSON file containing your Firebase service account key. Convert this JSON file into a Base64 string and set it as the FIREBASE_SERVICE_ACCOUNT environment variable.
Convert the JSON file to Base64
Run the following command in the directory containing your service account JSON file:

```bash
cat path/to/your/serviceAccountKey.json | base64
```
Set the output of this command as the value for the FIREBASE_SERVICE_ACCOUNT environment variable.

### 2. Install Dependencies
Once your environment variables are set, install the required dependencies:

```bash
yarn install
```
### 3. Start the Application
Start the application in development mode:

```bash
yarn dev
```
### 4. Test the Application
You can test the application by sending a request to the following endpoint:

http://localhost:1892/api/home
You should receive the following response:

Configman Rocks!!!
### 5. Postman Collection
A Postman collection is available in the root directory of the project. Use it to easily test the available endpoints.

License
This project is licensed under the MIT License - see the LICENSE file for details.
