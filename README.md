# ðŸ’Š CodePharma POS - Multi-Mode Pharmacy Management Suite

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> An enterprise monorepo pharmacy point-of-sale (POS) and inventory orchestration platform. Features hybrid **Standalone**, **Terminal**, and **Central Server** deployment topologies, role-based security, ISO 4217 multi-currency support, and cross-platform desktop integration.

---

## âš¡ Deployment Modes

CodePharma is engineered to adapt dynamically to diverse pharmacy operational requirements:

| Mode | Architecture | Target Environment | Database Strategy |
|:---|:---|:---|:---|
| ðŸ”Œ **Standalone** | Single-device POS | Small clinics, remote dispensaries, mobile kiosks | Offline-first embedded SQLite with periodic sync |
| ðŸ–¥ï¸ **Terminal** | LAN Client Station | Multiple counter registers pointing to a store server | High-speed REST/WebSocket client |
| ðŸ¢ **Server / HQ** | Central Headquarters | Multi-branch pharmacy networks & franchise chains | PostgreSQL / MySQL central server with branch replication |

*The deployment mode can be configured directly through the UI header or via the DEPLOYMENT_MODE environment variable.*

---

## ðŸ—ï¸ Architecture & Monorepo Structure

Built with modern npm workspaces for modularity, code sharing, and strict typing:

``
codepharma/
â”œâ”€â”€ apps/
â”‚   â”œâ”€â”€ api/                   # Backend REST API (Node.js, Express, JWT, Roles)
â”‚   â”œâ”€â”€ web/                   # Frontend SPA (React, Vite, TypeScript, Tailwind)
â”‚   â””â”€â”€ electron/              # Native desktop wrapper with frameless window styling
â”œâ”€â”€ packages/
â”‚   â””â”€â”€ shared/                # Shared interfaces, ISO 4217 currency catalog, roles
â”œâ”€â”€ .github/                   # CI/CD workflows and actions
â”œâ”€â”€ package.json               # Root monorepo workspace configuration
â””â”€â”€ tsconfig.base.json         # Base TypeScript configuration
``

---

## ðŸ” Role-Based Access Control (RBAC)

CodePharma enforces granular permissions tailored to pharmacy compliance:

- **ðŸ‘‘ Administrator**: Full system configuration, audit trails, user management, and tax/fiscal settings.
- **âš•ï¸ Pharmacist**: Prescription validation, controlled substance logs, dispensing authorization, and stock intake.
- **ðŸ’µ Cashier**: Point-of-sale checkout, customer invoice creation, split payment handling, and daily till reconciliation.

*Default Demo Credentials:* dmin / dmin

---

## ðŸš€ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- 
pm (v9 or higher with workspaces support)

### Installation

1. **Clone the repository:**
   `ash
   git clone https://github.com/c-odenat/codepharma-pos.git
   cd codepharma-pos
   `

2. **Install all dependencies:**
   `ash
   npm install
   `

### Development Execution

Run individual workspaces or start full-stack services concurrently:

`ash
# Run both Backend API and Web Frontend concurrently
npm run dev

# Run only the Backend API (default port: 4000)
npm run dev:api

# Run only the Web Frontend (default port: 5173)
npm run dev:web

# Launch Electron desktop shell (loads web app on 5173)
npm run dev:desktop
`

### Production Build

`ash
# Build API and Web packages for production
npm run build
`

---

## ðŸŒ Multi-Currency & Localization

Includes built-in support for global currencies loaded dynamically from @codepharma/shared, providing real-time formatting, currency symbol positioning, and ISO 4217 validation.

---

## ðŸ‘¤ Author

**Nathaniel Darko**
- GitHub: [@c-odenat](https://github.com/c-odenat)
- Portfolio: [Nathaniel Darko Portfolio](https://c-odenat.github.io)

---

## ðŸ“„ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
