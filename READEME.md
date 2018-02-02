### The project was implemented with Node.js and Express. It is assumed that you have Node installed on your machine.

To build and run the project - run the following commands from your command line tool

* git clone https://github.com/YuriyKartuzov/Project
* cd Project
* npm install
* npm start

The `bash` will display a message telling you on what port the server is listening on <br/>
example: ` Server is running on PORT: 2025 `

Please navigate to the following page in your browser: `http://localhost:2025` <br/>

Once there you can submit GET and POST requests throught the form. Alternitevly you may manually input the string to 
be parsed. For that use the following URI. `http://localhost:2025/findPhoneNumbers/{...string...}`

Tests may be run by running `npm test` command
