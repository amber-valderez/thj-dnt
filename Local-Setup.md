# Local Development Setup

Here are the instructions on how to setup the DntBank app for local development.

1. Clone the git repo
1. Install the latest [Node.js](https://nodejs.org) LTS version.  Minimum required version is 18.
1. Open your terminal and install the following:
1.1. `npm install` to install the frontend dependencies
1.1. `npm install -g @angular/cli` to install the angular CLI for running the app locally
1. Visit `https://console.firebase.google.com`, log in with a google account, and create a new Firebase project.  Remember the name.  I recommend `thj-dnt-local-DISCORDNAME`, replacing discord name with your name in discord.
1. After creating your firebase project, create a Cloud Firestore database.  Choose production mode.
1. Click the `Rules` tab on Cloud Firestore database and change the rules, using the snippet below.  Ignore the warning about data being exposed, we don't store anything sensitive in firebase.
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
1. Go back to the project overview on the firebase console
1. On the left hand side, click the gear icon next to Project Overview and choose Project Settings
1. Click on the </> icon to create a web app.  Name it the same thing as your Firebase project.  Choose whatever region is closest to you.
1. After creating the app, you'll get an SDK setup screen.  Choose `npm` and you'll get a snippet of Javascript that contains a firebaseConfig object with apiKey, authDomain, projectId, etc.
1. Create a new file under `src/environments` called `environment.development.ts` and add the following data.   This file is ignored by git.  It should therefore never be checked in or pushed to the git repo!
```javascript
export const environment = {
    production: false,
    firebase: {
        // Paste the ApiKey, authDomain, projectId, etc here
    }
};
```
1. Run `npm run dev` and visit `http://localhost:4200` when prompted to do so.
1. Navigate to `http://localhost:4200/upload`
1. Inside EQ, run the command `/output inventory outputs/Dntbank-Inventory.txt` on any character you like.
1. Navigate to `outputs` in your THJ EQ folder, and then drag and drop the Dntbank-Inventory.txt file onto the upload page.
