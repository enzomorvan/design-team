# Design Team Blog static site

## Prerequisites

To run this project, you need a recent version (LTS) of node and npm installed on your machine.

This project uses the yarn package manager, you can install it by following this step
```
npm i -g yarn
```

You need to run the scraper at least once to store posts in the database.

## Installation

1. Clone the repo

2. Create a file called `.env` in the root of the project and make it follow this format.
```.env
MONGO_URI=XXXXXXXXX.mongodb.net
MONGO_USERNAME=mongo username
MONGO_PASSWORD=mongo password
MONGO_REPLICA_SET=cluster0-shard-00-01  (the primary replica set, this is an example of the format) 
```

3. Install the dependencies.

```sh
yarn install
```


## Usage

To run a development version of the site.

```sh
yarn develop
```

## Deployment

Create a netlify account, click the create a site from git button and link the git repository where this site is hosted.

Access the netlify environement variables and add the variables from `.env`. More instructions on this [here](https://docs.netlify.com/configure-builds/environment-variables/)
