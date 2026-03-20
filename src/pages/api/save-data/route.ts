import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();

    // Path to database.json file
    const dbPath = path.join(process.cwd(), 'database.json');
    
    // Write data to database.json
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ 
      success: true, 
      message: 'Data saved successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to save data' 
      },
      { status: 500 }
    );
  }
}
