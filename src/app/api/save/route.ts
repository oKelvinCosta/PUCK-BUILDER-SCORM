import { writeFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Save to database.json
    const filePath = join(process.cwd(), 'database.json');
    writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return Response.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    return Response.json({ success: false, error: 'Failed to save data' }, { status: 500 });
  }
}
