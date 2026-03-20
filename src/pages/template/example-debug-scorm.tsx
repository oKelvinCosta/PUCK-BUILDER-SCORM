import CompleteScormButton from '@/components/complete-scorm-button';
import { Button } from '@/components/ui/button';
import { LESSON_STATUS, useScorm } from '@/contexts/scorm-context';

export default function ExampleDebugScorm() {
  if (import.meta.env.VITE_APP_WITHOUT_SCORM === 'true') {
    return (
      <>
        <p>O ambiente SCORM está desativado.</p>
        <p>Para habilitar o ambiente com SCORM, rode o comando no terminal:</p>
        <p>
          <b>npm run scorm-dev</b> ou <b>npm run scorm-prod</b>
        </p>
      </>
    );
  }

  const { scormSet, isScormInitialized } = useScorm();

  if (!isScormInitialized) {
    return <p>SCORM não foi inicializado</p>;
  }

  function handleConcludeScorm() {
    //@ts-expect-error - Testing an error intentionally
    scormSet('cmi.core.lesson_KELVIN', LESSON_STATUS.completed);
  }

  return (
    <div className="w-full">
      <h4>ExampleDebugScorm.tsx</h4>
      <p> After setup the SCORM Package in LMS, click the button and see the console log</p>

      <div className="flex gap-3">
        <Button onClick={handleConcludeScorm} variant="gray">
          Conclude wrong
        </Button>

        <CompleteScormButton text="Conclude right" />
      </div>
    </div>
  );
}
