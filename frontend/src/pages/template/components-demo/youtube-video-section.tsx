import ShowCode from '@/components/template/show-code';
import { Button } from '@/components/ui/button';
import YoutubeIframe from '@/components/youtube-iframe';
import { useMemo, useState } from 'react';

export default function YouTubeVideoSection() {
  const [videoSrc, setVideoSrc] = useState(
    'https://www.youtube.com/embed/SzFCcF0U-DU?si=8aN_R3_q3ukIv2Q8'
  );

  // 🧠 Dynamic snippet generator
  const snippet = useMemo(() => {
    return `
<YoutubeIframe scrIframe="${videoSrc}" />
    `.trim();
  }, [videoSrc]);

  return (
    <div className="space-y-6 border-b p-4">
      {/* === HEADER === */}
      <div className="flex justify-between">
        <p className="m-0 text-left">Used for embed iframe videos from YouTube</p>
        <ShowCode title="YouTube Video • snippet" code={snippet} />
      </div>

      {/* === CONTROLS === */}
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col">
          <label htmlFor="videoSrc" className="text-sm font-medium text-gray-700">
            YouTube Embed Iframe src:
          </label>
          <input
            id="videoSrc"
            type="text"
            value={videoSrc}
            onChange={(e) => setVideoSrc(e.target.value)}
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
            className="w-[400px] rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <Button
          variant="indigo"
          size="sm"
          onClick={() =>
            setVideoSrc('https://www.youtube.com/embed/SzFCcF0U-DU?si=8aN_R3_q3ukIv2Q8')
          }
        >
          Reset Example
        </Button>
      </div>

      {/* === PREVIEW === */}
      <div className="flex justify-center">
        <YoutubeIframe scrIframe={videoSrc} />
      </div>
    </div>
  );
}
