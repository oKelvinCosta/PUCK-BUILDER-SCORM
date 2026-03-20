import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react';

export default function ProgressBarCourse() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollProgress(scrolled);
  };

  useEffect(() => {
    // Código a ser executado quando o componente é montado ou atualizado
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Código de limpeza a ser executado quando o componente é desmontado ou antes de ser atualizado
      window.removeEventListener('scroll', handleScroll);
    };
    // Um array de dependências que determina quando o efeito deve ser reexecutado. Se o array estiver vazio ([]), o efeito será executado apenas uma vez, quando o componente for montado.
  }, []);

  return (
    <>
      <Progress value={scrollProgress} className="fixed bottom-0 z-30 rounded-none" />
    </>
  );
}
