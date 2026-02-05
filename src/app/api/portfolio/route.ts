import { NextResponse } from 'next/server';
import { getPortfolioData } from '@/lib/portfolioData';

export async function GET() {
  try {
    const data = getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to load portfolio data' },
      { status: 500 }
    );
  }
}
