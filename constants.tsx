
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
    id: 'fin-1',
    title: 'Wallet System',
    description: 'Core digital wallet implementation allowing users to hold, deposit, and withdraw virtual currency.',
    sector: SectorType.FINTECH,
    difficulty: 'Beginner',
    brd: '# Wallet System BRD\nPlaceholder Business Requirement Document for the Wallet System.',
    architecture: '# Wallet System Architecture\nPlaceholder System Architecture for a simple Wallet System.',
    database: '# Wallet System Database\nPlaceholder Database Schema for Wallet users and balances.',
    api: '# Wallet System APIs\nPlaceholder REST API Endpoints for deposits and withdrawals.',
    tasks: [
      { id: 't1', title: 'User Account Setup', description: 'Create basic user and account model.', status: 'todo' },
      { id: 't2', title: 'Deposit Functionality', description: 'Implement basic balance increment logic.', status: 'todo' },
      { id: 't3', title: 'Withdrawal Logic', description: 'Implement balance checks and decrement logic.', status: 'todo' }
    ]
  },
  {
    id: 'fin-2',
    title: 'Payment Gateway',
    description: 'Integrate external providers and handle merchant transaction flows securely.',
    sector: SectorType.FINTECH,
    difficulty: 'Intermediate',
    brd: '# Payment Gateway BRD\nPlaceholder Business Requirement Document for the Payment Gateway.',
    architecture: '# Payment Gateway Architecture\nPlaceholder System Architecture for a secure Payment Gateway integration.',
    database: '# Payment Gateway Database\nPlaceholder Database Schema for transactions and merchant accounts.',
    api: '# Payment Gateway APIs\nPlaceholder API Endpoints for processing payments and webhooks.',
    tasks: [
      { id: 't4', title: 'Provider Integration', description: 'Set up mock API calls to external payment providers.', status: 'todo' },
      { id: 't5', title: 'Secure Checkout Flow', description: 'Implement tokenization for sensitive payment data.', status: 'todo' },
      { id: 't6', title: 'Webhook Listener', description: 'Handle asynchronous payment notifications.', status: 'todo' }
    ]
  },
  {
    id: 'fin-3',
    title: 'Ledger & Reconciliation',
    description: 'High-scale double-entry accounting system to ensure zero balance discrepancies.',
    sector: SectorType.FINTECH,
    difficulty: 'Advanced',
    brd: '# Ledger & Reconciliation BRD\nPlaceholder Business Requirement Document for an Advanced Ledger System.',
    architecture: '# Ledger & Reconciliation Architecture\nPlaceholder System Architecture for distributed double-entry accounting.',
    database: '# Ledger & Reconciliation Database\nPlaceholder Database Schema for Immutable Ledgers and Audit Trails.',
    api: '# Ledger & Reconciliation APIs\nPlaceholder API Endpoints for auditing and reconciliation reports.',
    tasks: [
      { id: 't7', title: 'Double-Entry Core', description: 'Design an immutable ledger system.', status: 'todo' },
      { id: 't8', title: 'Reconciliation Engine', description: 'Implement automated daily bank statement matching.', status: 'todo' },
      { id: 't9', title: 'Anomaly Detection', description: 'Build alerts for balance discrepancies.', status: 'todo' }
    ]
  }
];
