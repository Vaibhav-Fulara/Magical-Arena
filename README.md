# 🌟 Magical Arena 🌟

Welcome to **Magical Arena**, a thrilling game simulation where players engage in epic battles by leveraging attributes such as health, strength, and attack. This application serves as a backend API that manages players and orchestrates battles within the arena.

## 🚀 Features

- **Create Players:** Register new players with unique abilities and stats.
- **Fetch Player Details:** Retrieve details about specific players.
- **Fight Simulation:** Conduct fights between two players and determine the winner based on their stats and a bit of luck.

## 📦 Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Vaibhav-Fulara/Magical-Arena
   cd Magical-Arena

2. **Install dependencies**

   ```bash
   pnpm install

2. **Start the Server**

   ```bash
   pnpm start

## 🛠️ Technology Stack

This project utilizes the following technologies:

- **Node.js**: As the runtime environment for the server.
- **Express.js**: Used to create server-side routes and middleware.
- **MongoDB**: NoSQL database to store player data.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **Jest**: For running unit tests to ensure code quality and reliability.
- **TypeScript**: Used as the primary language, providing type safety on top of JavaScript.

## 📡 API Endpoints

This section details the various API endpoints available in **Magical Arena**, describing their purposes, request formats, and expected responses.

### Players

- **POST /players**
  - **Description**: Create a new player with specified attributes.
  - **Request Body**:
    ```json
    {
      "name": "PlayerName",
      "health": 100,
      "strength": 10,
      "attack": 5
    }
    ```
  - **Success Response**:
    ```json
    {
      "id": "generatedPlayerId",
      "message": "Player created successfully."
    }
    ```

- **GET /players/:playerId**
  - **Description**: Retrieve details of a specific player by their ID.
  - **Response**:
    ```json
    {
      "id": "playerId",
      "name": "PlayerName",
      "health": 100,
      "strength": 10,
      "attack": 5
    }
    ```

### Fights

- **POST /fight/:player1Id/:player2Id**
  - **Description**: Conduct a fight between two players and determine the winner based on their attributes and a dice roll.
  - **Response**:
    ```json
    {
      "winner": "playerIdOfWinner",
      "details": {
        "player1": {
          "id": "player1Id",
          "health": 0
        },
        "player2": {
          "id": "player2Id",
          "health": 100
        }
      }
    }
    ```

This structured presentation not only provides all the necessary information about what the API endpoints do but also includes sample request formats and what kind of response can be expected, enhancing the usability of the documentation.


## 🧪 Running Tests

To ensure the reliability and functionality of the **Magical Arena**, comprehensive tests have been implemented. You can run these tests to verify that everything is working as expected. Follow the instructions below based on your package manager:

### Using pnpm

Execute the tests using npm by running the following command in the terminal:

```bash
pnpm test
