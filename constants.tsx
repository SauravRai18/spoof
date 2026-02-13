
import React from 'react';
import { SectorType, Project } from './types';

export const SECTORS = [
  {
    id: 'fintech',
    type: SectorType.FINTECH,
    title: 'Fintech',
    description: 'Build robust payment gateways, digital wallets, and trading platforms.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    id: 'ecommerce',
    type: SectorType.ECOMMERCE,
    title: 'E-commerce',
    description: 'Scale marketplaces, inventory systems, and shopping cart logic.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  {
    id: 'saas',
    type: SectorType.SAAS,
    title: 'SaaS',
    description: 'Engineer subscription models, dashboard analytics, and CRM tools.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: 'bg-amber-50 text-amber-600 border-amber-100',
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'NeoWallet Digital Banking',
    description: 'A multi-currency digital wallet with real-time transaction processing.',
    sector: SectorType.FINTECH,
    difficulty: 'Advanced',
    brd: `
# Business Requirement Document (BRD)
## Project Overview
NeoWallet aims to provide users with a secure way to hold multiple fiat currencies and perform instant peer-to-peer transfers.

## Core Features
1. **User Onboarding**: KYC integration and multi-factor authentication.
2. **Account Management**: Support for USD, EUR, and GBP balances.
3. **Internal Transfers**: Instant P2P transfers using email or phone number.
4. **Transaction History**: Searchable and filterable record of all movements.

## Target Audience
Young professionals and digital nomads requiring low-fee currency exchange and instant transfers.
`,
    architecture: `
# System Architecture
The system follows a microservices pattern to ensure scalability and isolation of sensitive financial data.

## Components
- **Identity Service**: Handles Auth and JWT generation.
- **Wallet Engine**: Core ledger managing atomic balance updates.
- **Notification Service**: Real-time updates via WebSockets.
- **API Gateway**: Entry point for mobile and web clients.

## High-Level Flow
1. Client requests transfer.
2. Gateway validates JWT.
3. Wallet Engine initiates 2PC (Two-Phase Commit) to ensure consistency.
4. Ledger updated, response sent.
`,
    database: `
# Database Design (PostgreSQL)
## Schema: Accounts
| Column | Type | Description |
| :--- | :--- | :--- |
| id | UUID | Primary Key |
| user_id | UUID | Foreign Key to Users |
| currency | VARCHAR(3) | ISO Currency Code |
| balance | DECIMAL | Current balance |

## Schema: Transactions
| Column | Type | Description |
| :--- | :--- | :--- |
| id | UUID | Primary Key |
| sender_id | UUID | FK to Users |
| receiver_id | UUID | FK to Users |
| amount | DECIMAL | Amount transferred |
| status | VARCHAR | SUCCESS, PENDING, FAILED |
`,
    api: `
# API Contract (REST)
## POST /api/v1/transfers
Initiates a transfer between two users.

**Request Body**
\`\`\`json
{
  "recipient_id": "uuid",
  "amount": 100.00,
  "currency": "USD"
}
\`\`\`

**Response (200 OK)**
\`\`\`json
{
  "transaction_id": "tx_9921",
  "status": "COMPLETED",
  "timestamp": "2023-10-01T10:00:00Z"
}
\`\`\`
`,
    tasks: [
      { id: 't1', title: 'Setup Database Schema', description: 'Implement PostgreSQL migrations for Accounts and Transactions.', status: 'done' },
      { id: 't2', title: 'Implement Ledger Service', description: 'Create atomic transfer logic with ACID properties.', status: 'in-progress' },
      { id: 't3', title: 'API Gateway Auth', description: 'Integrate JWT validation middleware.', status: 'todo' },
      { id: 't4', title: 'Webhook System', description: 'Build an event-driven notification service.', status: 'todo' },
    ]
  },
  {
    id: 'p2',
    title: 'MarketFlow Multi-Vendor',
    description: 'An enterprise-scale marketplace supporting thousands of vendors.',
    sector: SectorType.ECOMMERCE,
    difficulty: 'Intermediate',
    brd: '# MarketFlow BRD\nFull-featured marketplace with inventory management.',
    architecture: '# MarketFlow Architecture\nMonolithic core with serverless workers for image processing.',
    database: '# MarketFlow DB\nRelational schema for products, orders, and vendors.',
    api: '# MarketFlow API\nGraphQL endpoints for flexible data fetching.',
    tasks: [
      { id: 't5', title: 'Product Catalog', description: 'Build the inventory management UI.', status: 'todo' }
    ]
  },
  {
    id: 'p3',
    title: 'InsightDash Analytics',
    description: 'Real-time SaaS dashboard for business metrics and user tracking.',
    sector: SectorType.SAAS,
    difficulty: 'Intermediate',
    brd: '# InsightDash BRD\nDashboard for SaaS metrics like MRR, Churn, and ARPU.',
    architecture: '# InsightDash Architecture\nEvent-stream processing with Redis and Kafka.',
    database: '# InsightDash DB\nTime-series database for performance metrics.',
    api: '# InsightDash API\nREST API for data ingestion.',
    tasks: [
      { id: 't6', title: 'Charts Implementation', description: 'Use D3.js to render business metrics.', status: 'todo' }
    ]
  }
];
