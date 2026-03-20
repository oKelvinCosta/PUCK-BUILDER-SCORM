import { Render } from '@puckeditor/core';
import { config } from '@root/puck.config';
import '@root/src/styles/global.css';

export function Page() {
  return <Render config={config} data={{}} />;
}
