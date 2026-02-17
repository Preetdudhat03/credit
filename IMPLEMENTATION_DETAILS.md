# TrustScoreAI: Implementation Details & System Architecture

This document provides a comprehensive overview of the features, architecture, and security protocols implemented within the TrustScoreAI credit application platform.

## 1. Core Architecture & Tech Stack
*   **Framework**: Next.js 14 (App Router) with TypeScript.
*   **Styling**: Vanilla CSS with Tailwind CSS for rapid, responsive UI development.
*   **State Management**: Zustand (with Persist middleware) for robust authentication and application state.
*   **UI Components**: shadcn/ui (Radix UI) for accessible, premium-grade interface elements.
*   **Data Visualization**: Recharts for interactive financial analytics and risk trends.

## 2. Role-Based Access Control (RBAC) System
A production-grade RBAC system (`lib/rbac.ts`) ensures strict separation of duties and data privacy.

### Roles & Permissions:
*   **Loan Officer**: Focuses on applicant review and individual credit decisions.
*   **Risk Manager**: Oversees portfolio health, adjusts model thresholds, and monitors fraud.
*   **System Administrator**: Manages infrastructure, user provisioning, and security policies.
*   **Client**: Submits applications and monitors their own credit score.

### Key Features:
*   **Granular Permission Check**: Integrated `hasPermission` utility across all UI actions.
*   **PII Masking**: Automatic masking of sensitive data (Aadhaar, Phone Numbers) using `maskIdentifier`.
*   **Security Policies**: Global enforcement of MFA and session timeouts via the Admin panel.

## 3. Dynamic Dashboard Ecosystem
The main `/dashboard` route dynamically renders unique components based on the user's role.

### Loan Officer Dashboard
*   **Application Registry**: Interactive table for managing assigned cases.
*   **AI Transparency**: Integrated **SHAP (SHapley Additive exPlanations)** panel showing positive/negative factors driving the AI score.
*   **Decision Tools**: Quick-action menus for Approval, Rejection, and Document Requests.
*   **WhatsApp Integration**: Triggers automated communication via the WhatsApp gateway.

### Risk & Analytics Dashboard
*   **Portfolio Metrics**: Real-time tracking of Default Rates, Model AUC, and Fraud Detection Rate.
*   **Financial Viz**: Area charts for default trends and Pie charts for risk segmentation by income.
*   **Fraud Alerts**: Detection system for address clustering and synthetic identity signals.
*   **Governance**: Master controls to adjust the "Decision Boundary" (Credit Score vs. Fraud Probability).

### System Control Panel (Admin)
*   **Infrastructure Health**: Live monitoring of CPU, Memory, and Database IOPS.
*   **WhatsApp Gateway**: API key configuration and webhook status tracking.
*   **User Management**: Personnel registry with role assignment and authentication logs.
*   **Audit Trail**: Foreground action tracking for forensic analysis.

## 4. Feature Implementation Details

### Application Management
*   **New Application Flow**: Multi-step forms for data collection.
*   **Application Pipeline**: Unified list view (`/application/list`) for staff with advanced filtering.
*   **Credit Scoring**: Real-time gauge component (`CreditScoreGauge`) visualizing scores from 300-900.

### User Experience (UX)
*   **Responsive Sidebar**: Dynamic navigation that hides/shows features based on role permissions.
*   **Theming**: Integrated light/dark mode support with system preference detection.
*   **Polish**: Micro-animations and slide-in transitions for a smooth, app-like feel.

## 5. Security & Compliance
*   **Zero-Knowledge PII**: Admins are restricted from viewing raw financial data to ensure privacy compliance.
*   **Audit Logging**: Every significant action (decisions, resets, config changes) is logged with timestamps and IP metadata.
*   **Radix UI Accessibility**: Components like `Switch`, `Slider`, and `DropdownMenu` follow WAI-ARIA standards.

---
**Status**: Beta v2.4.1 (Production Cluster Operational)
**Last Updated**: February 17, 2026
