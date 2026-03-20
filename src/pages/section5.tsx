import CompleteScormButton from '@/components/complete-scorm-button';

export default function Section5() {
  return (
    <div className="container--780 py-16 text-center text-white">
      <h3 className="text-lime-400">Nesta aula, conversamos sobre:</h3>
      <ul className="list-inside list-disc font-bold">
        Principais tipos de empréstimos; Em que situações os empréstimos podem ser vantajoso.
      </ul>
      <p>Hoje você conheceu algumas modalidades de crédito e como usá-las a seu favor.</p>

      <div className="mt-16">
        <CompleteScormButton size="lg" variant="lime" />
      </div>
    </div>
  );
}
