import QuestionCheckbox from '@/components/question-checkbox';
import ShowCode from '@/components/template/show-code';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';

interface Option {
  text: string | React.ReactNode;
  value: string;
}

interface Question {
  id: number;
  enunciation: string | React.ReactNode;
  options: Option[];
  correctAnswers: string[]; // multiple correct answers for checkbox functionality
  successMessage: string | React.ReactNode;
  errorMessage: string | React.ReactNode;
}

export default function QuestionCheckboxSection() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      enunciation: 'Pergunta 1: Qual é a capital do Brasil?',
      options: [
        { text: 'Brasília', value: 'br' },
        { text: 'São Paulo', value: 'sp' },
        { text: 'Rio de Janeiro', value: 'rj' },
        { text: 'Belo Horizonte', value: 'bh' },
      ],
      correctAnswers: ['br'],
      successMessage: '🎉 Muito bem, você acertou!',
      errorMessage: '😵 Ops! Tente novamente.',
    },
    {
      id: 2,
      enunciation: 'Pergunta 2: Este componente funciona?',
      options: [
        { text: 'Sim', value: 'sim' },
        { text: 'Não', value: 'nao' },
      ],
      correctAnswers: ['sim'],
      successMessage: '🎉 Muito bem, você acertou!',
      errorMessage: '😵 Ops! Tente novamente.',
    },
  ]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        enunciation: `Nova Pergunta ${prev.length + 1}`,
        options: [
          { text: 'Opção A', value: 'a' },
          { text: 'Opção B', value: 'b' },
        ],
        correctAnswers: ['a'],
        successMessage: 'Resposta correta!',
        errorMessage: 'Tente novamente!',
      },
    ]);
  };

  const removeQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: number, key: keyof Question, value: unknown) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, [key]: value } : q)));
  };

  // Helper function to update correct answers array for checkbox functionality
  // This function allows multiple correct answers to be selected
  const updateCorrectAnswers = (id: number, value: string, isChecked: boolean) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;

        if (isChecked) {
          // Add the answer if not already present
          return {
            ...q,
            correctAnswers: q.correctAnswers.includes(value)
              ? q.correctAnswers
              : [...q.correctAnswers, value],
          };
        } else {
          // Remove the answer if present
          return {
            ...q,
            correctAnswers: q.correctAnswers.filter((answer) => answer !== value),
          };
        }
      })
    );
  };

  const updateOption = (qid: number, index: number, newText: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === index ? { ...opt, text: newText, value: newText.toLowerCase() } : opt
              ),
            }
          : q
      )
    );
  };

  const addOption = (qid: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: [
                ...q.options,
                {
                  text: `Opção ${String.fromCharCode(65 + q.options.length)}`,
                  value: `opt${q.options.length}`,
                },
              ],
            }
          : q
      )
    );
  };

  const removeOption = (qid: number, index: number) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qid) return q;

        const removedValue = q.options[index].value;
        const isCorrectAnswer = q.correctAnswers.includes(removedValue);

        // Remove the option and update correctAnswers array if needed
        return {
          ...q,
          options: q.options.filter((_, i) => i !== index),
          correctAnswers: isCorrectAnswer
            ? q.correctAnswers.filter((answer) => answer !== removedValue)
            : q.correctAnswers,
        };
      })
    );
  };

  const handleCommitOnEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
    }
  };

  // === SNIPPETS ===
  const questionsCode = useMemo(() => {
    const items = questions
      .map(
        (q) => `  {
    enunciation: '${q.enunciation}',
    options: [
${q.options.map((o) => `      { text: '${o.text}', value: '${o.value}' },`).join('\n')}
    ],
    correctAnswers: [${q.correctAnswers.map((a) => `'${a}'`).join(', ')}],
    successMessage: '${q.successMessage}',
    errorMessage: '${q.errorMessage}',
  },`
      )
      .join('\n');

    return `const Q = [\n${items}\n];`;
  }, [questions]);

  const jsxCode = `
<div className="flex flex-col gap-4">
  {Q.map((question, index) => (
    <QuestionCheckbox
      key={index}
      enunciation={question.enunciation}
      options={question.options}
      correctAnswers={question.correctAnswers}
      successMessage={question.successMessage}
      errorMessage={question.errorMessage}
    />
  ))}
</div>
`.trim();

  const fullSnippet = `
${questionsCode}

${jsxCode}
`.trim();

  return (
    <div className="border-b p-4">
      <Button variant="indigo" onClick={addQuestion} className="mb-6">
        + Add Question
      </Button>

      <div className="flex flex-col gap-10">
        {questions.map((q, idx) => (
          <div key={q.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">Question {idx + 1}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeQuestion(q.id)}
                disabled={questions.length === 1}
              >
                Remove
              </Button>
            </div>

            {/* ENUNCIATION */}
            <div
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              onBlur={(e) => updateQuestion(q.id, 'enunciation', e.currentTarget.textContent || '')}
              onKeyDown={handleCommitOnEnter}
              className="mb-4 cursor-text text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {q.enunciation}
            </div>

            {/* OPTIONS */}
            <div className="ml-2 flex flex-col gap-2">
              {q.options.map((opt, i) => {
                return (
                  <div key={i} className="flex items-center gap-2">
                    {/* CHECKBOX INDICATOR - allows multiple correct answers selection */}
                    <input
                      type="checkbox"
                      checked={q.correctAnswers.includes(opt.value)}
                      onChange={(e) => updateCorrectAnswers(q.id, opt.value, e.target.checked)}
                    />

                    <span
                      contentEditable
                      suppressContentEditableWarning
                      spellCheck={false}
                      onBlur={(e) => updateOption(q.id, i, e.currentTarget.textContent || '')}
                      onKeyDown={handleCommitOnEnter}
                      className="cursor-text outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                      {opt.text}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeOption(q.id, i)}
                      disabled={q.options.length <= 2}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}

              <Button
                variant="indigo"
                size="sm"
                className="mt-2 w-fit"
                onClick={() => addOption(q.id)}
              >
                + Add Option
              </Button>
            </div>

            {/* FEEDBACK MESSAGES */}
            <div className="mt-4 flex flex-col gap-2">
              <label className="text-muted-foreground text-sm font-medium">Success Message:</label>
              <Input
                value={String(q.successMessage || '')}
                onChange={(e) => updateQuestion(q.id, 'successMessage', e.target.value)}
              />

              <label className="text-muted-foreground text-sm font-medium">Error Message:</label>
              <Input
                value={String(q.errorMessage || '')}
                onChange={(e) => updateQuestion(q.id, 'errorMessage', e.target.value)}
              />
            </div>

            {/* PREVIEW - Shows the QuestionCheckbox component with multiple correct answers support */}
            <div className="mt-6 rounded-lg border bg-white p-4">
              <QuestionCheckbox
                key={q.id}
                enunciation={q.enunciation}
                options={q.options}
                correctAnswers={q.correctAnswers}
                successMessage={q.successMessage}
                errorMessage={q.errorMessage}
              />
            </div>
          </div>
        ))}
      </div>

      {/* SNIPPETS */}
      <div className="mt-12 flex flex-col gap-6">
        {/* CONST Q */}
        <div className="flex flex-col items-end gap-1">
          <span className="pr-1 text-xs text-gray-500">
            👉 Constante <strong>Q</strong> com as perguntas.
          </span>
          <ShowCode title="Questions Array (Q) • snippet" code={questionsCode} />
        </div>

        {/* COMPONENTE JSX */}
        <div className="flex flex-col items-end gap-1">
          <span className="pr-1 text-xs text-gray-500">
            👉 <strong>Componente JSX</strong> que renderiza as perguntas.
          </span>
          <ShowCode title="JSX Logic • snippet" code={jsxCode} />
        </div>

        {/* AMBOS */}
        <div className="flex flex-col items-end gap-1">
          <span className="pr-1 text-xs text-gray-500">
            👉 <strong>Q + JSX</strong>, o código completo para copiar e colar.
          </span>
          <ShowCode title="Full Snippet • Q + JSX" code={fullSnippet} />
        </div>
      </div>
    </div>
  );
}
