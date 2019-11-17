# Deployment Guide

## Setup Firebase

Create new project in [Firebase](https://console.firebase.google.com) called ["outrage-classifications"](https://console.firebase.google.com/u/1/project/outrage-classifications/overview). Create new Google APIs project as necessary. Give the Firebase app permissions to Google Analytics (and create a new GA org as necessary).

Register a new web app called "outrage-client-js" and observe its application credentials.

Create a [new database](https://console.firebase.google.com/u/1/project/outrage-classifications/database) starting in "production mode", in one of the "us-east" regions. In the database, create a new collection called "classifications" with document id "doc-20191116" and add the fields: "tweet_uuid" (string), "username" (string), "outrage" (boolean).

Go to the Google APIs console project and navigate to Credentials and click "create credentials" for a "service account" (JSON) called "classification-service" with "editor" role, then download the service account credentials .JSON file and store it in this repo as "google-credentials.json".

Install the firebase package:

```sh
npm install --save firebase-admin
npm install --save firebase
```

Run the firebase script for testing purposes:

```sh
npm install typescript -g # first time only, to install "tsc" CLI
tsc src/utils/fire.ts && node src/utils/fire.js
```

## Setup BigQuery

Enable the BigQuery API from the Google APIs console.

Navigate to BigQuery console, and click on the "outrage-classifications" project name at the bottom left to reveal a place where you can "Create a dataset" named "outrage_development", "outrage_staging", "outrage_production", etc.

Inside the dataset, create a new table called "classifications" with the following schema: "tweet_uuid" (string, required), "username" (string, required), "outrage" (boolean, required), "classified_at" (timestamp, nullable).

Install the package:

```sh
npm install --save @google-cloud/bigquery
```

Run the script for testing purposes:

```sh
tsc src/utils/bq.ts && node src/utils/bq.js
```
