import Img from '@/components/img';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/axios';
import { formatRelativeTime } from '@/lib/date';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

export function ProjectsByGroup() {
  const { groupId } = useParams();

  // Get pages of user
  const { data: pagesData, isLoading: isLoadingPages } = useQuery({
    queryKey: ['userPages', groupId],
    queryFn: () => api.get(`/pages/group/${groupId}`).then((res) => res.data),
    staleTime: 2 * 60 * 1000, // 10 minutos cache
    gcTime: 4 * 60 * 1000, // 15 minutos cache
  });

  const handleOpenProject = (id: number) => {
    console.log('Open project', id);
  };

  return (
    <>
      <header className="bg-card sticky top-0 z-50 border-b">
        <div className="mx-auto flex h-[80px] items-center justify-between gap-6 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="[&_svg]:!size-5" />
            <Separator orientation="vertical" className="hidden !h-4 sm:block" />
            <Breadcrumb className="hidden sm:block">
              <BreadcrumbList className="flex">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/app">App</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Free</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-1.5">
            {/* <Button
              variant={'indigo'}
              className="flex items-center gap-2"
              onClick={() => handleCreateProject()}
            >
              <Plus className="-mt-1" /> Projeto
            </Button> */}
          </div>
        </div>
      </header>
      <div className="mx-auto size-full flex-1 px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-12 lg:gap-8 2xl:grid-cols-12">
          {/* Pages */}
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
                      <span className="!text-xs">
                        Editado há {formatRelativeTime(page.updatedAt)}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
