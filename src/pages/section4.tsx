import CarouselCard from '@/components/carousel-card';
import Img from '@/components/img';
import MainCard from '@/components/main-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Section4() {
  const itemsCarouselCard = [
    {
      imgSrc: './imgs/sl15.jpg',
      title: '',
      content: 'A resposta é depende! Vamos entender?',
    },
    {
      imgSrc: './imgs/sl16.jpg',
      title: '',
      content: 'A questão é refletir se ela trará retorno financeiro ou apenas gastos.',
    },
    {
      imgSrc: './imgs/sl17.jpg',
      title: '',
      content:
        'Se ele a alugar e receber pelo aluguel um valor maior que ela traz de manutenção, ela será um ativo.',
    },
    {
      imgSrc: './imgs/sl18.jpg',
      title: '',
      content: 'Mas, se ele a adquiriu para ter mais conforto, ela será um passivo.',
    },
  ];
  return (
    <>
      <div className="container--780">
        {/* Design 1: Lime centered heading about Pedro's house */}
        <div className="mb-8 text-center">
          <h2 className="text-[24px] font-semibold leading-7 text-lime-400">
            Pedro comprou uma casa, será que ela é uma ativo ou um passivo financeiro?
          </h2>
        </div>

        <div className="my-10">
          <CarouselCard items={itemsCarouselCard} layout="1:1" />
        </div>

        {/* Design 2: MainCard with horizontal layout and action content */}
        <div className="mb-8">
          <MainCard
            imgSrc="./imgs/sl23.jpg"
            title="Em ação!"
            horizontal={true}
            textSize={18}
            variant="default"
          >
            <p className="text-base leading-5 text-gray-700">
              Agora que você viu esse exemplo, volte ao item anterior e verifique se os ativos e
              passivos que você tinha listado estão corretos.
            </p>
          </MainCard>
        </div>

        {/* Design 3: Grid layout with text and image about acquiring passives */}
        <div className="mb-8 grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          <div className="text-white md:col-span-8">
            <p className="font-semibold leading-7 text-lime-400">Eu devo adquirir passivos?</p>
            <p className="leading-6">
              Os passivos podem sim ser adquiridos, desde que você já possua ativos suficientes para
              mantê-los!
            </p>
          </div>
          <div className="flex justify-center md:col-span-4">
            <Img src="./imgs/sl20.jpg" className="rounded-2xl" alt="" />
          </div>
        </div>

        {/* Design 4: Card grid with 3 columns about financial assets */}
        <Card>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col items-center gap-4">
              <Img src="./imgs/sl21.jpg" className="h-[182px]" alt="" />
              <div className="flex w-min min-w-full shrink-0 flex-col justify-center text-lg text-indigo-500">
                <p className="font-semibold leading-6">Vamos conhecer alguns ativos financeiros?</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center gap-4">
              <Img src="./imgs/sl22.jpg" className="h-[182px]" alt="" />
              <div className="flex w-min min-w-full shrink-0 flex-col justify-center text-lg text-indigo-500">
                <p className="font-semibold leading-6">Ativos de renda fixa</p>
              </div>
              <div className="flex w-min min-w-full shrink-0 flex-col justify-center text-base text-gray-700">
                <p className="leading-6">
                  É o tipo de investimento mais seguro no mercado, por isso apresenta o menor
                  rendimento.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center gap-4">
              <Img src="./imgs/sl22b.jpg" className="h-[182px]" alt="" />
              <div className="flex w-min min-w-full shrink-0 flex-col justify-center text-lg text-indigo-500">
                <p className="font-semibold leading-6">Ativos de renda variável</p>
              </div>
              <div className="flex w-min min-w-full shrink-0 flex-col justify-center text-base text-gray-700">
                <p className="leading-6">
                  Tem seu rendimento variável. Isso exige do investidor muita atenção e
                  conhecimento. Além disso, seus ganhos podem ser maiores.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Design 5: Circular image with 'Saiba mais!' content and link */}
        <div className="mb-8 mt-10 grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          <div className="flex justify-center md:col-span-4">
            <div className="relative size-[178px] shrink-0 rounded-[118px]">
              <Img
                src="./imgs/image.webp"
                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[118px] object-cover"
                alt=""
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-col gap-4">
              <div className="text-[24px] font-semibold leading-7 text-lime-400">Saiba mais!</div>
              <div className="text-lg leading-6 text-gray-50">Conheça mais sobre ativos em:</div>
              <div className="mt-4">
                <Button variant="lime" asChild>
                  <a
                    href="https://vangardi.com.br/ativos-financeiros/#Quais_os_principais_tipos_de_ativos_financeiros"
                    target="_blank"
                  >
                    Clique aqui!
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Design 6: Summary text with image about learning assets vs passives */}
        <div className="mb-8 grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex w-full shrink-0 flex-col justify-center text-lg text-gray-50">
              <p className="leading-6">
                Nesta choice, você aprendeu a diferenciar ativos financeiro de passivos financeiros.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:col-span-4">
            <div className="relative h-[258px] w-[276px] shrink-0 rounded-lg">
              <Img
                src="./imgs/sl24.webp"
                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-lg object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
