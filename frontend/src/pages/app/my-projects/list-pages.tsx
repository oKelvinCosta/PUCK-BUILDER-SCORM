import Img from '@/components/img';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/axios';
import { formatRelativeTime } from '@/lib/date';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function ListPages() {
  const [userId, setUserId] = useState('69c9a51d260548585aa1fad8');

  // Get ungrouped pages of user
  const { data: pagesData, isLoading: isLoadingPages } = useQuery({
    queryKey: ['ungroupedPages', userId],
    queryFn: () => api.get(`/pages/ungrouped?userId=${userId}`).then((res) => res.data),
    staleTime: 2 * 60 * 1000, // 10 minutos cache
    gcTime: 4 * 60 * 1000, // 15 minutos cache
  });

  const handleOpenProject = (id: number) => {
    console.log('Open project', id);
  };

  return (
    <>
      {isLoadingPages ? (
        <div className="md:col-span-4 2xl:col-span-3">
          <Card className="overflow-hidden p-0">
            <CardHeader>
              <Skeleton className="col-span-2 aspect-video w-full !rounded-none" />
            </CardHeader>

            <CardFooter className="p-4">
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-[80%]" /> {/* Agora funciona */}
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        pagesData?.map((page: any, index: number) => (
          <div
            key={page._id}
            className="cursor-pointer md:col-span-4 2xl:col-span-3"
            onClick={() => handleOpenProject(page._id)}
          >
            <Card className="overflow-hidden p-0">
              <CardHeader>
                <Img src={page.cover} className="aspect-video !rounded-none" alt="" />
              </CardHeader>

              <CardFooter className="p-4">
                <div className="flex flex-col gap-0">
                  <span className="!text-sm font-medium">{page.title || 'Sem título'}</span>
                  <span className="!text-xs">Editado há {formatRelativeTime(page.updatedAt)}</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))
      )}
    </>
  );
}
