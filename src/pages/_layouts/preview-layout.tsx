import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function PreviewLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Editor Header */}

      <div className="flex items-center justify-between bg-gray-900 px-6 py-3 shadow-md">
        <h2 className="!mb-0 text-sm font-semibold text-gray-400">Editor Preview Mode</h2>
        <Button className="flex items-center" variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft /> Voltar
        </Button>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
