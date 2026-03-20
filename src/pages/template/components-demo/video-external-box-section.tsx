import ShowCode from '@/components/show-code';
import { Button } from '@/components/ui/button';
import VideoBox from '@/components/video-external-box';
import { useMemo, useState } from 'react';

export default function VideoExternalBoxSection() {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=INn37LO4I1Y');
  const [imgSrc, setImgSrc] = useState('./imgs/core/placeholder.webp');

  // 🧠 Dynamic snippet generator
  const snippet = useMemo(() => {
    return `
<VideoBox
  videoUrl="${videoUrl}"
  imgSrc="${imgSrc}"
  className="max-w-[580px]"
  imgClassName="aspect-video"
/>
    `.trim();
  }, [videoUrl, imgSrc]);

  return (
    <div className="space-y-6 border-b p-4">
      {/* === HEADER === */}
      <div className="flex justify-end">
        <ShowCode title="Video Box • snippet" code={snippet} />
      </div>

      {/* === CONTROLS === */}
      <div className="flex flex-wrap items-end gap-6">
        {/* Video URL input */}
        <div className="flex flex-col">
          <label htmlFor="videoUrl" className="text-sm font-medium text-gray-700">
            Video URL
          </label>
          <input
            id="videoUrl"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-[400px] rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image URL input */}
        <div className="flex flex-col">
          <label htmlFor="imgSrc" className="text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            id="imgSrc"
            type="text"
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
            placeholder="./imgs/core/placeholder.webp"
            className="w-[400px] rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <Button
          variant="indigo"
          size="sm"
          onClick={() => {
            setVideoUrl('https://www.youtube.com/watch?v=INn37LO4I1Y');
            setImgSrc('./imgs/core/placeholder.webp');
          }}
        >
          Reset Example
        </Button>
      </div>

      {/* === PREVIEW === */}
      <div className="flex justify-center">
        <VideoBox
          videoUrl={videoUrl}
          imgSrc={imgSrc}
          className="w-full max-w-[580px]"
          imgClassName="aspect-video"
        />
      </div>
    </div>
  );
}
