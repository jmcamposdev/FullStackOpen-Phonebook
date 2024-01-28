# Full Stack Open - Phonebook Project

Welcome to the repository for my implementation of the Phonebook project from the Full Stack Open course by the University of Helsinki.

## Project Overview

The Phonebook project is designed to demonstrate the full stack development process. It includes a frontend built with React, communication with a backend server developed using Node.js and Express, and a MongoDB database for storing contact information.

## Repository Structure

The repository is structured as follows:

- `/frontend`: Contains the React frontend code.
- `/backend`: Includes the Node.js and Express backend code.
- `/docs`: Documentation and additional resources.

## Usage Instructions

1. Clone the repository: `git clone https://github.com/jmcamposdev/FullStackOpen-Phonebook.git`
2. Navigate to the project folder: `cd FullStackOpen-Phonebook`
3. Explore the `/frontend` and `/backend` folders for the respective code.

## Running the Application

### Frontend

1. Navigate to the `/frontend` folder.
2. Install dependencies: `npm install`
3. Start the application: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend

1. Navigate to the `/backend` folder.
2. Install dependencies: `npm install`
3. Configure MongoDB:
   - Change the MongoDB connection URL in `/backend/index.js`.
   - Replace the existing URL with your MongoDB database URL.
4. Start the server: `npm start`
5. The backend will run on [http://localhost:3001](http://localhost:3001).

## Configuring MongoDB

In the `/backend/index.js` file, locate the following line:

```javascript
mongoose.connect('your_mongodb_url_here', { useNewUrlParser: true, useUnifiedTopology: true });
