import { PipwerksDebug, SCORMAPI } from './pipwerks-scorm-api-wrapper';

declare global {
  interface Window {
    pipwerks: {
      SCORM: SCORMAPI;
      debug?: PipwerksDebug;
    };
  }
}

export {}; // This file needs to be a module
