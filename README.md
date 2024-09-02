# node-api-template

TO START:
1- you need to set some environment variables to authenticate firebase/firestore

NODE_ENV=development
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
FIREBASE_SERVICE_ACCOUNT=

you can get the variables listed above, except FIREBASE_SERVICE_ACCOUNT, from your firebase project. To reach firebase service account, we need a json file and it is a little bit long. To store it in environment variables, you need to convert the json file to base64 string and set the key FIREBASE_SERVICE_ACCOUNT.

to convert base64 string, you can run in the json file's directory.
'cat path/to/your/serviceAccountKey.json | base64'

2- run "yarn install"
3- run "yarn dev"
4- send request "http://localhost:1892/api/home" and get "Configman Rocks!!!" response.
5- you can find postman collection in root directory of the project
