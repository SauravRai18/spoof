
import React from 'react';
import { SectorType, Project } from './types';

export const SECTORS = [
  {
    id: 'fintech',
    type: SectorType.FINTECH,
    title: 'Fintech',
    description: 'Build robust payment gateways, digital wallets, and ledger systems.',
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
    id: 'fin-1',
    title: 'Wallet System',
    description: 'Core digital wallet implementation allowing users to hold, deposit, and withdraw virtual currency.',
    sector: SectorType.FINTECH,
    difficulty: 'Beginner',
    brd: `
# Business Requirement Document (BRD)

## Overview
You are hired as a Backend Engineer at a Fintech startup. Your task is to build a robust and secure Wallet System that serves as the foundation for our financial platform.

## Functional Requirements
- **User Management**: Support User Registration & Login securely.
- **Wallet Provisioning**: Automatically create a Wallet for each registered user.
- **Funding**: Allow users to Add Money to their wallet.
- **P2P Transfers**: Enable users to Transfer money to another user in the system.
- **Ledger Access**: Provide a view for users to see their full transaction history.
- **Compliance & Monitoring**: Admin portal capability to monitor all platform transactions.

## Non-Functional Requirements
- **Scalability**: The system should support up to 10,000 active users.
- **Integrity**: Prevent double-spending through ACID transactions.
- **Auditing**: Every transaction must be properly logged for reconciliation.
- **Security**: All API endpoints must be secure and use industry-standard authentication.
`,
    architecture: `
# System Architecture

## Data Flow
**Client** → **API Layer** → **Service Layer** → **Database**

## Architectural Decisions
- **Service Layer**: We use a dedicated Service Layer to encapsulate business logic. This ensures that validation and financial rules are applied consistently regardless of the entry point.
- **Validation**: Input validation happens at the API Layer (syntax) and Service Layer (business rules like "insufficient funds").
- **Transaction Logic**: To ensure atomicity, money transfers are handled within a database transaction block. If any step fails (e.g., credit fails after debit), the entire operation rolls back.
`,
    database: `
# Database Design

## Tables

### Users
- \`id\` (Primary Key, UUID)
- \`name\` (VARCHAR)
- \`email\` (VARCHAR, UNIQUE)
- \`password\` (HASHED)

### Wallets
- \`id\` (Primary Key, UUID)
- \`user_id\` (Foreign Key -> Users, INDEXED)
- \`balance\` (DECIMAL, DEFAULT 0)

### Transactions
- \`id\` (Primary Key, UUID)
- \`sender_id\` (Foreign Key -> Users)
- \`receiver_id\` (Foreign Key -> Users)
- \`amount\` (DECIMAL)
- \`status\` (ENUM: SUCCESS, PENDING, FAILED)
- \`timestamp\` (DATETIME)

## Technical Notes
- **Indexes**: An index is placed on \`user_id\` in both the Wallets and Transactions tables to ensure fast lookups of balances and history.
- **Data Integrity**: Foreign Keys are enforced to prevent orphaned wallet records.
`,
    api: `
# API Contract

## Endpoints

### 1. User Registration
**POST** \`/create-user\`
\`\`\`json
{
  "name": "Alex Engineer",
  "email": "alex@example.com",
  "password": "hashed_password"
}
\`\`\`

### 2. Fund Wallet
**POST** \`/add-money\`
\`\`\`json
{
  "wallet_id": "uuid",
  "amount": 500.00
}
\`\`\`

### 3. P2P Transfer
**POST** \`/transfer-money\`
\`\`\`json
{
  "recipient_id": "uuid",
  "amount": 150.00
}
\`\`\`

### 4. Fetch History
**GET** \`/transactions/:userId\`
**Response**:
\`\`\`json
[
  {
    "id": "tx_1",
    "amount": 150.00,
    "status": "SUCCESS",
    "type": "DEBIT"
  }
]
\`\`\`
`,
    tasks: [
      { id: 't1', title: 'Setup Project & DB', description: 'Initialize repository and implement PostgreSQL migrations for Users, Wallets, and Transactions.', status: 'todo' },
      { id: 't2', title: 'User Authentication', description: 'Implement JWT-based registration and login flows.', status: 'todo' },
      { id: 't3', title: 'Wallet Provisioning', description: 'Ensure a wallet is created automatically upon user signup.', status: 'todo' },
      { id: 't4', title: 'Add Money Logic', description: 'Create service to handle balance increments with validation.', status: 'todo' },
      { id: 't5', title: 'Atomic Transfer Engine', description: 'Implement the core P2P transfer logic using database transactions to prevent double spending.', status: 'todo' },
      { id: 't6', title: 'Transaction History API', description: 'Build efficient queries to retrieve a user’s ledger.', status: 'todo' },
      { id: 't7', title: 'Validation & Error Handling', description: 'Implement global exception handling and request body validation.', status: 'todo' },
      { id: 't8', title: 'Logging & Auditing', description: 'Integrate a logging framework to track every financial movement.', status: 'todo' }
    ]
  },
  {
    id: 'fin-2',
    title: 'Payment Gateway',
    description: 'Integrate external providers and handle merchant transaction flows securely.',
    sector: SectorType.FINTECH,
    difficulty: 'Intermediate',
    brd: '# Payment Gateway BRD\nHandle 3D-Secure and multi-merchant routing.',
    architecture: '# Gateway Architecture\nDistributed system with webhooks and retry logic.',
    database: '# Gateway Schema\nTransactional storage for payment intents.',
    api: '# Gateway APIs\n- POST /payments/intent\n- GET /payments/verify',
    tasks: [
      { id: 't2_1', title: 'Integrate Stripe SDK', description: 'Mock external provider.', status: 'todo' }
    ]
  },
  {
    id: 'fin-3',
    title: 'Ledger System',
    description: 'High-scale double-entry accounting system to ensure zero balance discrepancies.',
    sector: SectorType.FINTECH,
    difficulty: 'Advanced',
    brd: '# Ledger System BRD\nImmutable record-keeping for every single penny.',
    architecture: '# Ledger Architecture\nEvent-sourced architecture with strict audit trails.',
    database: '# Ledger Schema\nTime-series ledger entries and snapshots.',
    api: '# Ledger APIs\n- GET /audit/reconcile\n- POST /ledger/entry',
    tasks: [
      { id: 't3_1', title: 'Immutable Logic', description: 'Ensure entries cannot be deleted.', status: 'todo' }
    ]
  }
];
