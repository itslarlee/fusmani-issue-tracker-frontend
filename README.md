
# Issue Tracker Frontend

This repository contains the frontend of the Issue Tracker application. It is built with **React**, **TypeScript**, **Material-UI** (MUI), and **Dnd-kit** for drag-and-drop functionality.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Features](#features)
- [Tech Stack](#tech-stack)

## Setup Instructions

To run this project locally, follow these steps:

### 1. Prerequisites

- **Node.js** and **npm** installed on your machine.
- **Backend server**: Ensure the backend API server is running and accessible at the base URL `http://localhost:5000`.

### 2. Clone the Repository

```bash
git clone https://github.com/itslarlee/fusmani-issue-tracker-frontend.git
cd fusmani-issue-tracker-frontend
```

### 3. Install Dependencies

Install the project dependencies using `npm`:

```bash
npm install
```

### 4. Start the Development Server

To start the frontend in development mode, run:

```bash
npm start
```

The application will open at `http://localhost:3000`.


## Features

- **Create New Issue**: Add a new issue with title, description, status, and priority.
- **Edit & Delete Issue**: Edit or delete existing issues.
- **Drag-and-Drop**: Reorder issues between different status columns.
- **Theming**: Dark mode enabled by Material-UI's theme.


## Tech Stack

- **React** with **TypeScript** for building the user interface.
- **Material-UI** for responsive and accessible UI components.
- **Dnd-kit** for drag-and-drop interactions within the Kanban board.
- **React Query** for managing API requests and caching.

## Contributing

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. Contributions are welcome!
