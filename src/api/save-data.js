import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
  try {
    const { data } = await request.json();

    // Path to database.json file
    const dbPath = path.join(process.cwd(), 'database.json');
    
    // Write data to database.json
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Data saved successfully',
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error saving data:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Failed to save data' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
