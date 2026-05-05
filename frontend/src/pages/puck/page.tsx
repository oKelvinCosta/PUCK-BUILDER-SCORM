import { config } from '@/editor/puck.config';
import { Render, type Data } from '@puckeditor/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';

/**
 * Page component that renders static Puck data.
 * The React Compiler automatically handles memoization for this component and its values.
 */
export function Page() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // React Compiler automatically memoizes this evaluation
  const puckConfig = config({ projectType: 'choices' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('./puck-data.json');
        setData(response.data);
      } catch (err) {
        console.error('Erro ao carregar puck-data.json:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Spinner className="size-8" />
        <span className="ml-2 font-medium text-gray-600">Carregando conteúdo...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-red-500 bg-white">
        <h2 className="text-xl font-bold">Erro ao carregar o conteúdo</h2>
        <p className="mt-2 text-gray-600">O arquivo puck-data.json não foi encontrado ou está corrompido.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <Render config={puckConfig} data={data} />
    </div>
  );
}
