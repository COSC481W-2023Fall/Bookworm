# Bookworm - Backend

This directory contains all the source code relating to the backend of Bookworm.

## Starting the Backend

1. locate to backend directory, create a .env file and define your MongoDB connection URL:
2. paste DATABASE_URL=your MongoDB connection URL(no quotation mark, just URL)
   PORT=3001
3. Open a terminal, and ensure that you are in the `backend` directory
4. Run `npm i`
5. Run `npm run build`
6. Run `npm start`

## Setting up the testing framework

1. Open a terminal, and ensure that you are in the `backend` directory
2. Run `npm install --save-dev ts-jest`
3. Run `npm install --save-dev @jest/globals`
4. Run `npm test`
