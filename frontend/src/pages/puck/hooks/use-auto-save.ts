import { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { usePageUpdater } from './use-page-updater';

/**
 * Hook to handle auto-save functionality with debounce
 * Manages pending data and timer for optimal performance
 * Also handles page close, tab close, and browser close scenarios
 */
export function useAutoSave() {
  const { updatePage } = usePageUpdater();
  const { pageId } = useParams();

  // Refs for managing pending changes and auto-save timer
  const pendingData = useRef<object | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Auto-save handler with 1.5s debounce
  const handleAutoSave = useCallback(
    (data: object) => {
      // Cancel previous save attempt
      clearTimeout(timerRef.current);

      // Schedule new save
      timerRef.current = setTimeout(() => {
        pendingData.current = data;
        console.log('Auto-saving:', pendingData.current);
        updatePage.mutate({ puckData: { page: pendingData.current } });
      }, 1500);
    },
    [updatePage]
  );

  // Setup beforeunload listener for page/tab/browser close protection
  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     if (pendingData.current) {
  //       console.log('🔄 Saving on page close:', pendingData.current);

  //       // Prepare data for sendBeacon
  //       const data = JSON.stringify({ puckData: { page: pendingData.current } });

  //       // Use sendBeacon for reliable delivery during page unload
  //       if (navigator.sendBeacon && pageId) {
  //         console.log('✅ sendBeacon available - sending data');
  //         navigator.sendBeacon(`/pages/${pageId}`, data);
  //         console.log('📤 Data sent via beacon successfully');
  //       } else {
  //         console.log('❌ sendBeacon not available or pageId missing');
  //       }

  //       // Show warning to user
  //       event.preventDefault();
  //       event.returnValue = 'Você tem alterações não salvas. Deseja sair?';
  //       console.log('⚠️ Warning shown to user');
  //     } else {
  //       console.log('✅ No pending data - safe to close');
  //     }
  //   };

  //   console.log('🔧 Adding beforeunload listener');
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   // Cleanup: save pending data on component unmount AND remove listener
  //   return () => {
  //     console.log('🧹 Removing beforeunload listener and cleaning up');
  //     window.removeEventListener('beforeunload', handleBeforeUnload);

  //     // Save pending changes when component unmounts (navigation away)
  //     if (pendingData.current) {
  //       clearTimeout(timerRef.current);
  //       console.log('💾 Saving pending changes on component unmount:', pendingData.current);
  //       updatePage.mutate({ puckData: { page: pendingData.current } });
  //     } else {
  //       console.log('✅ No pending data to save on unmount');
  //     }
  //   };
  // }, [pageId, updatePage]);

  return {
    handleAutoSave,
    pendingData,
  };
}

// 📊 Cenários Protegidos:
// Ação	Como é Protegido
// Navegar para outra página	useEffect cleanup do hook
// Fechar aba	beforeunload + sendBeacon
// Fechar browser	beforeunload + sendBeacon
// Recarregar página (F5)	beforeunload + sendBeacon
// Digitação normal	handleAutoSave com debounce
