import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PORTFOLIO_CONFIG_PATH = path.join(process.cwd(), 'src/data/portfolio-config.json');

// GET - Load portfolio data
export async function GET() {
  try {
    const data = fs.readFileSync(PORTFOLIO_CONFIG_PATH, 'utf8');
    const portfolioData = JSON.parse(data);
    
    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error('Error reading portfolio config:', error);
    return NextResponse.json(
      { error: 'Failed to load portfolio data' },
      { status: 500 }
    );
  }
}

// POST - Save portfolio data
export async function POST(request: NextRequest) {
  try {
    const portfolioData = await request.json();
    
    // Validate the data structure (basic validation)
    if (!portfolioData.personal || !portfolioData.projects || !portfolioData.certificates) {
      return NextResponse.json(
        { error: 'Invalid portfolio data structure' },
        { status: 400 }
      );
    }

    // Create backup of current config
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(
      process.cwd(), 
      'src/data', 
      `portfolio-config-backup-${timestamp}.json`
    );
    
    try {
      const currentData = fs.readFileSync(PORTFOLIO_CONFIG_PATH, 'utf8');
      fs.writeFileSync(backupPath, currentData);
    } catch (backupError) {
      console.warn('Could not create backup:', backupError);
    }

    // Save the new data
    fs.writeFileSync(PORTFOLIO_CONFIG_PATH, JSON.stringify(portfolioData, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Portfolio data saved successfully',
      backup: backupPath 
    });
  } catch (error) {
    console.error('Error saving portfolio config:', error);
    return NextResponse.json(
      { error: 'Failed to save portfolio data' },
      { status: 500 }
    );
  }
}