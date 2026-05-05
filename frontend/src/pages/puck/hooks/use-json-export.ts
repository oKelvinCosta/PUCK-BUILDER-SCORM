import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export function useJsonExport() {
  const mutation = useMutation({
    mutationFn: async (data: unknown) => {
      const response = await api.post(`/export/puck-data`, data, {
        responseType: 'blob',
      });
      return response;
    },
    onSuccess: (response) => {
      const data = response.data;
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'SCORM_package.zip';

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch && fileNameMatch.length > 1) {
          fileName = fileNameMatch[1];
        }
      }

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.info(`SCORM ${fileName} baixado com sucesso!`);
    },
    onError: (error) => {
      console.error('Erro ao baixar SCORM:', error);
      alert('Erro ao baixar SCORM. Verifique o console.');
    },
  });

  return {
    saveJsonFile: mutation.mutateAsync,
    isExporting: mutation.isPending,
  };
}
