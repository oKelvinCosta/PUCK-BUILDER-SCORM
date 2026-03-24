import { config } from '@/puck/puck.config';
import { Render } from '@puckeditor/core';
import '@root/src/styles/global.css';

import database from '@root/database.json';

// Describe initial data
const initialData = database;

export function Page() {
  return <Render config={config} data={initialData} />;
}
