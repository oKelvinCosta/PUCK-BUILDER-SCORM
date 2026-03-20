import AccordionContained from '@/components/accordion-contained';
import Img from '@/components/img';
import MainCard from '@/components/main-card';
import Tabs from '@/components/tab-content';
import { Alert } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import YoutubeIframe from '@/components/youtube-iframe';

export default function Section6() {
  const tabItems = [
    {
      label: 'Storyboard',
      content: (
        <p className="col-span-12">
          Faça um storyboard, mesmo se for apenas um rascunho. Ele vai te ajudar a visualizar as
          cenas.
        </p>
      ),
    },
    {
      label: 'Personagens',
      content: (
        <p className="col-span-12">
          Defina seus personagens. Quem são e quais são as suas características.
        </p>
      ),
    },
    {
      label: 'Figurino',
      content: <p className="col-span-12">Defina o figurino. Lembre-se de usar o que você tem.</p>,
    },
    {
      label: 'Atores',
      content: (
        <p className="col-span-12">
          Escolha os atores. Se você for fazer uma animação, desenhe os personagens. Faça dedoches,
          fantoches.
        </p>
      ),
    },
    {
      label: 'Lugar',
      content: (
        <p className="col-span-12">
          Escolha o lugar. Não seja vago. Se for um cantinho da sala, defina qual cantinho da sala,
          beleza?
        </p>
      ),
    },
    {
      label: 'Iluminação',
      content: (
        <p className="col-span-12">
          O que você decidiu? Vai usar luz natural ou artificial? Quem sabe as duas…
        </p>
      ),
    },
    {
      label: 'Efeitos',
      content: <p className="col-span-12">Você vai usar algum tipo de efeito?</p>,
    },
    {
      label: 'Equipamentos',
      content: <p className="col-span-12">Mais uma vez, use o que você tem.</p>,
    },
  ];
  return (
    <>
      <div className="container--780">
        <h3 className="text-center">
          Agora vamos pensar na programação <br /> para a filmagem
        </h3>
        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <p>
              Tão importante quanto fazer é saber como fazer. E pra isso é preciso planejamento.
              Planejar faz com que não percamos tempo e não tenhamos tanto desgaste.
            </p>
          </div>
          <div className="md:col-span-6">
            <Img src="./imgs/sl15.jpg" className="rounded-2xl" alt="" />
          </div>
        </div>
        {/* Grid End*/}

        <div className="mt-10 text-center">
          <h4>Veja esse vídeo</h4>
          <YoutubeIframe scrIframe="https://www.youtube.com/embed/rBu9PY678i8?si=nA9gT1xBPX1l-cbC" />
        </div>

        <MainCard
          className="mt-10"
          title="O personagem do filme tinha uma meta."
          imgSrc="./imgs/sl17.jpg"
          horizontal
        >
          <p>Mas ele não tinha um plano!</p>
        </MainCard>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <h4>Agora veja esse</h4>
          </div>
          <div className="md:col-span-6">
            <YoutubeIframe scrIframe="https://www.youtube.com/embed/M6ZjMWLqJvM?si=A5cveGSZHZODXWjd" />
          </div>
        </div>
        {/* Grid End*/}

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <Img src="./imgs/sl20.jpg" className="mb-6 rounded-2xl" alt="" />
            <p>
              Para nós, já que estamos falando sobre planejamento, é importante perceber que, às
              vezes, as coisas podem não acontecer como planejado. E aí, precisaremos saber
              improvisar. Saber olhar as coisas de uma outra forma.
            </p>
            <p>
              <b>
                Planejar e , eventualmente, precisar improvisar é diferente de não planejar e
                improvisar tudo.
              </b>
            </p>
          </div>
          <div className="md:col-span-6">
            <Img src="./imgs/sl21.jpg" className="mb-6 rounded-2xl" alt="" />
            <p>
              Lápis e papel na mão e vamos planejar! Uma dica importante: Trabalhe com o que você
              tem. Se você precisa de um Titanic ele não cabe na sua sala, não se desespere. Faça
              uma miniatura com massinha de modelar!
            </p>
          </div>
        </div>
        {/* Grid End*/}
      </div>
      <div className="container rounded-2xl bg-azure-400 p-16">
        <Card>
          <Tabs tabs={tabItems} contentClassName="h-20" />
        </Card>
      </div>
      <div className="container--780 pt-16">
        <div className="text-center">
          <h3>Para finalizar</h3>
          <h4>Um lindo curta que fala sobre aceitação, autoconfiança e amor. Emocionante.</h4>
          <YoutubeIframe scrIframe="https://www.youtube.com/embed/AgWZtqHAmJM?si=UHbi73kznByxABRT" />
          <Alert className="mt-10" variant="indigo" size="lg" weight="bold">
            E aí? Curtiu?
          </Alert>
          <p>Então bora produzir a sua obra de arte!!! Até a próxima!!!</p>
          <h3 className="mt-10">Autoavaliação</h3>
        </div>
        <AccordionContained
          items={[
            {
              title: '1.',
              content: 'Você conseguiu produzir o roteiro?',
            },
            {
              title: '2.',
              content:
                'Você conseguiu colocar em prática o que estudamos nas aulas anteriores e planejar o seu curta?',
            },
          ]}
        />
      </div>
    </>
  );
}
