# 🚀 Getting Started with TrustScoreAI

Follow these steps to set up and run TrustScoreAI on your local machine. This project is built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Version 18.x or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js) or [Yarn](https://yarnpkg.com/)

## 🛠️ Step-by-Step Setup

### 1. Clone the Repository
Open your terminal and run the following command to download the code:
```bash
git clone https://github.com/your-username/trustscore-ai.git
cd trustscore-ai
```

### 2. Install Dependencies
Install all the required project libraries (including Radix UI, Lucide icons, and Recharts):
```bash
npm install
# or if you use yarn
yarn install
```

### 3. Run the Development Server
Start the application in development mode:
```bash
npm run dev
# or
yarn dev
```

### 4. Open the Application
Once the server is running, open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Demo Credentials
Use the following credentials to access the platform. You can change your role in the settings or test the default dashboard views:

- **Default Email**: `preet@credit.com`
- **Default Password**: `preet123`

### Role-Based Access (Demo)
The application dynamically switches views based on the user's role. For exploration, use the default account above or these demo role mappings:

| Role | Username (Example) | Role Key |
| :--- | :--- | :--- |
| **Loan Officer** | `james@bank.com` | `loan_officer` |
| **Risk Manager** | `sarah@bank.com` | `risk_manager` |
| **System Admin** | `admin@bank.com` | `admin` |
| **Client** | `preet@credit.com` | `client` |

> **Note**: Current authentication is handled via a local Zustand store for demo purposes.

## 📁 Project Structure
- `/app`: Next.js App Router (Pages and Routes)
- `/components`: Reusable UI components and Role-specific dashboards
- `/lib`: State management (Zustand), RBAC logic, and utility functions
- `/public`: Static assets (Logos, Images)

## 🏗️ Build for Production
To create an optimized production build, run:
```bash
npm run build
npm run start
```

---

