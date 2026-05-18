# Black-jack ts

A modern implementation of the classic Black-jack card game, built with TypeScript. This project focuses on a clear, modular, and object-oriented design to manage game logic, cards, and decks, providing a robust foundation for a command-line or future graphical interface Black-jack experience.

## Features

*   **Standard Black-jack Rules**: Implements core Black-jack gameplay mechanics, including hitting and standing.
*   **Modular Card and Deck Management**: Dedicated modules for `Card` and `Deck` objects, ensuring proper shuffling, dealing, and card representation.
*   **Player and Dealer Logic**: Manages distinct roles and actions for both the player and the dealer.
*   **Score Calculation**: Accurate hand value assessment according to Black-jack rules, including handling of Aces.
*   **TypeScript Advantages**: Leverages TypeScript for strong typing, improved code readability, and maintainability, reducing common JavaScript errors.
*   **Clear Project Structure**: Organized into logical files for easy navigation and understanding of different game components.

## Tech Stack

This project is built using the following technologies:

*   **TypeScript**: The primary language for developing the application, providing static typing and modern JavaScript features.
*   **JavaScript**: The compiled output of TypeScript, compatible with Node.js environments.
*   **Node.js**: The runtime environment for executing the application (assumed for command-line execution).
*   **npm**: Used for package management and script execution.

## Project Structure

The project follows a modular structure to separate concerns, making the codebase easy to understand and maintain.

```
.
├── app.ts                  # Main application entry point, orchestrates game flow.
├── app.js                  # Compiled JavaScript output of app.ts.
├── card.ts                 # Defines the Card class, representing individual playing cards.
├── card.js                 # Compiled JavaScript output of card.ts.
├── deck.ts                 # Defines the Deck class, managing a collection of cards.
├── deck.js                 # Compiled JavaScript output of deck.ts.
├── types.ts                # Contains custom TypeScript type definitions and interfaces.
├── types.js                # Compiled JavaScript output of types.ts.
├── utils.ts                # Provides utility functions used across the application.
├── utils.js                # Compiled JavaScript output of utils.ts.
├── package.json            # Project metadata and dependencies.
├── package-lock.json       # Records the exact dependency tree.
└── tsconfig.json           # TypeScript compiler configuration.
```

## Installation Instructions

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js and npm installed on your system. You can download them from the official Node.js website.

*   Node.js (includes npm)

### Clone the Repository

```bash
git clone https://github.com/your-username/black-jack-ts.git
cd black-jack-ts
```

### Install Dependencies

Install all necessary project dependencies using npm:

```bash
npm install
```

### Compile TypeScript

Compile the TypeScript source files into JavaScript:

```bash
npm run build
```

Alternatively, if you have TypeScript globally installed, you can use:

```bash
tsc
```

## Usage Instructions

After installation and compilation, you can run the Black-jack game from your terminal.

### Running the Game

```bash
npm start
```

Or, if you prefer to run the compiled JavaScript directly:

```bash
node app.js
```

The game will then prompt you for actions (e.g., "hit" or "stand") as the game progresses. Follow the on-screen instructions to play.

## License Information

This project is licensed under the MIT License. See the `LICENSE` file for more details (note: a `LICENSE` file would typically be present in a real project; this is a placeholder suggestion).

---