import AccordionContained from '@/components/accordion-contained';
import Img from '@/components/img';
import MainCard from '@/components/main-card';
import YoutubeIframe from '@/components/youtube-iframe';

export default function Section2() {
  return (
    <div className="container--780">
      {/* Design 1: Title with lime color and circular image */}
      <div className="relative mt-10 text-center">
        <Img
          src="./imgs/sl07.jpg"
          className="mx-auto mb-6 max-w-[178px] rounded-full"
          alt=""
          isCircle
        />
        <h4 className="mx-auto max-w-[778px] text-lime-400">
          Mas afinal, quando vale a pena fazer um empréstimo?
        </h4>
      </div>

      {/* Design 2: Subtitle */}
      <div className="mt-10 text-center">
        <p className="text-gray-50">Quando vale a pena fazer um empréstimo?</p>
      </div>

      <YoutubeIframe scrIframe="https://www.youtube.com/embed/GATSpNBJTQQ?si=Xslb1JJXFcCieLbg" />

      {/* Design 3: Card grid with 3 cards about loan advantages */}
      <div className="mt-10 rounded-2xl border-2 border-gray-200 bg-white p-5 text-left">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <Img src="./imgs/sl09.jpg" className="h-[182px] w-full rounded-md" alt="" />
            <p className="mt-4 text-gray-700">
              Para quitar dívidas: Se a taxa de juros do empréstimo for menor que a de juros, o
              empréstimo será uma boa alternativa.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Img src="./imgs/sl09b.jpg" className="h-[182px] w-full rounded-md" alt="" />
            <p className="mt-4 text-gray-700">
              Quando há oportunidade de compras ou investimento: Em situações que permite adquirir
              um bem que lhe trará vantagem financeira.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Img src="./imgs/sl09c.jpg" className="h-[182px] w-full rounded-md" alt="" />
            <p className="mt-4 text-gray-700">
              Sempre há vantagem: Em situações em que a vantagem financeira for maior que os juros
              pagos.
            </p>
          </div>
        </div>
      </div>

      {/* Design 4: Grid with circular image and text about loans */}
      <div className="mt-10 flex flex-col items-center gap-6 md:flex-row">
        <div className="flex-shrink-0">
          <Img src="./imgs/sl10.jpg" className="h-[178px] w-[178px] rounded-full" isCircle alt="" />
        </div>
        <div className="text-white">
          <p>
            Nem sempre os empréstimos são vilões, muitas vezes, ele pode nos ajudar a alcançar
            nossos objetivos financeiros. Vamos conhecer, agora, alguns tipos de empréstimos:
          </p>
        </div>
      </div>

      {/* Design 5: Accordion with loan types */}
      <div className="mt-10">
        <AccordionContained
          items={[
            {
              title: 'Crédito pessoal',
              content: (
                <div className="flex items-center gap-6">
                  <Img src="./imgs/sl11.jpg" className="h-[152px] w-[151px] rounded-lg" alt="" />
                  <p>
                    É um tipo de crédito que as instituições financeiras oferecem e o tomador não
                    precisa justificar onde irá utilizá-lo, fazendo da maneira que preferir.
                  </p>
                </div>
              ),
            },
            {
              title: 'Empréstimo consignado',
              content: (
                <div className="flex items-center gap-6">
                  <Img src="./imgs/sl12.jpg" className="h-[152px] w-[151px] rounded-lg" alt="" />
                  <p>
                    É um tipo de crédito em que a instituição financeira desconta diretamente da
                    folha de pagamentos do tomador, por isso possuem juros mais baixos e pode ser
                    usado da maneira que ele preferir.
                  </p>
                </div>
              ),
            },
            {
              title: 'Financiamentos',
              content: (
                <div className="flex items-center gap-6">
                  <Img src="./imgs/sl13.jpg" className="h-[152px] w-[151px] rounded-lg" alt="" />
                  <p>
                    É um tipo de crédito em que a instituição financeira concede para compra de um
                    bem específico que servirá de garantia para a transação financeira.
                  </p>
                </div>
              ),
            },
            {
              title: 'Crédito estudantil',
              content: (
                <div className="flex items-center gap-6">
                  <Img src="./imgs/sl14.jpg" className="h-[152px] w-[151px] rounded-lg" alt="" />
                  <p className="text-gray-700">
                    É um tipo de crédito em que a instituição financeira concede para custear a
                    universidade ou uma formação específica.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Design 6: MainCard with 'Em ação!' activity */}
      <div className="mt-10">
        <MainCard
          imgSrc="./imgs/sl23.jpg"
          textSize={18}
          variant="default"
          horizontal={true}
          side="left"
        >
          <h4 className="text-coral-400">Em ação!</h4>
          <ol className="text-gray-700">
            <li>
              1. Sua família já tomou algum tipo de empréstimo? Se sim, reflita se ele foi uma boa
              escolha com base no que estudamos.
            </li>
          </ol>
        </MainCard>
      </div>
    </div>
  );
}
