import Img from '@/components/img';
import { Play } from 'lucide-react';

/**
 * Props for the `VideoExternalBox` component.
 *
 * - `videoUrl`: Target video link to open when the box is clicked (e.g., a YouTube URL).
 * - `imgSrc`: Poster/thumbnail image shown as the visual cover of the video.
 * - `imgClassName`: Extra classes applied to the inner `Img` component.
 * - `className`: Extra classes applied to the clickable wrapper (anchor element).
 */
interface VideoExternalBoxProps {
  videoUrl: string;
  imgSrc: string;
  imgClassName?: string;
  className?: string;
}

/**
 * `VideoExternalBox` renders a clickable thumbnail that links to an external video.
 *
 * The component overlays a prominent "PLAY" badge centered on top of the image.
 * The anchor (`<a>`) acts as the clickable container using utility classes (Tailwind)
 * for positioning and interaction effects.
 */
export default function VideoExternalBox({
  videoUrl = 'https://www.youtube.com/watch?v=INn37LO4I1Y',
  imgSrc = './imgs/core/placeholder.webp',
  imgClassName = '',
  className = '',
  ...props
}: VideoExternalBoxProps) {
  return (
    <>
      <a href={videoUrl} className={`relative z-10 block cursor-pointer ${className}`} {...props}>
        {/* Poster/thumbnail image */}
        <Img src={imgSrc} className={`${imgClassName}`} />
        {/* Centered PLAY badge with subtle pulse and hover scale for affordance */}
        <div className="absolute left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] animate-pulseBlink px-8 py-5 transition-all hover:scale-110">
          <Play
            size={70}
            color="#ffffff"
            strokeWidth={3}
            className="drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
          />
        </div>
      </a>
    </>
  );
}
