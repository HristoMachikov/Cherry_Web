# Cherry_Web

The main aim of this project is to refactor static Jekyll generated site [Get Cherry](https://hristomachikov.github.io/Cherry_Jekyll/) and make it dynamic (SPA something like e-commerce site) using React.js as front-end Framework and Node.js with Express and MongoDB for back-end.

## How to set up the project?

1. First you have to start MongoBD, typing `mongod` in terminal;
2. Next in *cherry-rest-api* directory you have to run `npm start`. This will start local server which listening at *http://localhost:4000* and you have to see in terminal the messsage "Datebase is ready!";
3. At last in *cherry-web-app* directory you have to run `npm start`. This will open project at [http://localhost:3000](http://localhost:3000) to view it in the browser;

- When you start *cherry-rest-api* (point 2) for first time, the Admin user will be registred automalicly with 
e-mail:*admin@admin.com*
password:*Admin*
- You have to create new products with this "Admin" functionality of the project at first, and make this product Public if you want to be  visible for every new user.
- Before you create new product, you have to add product's image in *cherry-web-apppublic/static/images/* folder, and then you can type the image name as string, prexixed by "/images/" 

## What consist each folder?
### [cherry-rest-api](https://github.com/HristoMachikov/Cherry_Web/tree/master/cherry-rest-api)
- Back-end service of the project

### [cherry-web-app](https://github.com/HristoMachikov/Cherry_Web/tree/master/cherry-web-app)
- Web application of the project

### [Cherry_ExpressJS](https://github.com/HristoMachikov/Cherry_Web/tree/master/Cherry_ExpressJS)
- Alfa version of project, only for development purpose and to visualise what have to achieve in main project. 
- Created at Node.js with Express, MongoDB and using Handlebars as view engine;
- You can run `npm start` in the project directory and open [http://localhost:3000](http://localhost:3000) to view it in the browser.
