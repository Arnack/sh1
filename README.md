# ProjectMate Web

This is the web version of ProjectMate - bringing the power of project management and collaboration to your browser. Built with modern web technologies to provide a seamless experience across all devices.

## Overview

ProjectMate Web offers the same great features you love from the desktop version, now accessible anywhere through your web browser. Whether you're at your desk or on the go, stay connected with your projects and team.

## Features

- 🌐 Access anywhere through your browser
- 💻 Responsive design that works on desktop and mobile 

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://tfs.projectmate.ru/tfs/ProjectMate%20Team/ProjectMate%207.5/_git/WebProjectMate
   cd projectmate-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Deployment

To deploy, build the production version:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the production version:
   ```bash
   npm run build
   ```

3. Start the production server:
   ```bash
   npm start
   ```

The application will be available at the configured host and port.


```mermaid
graph TD
    A[Управление состоянием] --> B[Локальное состояние]
    A --> C[Глобальное состояние]
    A --> D[Серверное состояние]
    
    B --> B1[React useState]
    B --> B2[useReducer]
    
    C --> C1[Zustand]
    C --> C2[Легковесное решение]
    C --> C3[Гибкая настройка]
    
    D --> D1[React Query]
    D --> D2[Кэширование]
    D --> D3[Синхронизация]
    
 ```

