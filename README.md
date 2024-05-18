# SMARTINSIGHT TEST API
This project is a Node.js (Express) and TypeScript-based API for an AI software that takes a user message, generates a response, and suggests four follow-up questions based on the user message and the generated response. The OpenAI API is used to generate these responses and follow-up questions.

## Features

- Accepts a user message and generates a response
- Suggests four follow-up questions based on the user message and generated response
- Built with Node.js, Express, and TypeScript
- Utilizes OpenAI API for generating responses

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)
- An OpenAI API key

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Elikdev/smartinsight-test.git
cd smartinsight-test
```

### Install Dependencies

```bash
npm install
```

### Set up environment variables

Copy and set the required environment variables using the command

```bash
cp .env.example .env
```

Replace the values of the variables with your actual and correct value. 

NOTE: The recent models of OpenAI were used in this project and the newest endpoints of the OpenAI were used. 

### Run the Server

```bash
npm run dev
```

The server will start on the port specified in the .env file (default is 7027).

### Running Tests

To run tests using jest:

```bash
npm test
```

### Documentation

[Postman documentation link](https://documenter.getpostman.com/view/9087902/2sA3JT3yMz)