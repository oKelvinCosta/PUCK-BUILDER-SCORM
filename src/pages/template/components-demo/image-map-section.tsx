import ShowCode from '@/components/show-code';
import ImageMapDialog from '@/components/image-map-dialog';

const IMAGE_MAP_SNIPPET = `
import ImageMapDialog from '@/components/image-map-dialog';

        <ImageMapDialog
          imgSrc="./imgs/core/placeholder.webp"
          imgClassName="w-full max-w-[580px] rounded-md"
          items={[
            {
              position: 'top-[12%] left-[47%]',
              title: 'Feature 1',
              content: () => (
                <div>
                  <p>
                    Mussum Ipsum, cacilds vidis litro abertis. 
                  </p>
                </div>
              ),
            },
            {
              position: 'top-[25%] left-[30%]',
              title: 'Feature 2',
              content: () => (
                <div>
                  <p>
                    Mussum Ipsum, cacilds vidis litro abertis. 
                  </p>
                </div>
              ),
            },
          ]}
        />
`.trim();

export default function ImageMapSection() {
  return (
    <div className="border-b p-4">
      {/* ShowCode button (top-right) */}
      <div className="mb-2 flex justify-end">
        <ShowCode title="Image Map • snippet" code={IMAGE_MAP_SNIPPET} />
      </div>

      {/* Original content */}
      <div className="flex gap-4">
        <ImageMapDialog
          imgSrc="./imgs/core/placeholder.webp"
          imgClassName="w-full max-w-[580px] rounded-md"
          items={[
            {
              position: 'top-[12%] left-[47%]',
              title: 'Feature 1',
              content: () => (
                <div>
                  <p>
                    Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent
                    lacinia ultrices consectetur. Sed non ipsum felis. Atirei o pau no gatis, per
                    gatis num morreus. Per aumento de cachacis, eu reclamis. Eu nunca mais boto a
                    boca num copo de cachaça, agora eu só uso canudis!
                  </p>
                  <p>
                    Detraxit consequat et quo num tendi nada. Diuretics paradis num copo é motivis
                    de denguis. Cevadis im ampola pa arma uma pindureta. Quem manda na minha terra
                    sou euzis!
                  </p>
                </div>
              ),
            },
            {
              position: 'top-[25%] left-[30%]',
              title: 'Feature 2',
              content: () => (
                <div>
                  <p>
                    Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent
                    lacinia ultrices consectetur. Sed non ipsum felis. Atirei o pau no gatis, per
                    gatis num morreus. Per aumento de cachacis, eu reclamis. Eu nunca mais boto a
                    boca num copo de cachaça, agora eu só uso canudis!
                  </p>
                  <p>
                    Detraxit consequat et quo num tendi nada. Diuretics paradis num copo é motivis
                    de denguis. Cevadis im ampola pa arma uma pindureta. Quem manda na minha terra
                    sou euzis!
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
