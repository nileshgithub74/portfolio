import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Verify admin secret key for security
    const authHeader = request.headers.get('authorization');
    const adminSecret = process.env.ADMIN_SECRET_KEY;
    
    if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the updated data from request
    const data = await request.json();
    
    // Validate data structure
    if (!data.personal || !data.socialLinks || !data.projects || !data.certificates) {
      return NextResponse.json(
        { error: 'Invalid data structure' },
        { status: 400 }
      );
    }

    // Path to portfolio config file
    const configPath = path.join(process.cwd(), 'src', 'data', 'portfolio-config.json');
    
    // Create backup before updating
    const backupPath = path.join(process.cwd(), 'src', 'data', 'portfolio-config.backup.json');
    if (fs.existsSync(configPath)) {
      const currentData = fs.readFileSync(configPath, 'utf8');
      fs.writeFileSync(backupPath, currentData, 'utf8');
    }
    
    // Write new data
    fs.writeFileSync(configPath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({
      success: true,
      message: 'Portfolio data updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio data' },
      { status: 500 }
    );
  }
}

// GET endpoint to check if the API is working
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Portfolio update API is running',
    timestamp: new Date().toISOString()
  });
}
