
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
    brd: '# Wallet System BRD\nLearn to build a robust virtual wallet with ACID transactions.',
    architecture: '# Wallet Architecture\nSystem design for high-concurrency balance updates.',
    database: '# Wallet Schema\nPostgreSQL tables for Accounts and Ledger entries.',
    api: '# Wallet APIs\n- POST /wallet/deposit\n- POST /wallet/withdraw',
    tasks: [
      { id: 't1', title: 'Setup Database', description: 'Implement migrations.', status: 'todo' }
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
      { id: 't2', title: 'Integrate Stripe SDK', description: 'Mock external provider.', status: 'todo' }
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
      { id: 't3', title: 'Immutable Logic', description: 'Ensure entries cannot be deleted.', status: 'todo' }
    ]
  }
];
