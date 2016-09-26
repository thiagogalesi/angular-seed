# Contacts Angularjs app - based on angular-seed

## Configuration

Change the first line in app/services.js for the corresponding address:port of the REST contact interface

If you want to test this from outside the machine running the service it needs to be a valid IP on your network

SERVICE_ADDRESS = 'http://localhost:8000';

## Installing

After cloning use 'npm install' to install the dependencies

** There might be an issue where your system only has `node` and package.json expects `nodejs` **

In this case either change the binary used by the program or create a symbolic link between the binaries

## Running

1. Run the backend service (npm start on the users-api project)

1. npm start on this project

See README.original.md for details relating to installation


## Future work

- Edit contacts
- Testing
- Better theme


