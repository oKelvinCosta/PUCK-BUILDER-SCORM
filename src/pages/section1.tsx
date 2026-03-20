import MainCard from '@/components/main-card';

export default function Section1() {
  return (
    <div className="container--780">
      <div className="text-center">
        <h2>Olá! </h2>
        <h4>Hoje vamos conversar sobre:</h4>
        <ul className="list-inside list-disc">
          <li>Principais tipos de empréstimos;</li>
          <li>Em que situações os empréstimos podem ser vantajoso.</li>
        </ul>
      </div>

      {/* Design 1: Grid with two cards about previous lesson */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <MainCard imgSrc="./imgs/sl03.jpg" textSize={18} variant="default">
          <p className="text-gray-700">
            Na aula anterior, vimos que fazer uma boa escolha depende de uma postura reflexiva.
          </p>
        </MainCard>
        <MainCard imgSrc="./imgs/sl04.jpg" textSize={18} variant="default">
          <p className="text-gray-700">
            Além de perceber que elas interferem muito na nossa vida e dependem muito do contexto
            analisado.
          </p>
        </MainCard>
      </div>

      {/* Design 2: Title "Você se lembra de Cláudio?" */}
      <div className="mt-10 text-center">
        <h4 className="text-coral-400">Você se lembra de Cláudio?</h4>
      </div>

      {/* Design 3: Grid with two cards about Cláudio's loan story */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <MainCard imgSrc="./imgs/sl05.jpg" textSize={18} variant="default">
          <p className="text-gray-700">
            Ele descobriu que mesmo pagando juros, o empréstimo era uma boa saída para ele.
          </p>
        </MainCard>
        <MainCard imgSrc="./imgs/sl06.jpg" textSize={18} variant="default">
          <p className="text-gray-700">
            Isso porque ele tinha mais a ganhar do que a perder com isso.
          </p>
        </MainCard>
      </div>
    </div>
  );
}
