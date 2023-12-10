# Weather-info-be
The backend of the weather info web application. This application is made as a test for me by the Stack Labs company.

## How to install the project in local
First you need to create a ***.env*** file with some values inside :
- PORT: The port of API (http://localhost:your_port)
- WEATHERBIT_URL: The of the weatherbit API. This value is an environment variable in case they change this URL if they upgrade the version for example. For now you can fill it with **https://api.weatherbit.io/v2.0/**
- WEATHERBIT_KEY: To make calls to the weatherbit API you need to register there and get a key. You can find a link to their website [here](https://www.weatherbit.io/api)

Then you can install dependencies with
```console
$ npm install
```

To test the API launch it with
```console
$ npm run dev
```
If you see the message **Server is running at http://localhost:your_port** it means the setup was a success.

## Adviced extension with you are using Visual Studio Code
I you are using Visual Studio code working on this project will be easier with some extensions to help you code.
- Eslint: The linter used in this project
- Prettier: To format the code on save. Used with Eslint
- Jest Runner: To choose which test to run easily without using the console
- npm Intellisense: To help you with importing the npm package

These are the most important extensions to download, but some like TODO Tree can also be helpful.

## The npm scripts
- build: Build the project into a single file with Webpack
- start: Start the project **after** it has been built by Webpack
- dev: Start the project with nodemon. It uses ts-node so it can run the typescript directly without having to compile it to javascript first
- lint: Will tell you if you have lint problems
- lint:fix: Will try to solve lint problems automatically for you

## Git hooks
If you are wondering why there are no git hooks made with Husky or some libraries, it's because I am not fond of forcing people to have a correct linter or tests before they can push. I prefer putting this verification in a Jenkins pipeline and blocking the PRs that does not meet the requirements.

## Confluence
This project has a confluence to store different documentation. As I use the free version, I cannot handle the confluence space security so please send an email to **bisson.th@gmail.com** to request access if you need it.
