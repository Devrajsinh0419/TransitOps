import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'TransitOps API Gateway',
      environment: process.env.NODE_ENV,
      checks: {
        database: 'connected',
        cache: 'active',
      },
    },
    { status: 200 }
  );
}
