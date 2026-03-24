---
title: AsiPilot
emoji: 🚀
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
---

# 🚀 AsiPilot: The AI-Powered Web IDE

AsiPilot is a cutting-edge, browser-based integrated development environment (IDE) tailored for modern web development. Powered by the advanced **ASI-1 Mini AI** and an ensemble of specialized multi-agent reviewers, AsiPilot offers a seamless, interactive, and highly intelligent coding experience right within your web browser.

## ✨ Key Features

- **🧠 Seamless AI Integration**: Write, refactor, and review code with an intelligent AI assistant. The AI automatically reads your full workspace context and can parse code blocks from chat to **inject changes directly** into your IDE files.
- **🖥️ Monaco Editor Power**: Enjoy a full-fledged VS Code-like editing experience with advanced syntax highlighting, autocompletion, and powerful shortcuts.
- **🔍 Multi-Agent Code Review**: Benefit from specialized AI agents dedicated to Security, Performance, Style, and Documentation, ensuring your code is always production-ready.
- **⚡ Live HTML/Web Preview**: See your HTML, CSS, and JS changes in real-time. Features a built-in "New Tab" option for a detached live web preview experience.
- **🌐 Multi-Environment Support**: Built-in URL routing and advanced architecture support for multiple environments including Web, Java, and Python.
- **⌨️ Integrated Terminal**: A fully functional browser-to-container terminal emulator powered by WebSockets.
- **🐙 GitHub Integration**: Import repositories directly, request multi-agent AI reviews, and generate PR-ready pull requests effortlessly.

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Monaco Editor, Zustand
- **Backend**: Node.js, Express, Socket.io, ASI-1 Mini API Proxy
- **Infrastructure**: Docker, Docker Compose, Redis (for pub/sub, caching, & agent coordination)

## 🚀 Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (optional, for containerized local setups & deployments)

### 1. Local Development Setup

To run the application locally for development:

```bash
# Clone the repository
git clone https://github.com/your-username/AsiPilot.git
cd AsiPilot

# Install monorepo dependencies
npm install

# Setup Environment Variables
cp .env.example .env
```

Open `.env` and configure your necessary keys:
```env
# Required for AI Features
ASI1_API_KEY=your_asi1_api_key_here

# Required for GitHub Integration
GITHUB_TOKEN=your_github_token_here
```

**Start the Development Servers:**

You can start the frontend and backend servers concurrently. AsiPilot also requires a Redis instance for its agent coordination system.

```bash
# Start a local Redis instance (using Docker)
docker run -d -p 6379:6379 redis

# Start both client and server in development mode
npm run dev:all
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### 2. Docker & Production Deployment (e.g., Hugging Face Spaces)

This project is fully ready to be deployed as a Docker container, making it ideal for Hugging Face Spaces or traditional VPS setups.

```bash
# Build the Docker image locally
docker build -t asipilot-ide .

# Or run the entire stack using Docker Compose
docker-compose up --build
```

> **Note**: For Hugging Face Spaces or generic Docker environments, the frontend builds and is served statically by the backend Express server, while APIs and WebSockets run on the same container port (usually port 7860 on Hugging Face). You can use UptimeRobot or a similar pinger to keep your deployed space active.

## 📚 Documentation

For a deeper dive into how AsiPilot is built, check out the following documentation files:

- [System Architecture](ARCHITECTURE.md) - High-level overview of the application design, data flow, and deployment.
- [Client Documentation](packages/client/README.md) - Details on the React IDE shell, Monaco editor, and state management.
- [Server Documentation](packages/server/README.md) - Insights into the Express proxy, WebSocket coordination, and Multi-Agent reviewers.
- [Shared Module Documentation](packages/shared/README.md) - Overview of the shared TypeScript contracts and utilities.

## 📂 Project Structure

AsiPilot is structured as an npm monorepo for maximum code sharing and separation of concerns.

```text
AsiPilot/
├── packages/
│   ├── shared/    # TypeScript interfaces, types, constants, and utilities
│   ├── server/    # Express API server, Proxy, WebSocket handlers, AI Agents
│   └── client/    # React frontend, Monaco IDE, layout, chat UI, state management
├── Dockerfile          # Production Docker build definition
├── docker-compose.yml  # Local multi-container orchestration
└── package.json        # Root workspace configuration
```

## 🤝 Contributing

Contributions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License.
