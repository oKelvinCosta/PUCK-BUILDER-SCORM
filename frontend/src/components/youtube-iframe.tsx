interface YoutubeIframeProps {
  scrIframe: string;
  className?: string;
}

export default function YoutubeIframe({ scrIframe, className }: YoutubeIframeProps) {
  return (
    <iframe
      className={`aspect-video rounded-2xl ${className}`}
      src={scrIframe}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
