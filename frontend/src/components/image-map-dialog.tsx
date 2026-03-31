import type { ReactNode, ComponentProps } from 'react';
import { X } from 'lucide-react';
import Img from '@/components/img';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

// ==========================
// Types & Interfaces (TS)
// ==========================

/**
 * Describes a single interactive point ("marker") positioned over the image.
 * - position: Tailwind classes used to absolutely position the marker relative to the image container.
 * - title: Shown in the dialog header when the marker is opened.
 * - content: Either a ReactNode or a function returning a ReactNode (useful when you want to compute content on open).
 */
export interface MapItem {
  position: string;
  title: string;
  content: ReactNode | (() => ReactNode);
}

/**
 * We infer the allowed props for the dialog content (from the UI library) so we can safely forward them via modalProps.
 */
type DialogContentProps = ComponentProps<typeof DialogContent>;

/**
 * Props for the main ImageMapDialog component.
 */
export interface ImageMapDialogProps {
  imgSrc?: string;
  imgClassName?: string;
  items?: MapItem[];
  triggerClassName?: string;
  modalProps?: Partial<DialogContentProps>;
}

/**
 * Props for a single MapMarker instance.
 */
interface MapMarkerProps {
  item: MapItem;
  triggerClassName?: string;
  modalProps?: Partial<DialogContentProps>;
}

/**
 * ImageMapDialog
 *
 * Renders an image and a collection of interactive markers. Each marker opens a modal dialog
 * showing the content associated with that marker.
 *
 * Usage example:
 *
 * <ImageMapDialog
 *   imgSrc="./imgs/core/placeholder.webp"
 *   imgClassName="w-full max-w-[580px] rounded-md"
 *   items={[{
 *     position: 'top-[12%] left-[47%]',
 *     title: 'Feature 1',
 *     content: () => (<div>...</div>),
 *   }]}
 * />
 */
const ImageMapDialog = ({
  imgSrc = './imgs/core/placeholder.png',
  imgClassName = '',
  items = [],
  triggerClassName = '',
  modalProps = {},
}: ImageMapDialogProps) => {
  return (
    // The wrapper gets `relative` so our absolutely-positioned markers are placed correctly.
    <div className={`relative ${imgClassName}`}>
      {/* Background Image */}
      <Img
        src={imgSrc}
        className={imgClassName}
        alt="Interactive map with clickable markers"
        aria-hidden="true"
      />

      {/* Render every configured marker */}
      {items.map((item, index) => (
        <MapMarker
          key={`marker-${index}`}
          item={item}
          triggerClassName={triggerClassName}
          modalProps={modalProps}
        />
      ))}
    </div>
  );
};

/**
 * MapMarker
 *
 * Renders a clickable point over the image that opens a dialog with a header and body.
 * We keep it focused on accessibility by providing ARIA labels and keyboard-focus styles.
 */
const MapMarker = ({ item, triggerClassName = '', modalProps = {} }: MapMarkerProps) => {
  return (
    <Dialog>
      {/* Marker trigger button */}
      <DialogTrigger
        className={`absolute h-6 w-6 animate-pulseShadow rounded-full border-2 border-slate-50 bg-slate-300/80 bg-[radial-gradient(hsla(213.8,_100%,_96.9%,_0%),_hsla(211.7,_96.4%,_78.4%,_100%)_70%)] opacity-90 transition-all hover:scale-110 hover:bg-slate-300 hover:bg-[radial-gradient(hsla(213.3,_96.9%,_87.3%,_40%),_hsla(213.1,_93.9%,_67.8%,_100%)_70%)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${item.position} ${triggerClassName}`}
        aria-label={`Ver detalhes de ${item.title || 'marcador'}`}
      >
        <span className="sr-only">Ver {item.title || 'detalhes'}</span>
      </DialogTrigger>

      {/* Dialog content (modal) */}
      <DialogContent className="gap-0 !rounded-sm border-gray-800 pr-3" {...modalProps}>
        {/* Header area with title and close button */}
        <DialogHeader className="rounded-md">
          <div className="flex items-center justify-between text-base text-gray-500">
            <span>{item.title}</span>
            <DialogClose
              className="aspect-square border-0 px-2 py-0 text-gray-500 hover:bg-transparent"
              aria-label="Fechar"
            >
              <X className="h-5 w-5 scale-125" />
            </DialogClose>
          </div>
        </DialogHeader>

        {/* Body area: accept content both as a node or a function returning a node */}
        <DialogDescription
          className="small-scrollbar !mt-4 max-h-[70vh] overflow-y-auto pr-2 text-foreground [&_p]:text-[0.9rem] [&_p]:leading-[155%]"
          tabIndex={0}
        >
          {typeof item.content === 'function' ? item.content() : item.content}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

// Add display names for better debugging in React DevTools
ImageMapDialog.displayName = 'ImageMapDialog';
MapMarker.displayName = 'MapMarker';

export default ImageMapDialog;
export { MapMarker };
