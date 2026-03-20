import Img from '@/components/img';
import MainCard from '@/components/main-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Section3() {
  return (
    <>
      <div className="container--780">
        {/* Design 1: Text about loan costs with image */}
        <div className="mt-10 flex flex-col items-center gap-10 md:flex-row">
          <div className="flex-1">
            <p className="whitespace-pre-line text-gray-700">
              É importante lembrar que toda a vez que se pega dinheiro emprestado ele tem um custo o
              juros!
            </p>
            <p>Veja o valor aproximado das taxas de juros de alguns tipos de empréstimos.</p>
          </div>
          <div className="flex-shrink-0">
            <Img src="./imgs/sl16.jpg" className="h-[208px] w-[178px] rounded-lg" alt="" />
          </div>
        </div>

        {/* Design 2: Interest rates list with coral title and image */}
        <div className="mt-10 flex flex-col items-center gap-6 md:flex-row">
          <div className="flex-shrink-0">
            <Img src="./imgs/sl17.jpg" className="h-[208px] w-[178px] rounded-lg" alt="" />
          </div>
          <div className="flex-1">
            <h4 className="mb-6 text-coral-400">
              Modalidade de crédito taxa de juros (Média anual)
            </h4>
            <ul className="list-inside list-disc space-y-1 text-gray-700">
              <li>Cheque especial – 318,7%;</li>
              <li>Rotativo do cartão de crédito – 300,3%;</li>
              <li>Parcelamento do cartão de crédito – 175,2%;</li>
              <li>Crédito pessoal – 119,5%;</li>
              <li>Crédito consignado – 22,5%;</li>
              <li>Empréstimo com garantia de veículo (Creditas) – 17,88%;</li>
              <li>Empréstimo com garantia de imóvel (Creditas) – 11,88%.</li>
            </ul>
          </div>
        </div>

        {/* Design 3: MainCard with 'Em ação!' activity */}
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
              <li>2. Com base no que foi estudado reflita sobre as questões:</li>
            </ol>
          </MainCard>
        </div>

        {/* Design 4: 'Diz aí!' section with questions */}
        <div className="mt-10 flex flex-col items-center gap-6 md:flex-row">
          <div className="flex-shrink-0 text-center">
            <h4 className="text-coral-400">Diz aí!</h4>
            <Img
              src="./imgs/sl12.jpg"
              className="mx-auto mb-2 h-[178px] w-[178px] rounded-full"
              alt=""
              isCircle
            />
          </div>
          <div className="flex-1">
            <Card className="h-[222px] rounded-2xl border-2 border-gray-200 p-6">
              <div className="whitespace-pre-line text-gray-700">
                <p className="font-semibold">Questão 1</p>
                <p>
                  Quais as modalidades de crédito que você percebe com maior possibilidade de ser
                  vantajoso?
                </p>
                <p>&nbsp;</p>
                <p className="font-semibold">Questão 2</p>
                <p>
                  Você conhece alguém que já vivenciou uma experiência ruim em utilizar o crédito
                  sem necessidade? Que conselho você daria a essa pessoa?
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Design 5: 'Saiba mais!' section with link */}
        <div className="mt-10 flex flex-col items-center gap-5 md:flex-row">
          <div className="flex-shrink-0">
            <Img
              src="./imgs/image.webp"
              className="h-[178px] w-[178px] rounded-full"
              alt=""
              isCircle
            />
          </div>
          <div className="flex-1">
            <h4 className="mb-6 text-2xl text-coral-400">Saiba mais!</h4>
            <p className="mb-6 text-gray-700">Consulte o histórico de juros no Brasil:</p>
            <Button asChild variant={'lime'}>
              <a href="https://www.bcb.gov.br/controleinflacao/historicotaxasjuros" target="_blank">
                Clique aqui!
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
