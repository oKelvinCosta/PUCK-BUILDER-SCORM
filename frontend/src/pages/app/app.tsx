import { ChartPieIcon, ChartSplineIcon, HashIcon, Plus, UsersIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

import Img from '@/components/img';
import { Skeleton } from '@/components/ui/skeleton';
import { NavUser } from '@/editor/components/nav-user';
import { formatRelativeTime } from '@/lib/date';
import { useState } from 'react';

const App = () => {
  const mockUser = {
    name: 'Kelvin costa',
    email: 'okelvincosta@gmail.com',
    avatar: 'https://avatars.githubusercontent.com/u/28162385?v=4',
  };
  const handleCreateProject = () => {
    console.log('Create project');
  };

  const handleOpenProject = (id: number) => {
    console.log('Open project', id);
  };

  const handleOpenGroup = (id: number) => {
    console.log('Open group', id);
  };

  const [userId, setUserId] = useState('69c9a51d260548585aa1fad8');

  // Get pages of user
  const { data: pagesData, isLoading: isLoadingPages } = useQuery({
    queryKey: ['userPages', userId],
    queryFn: () => api.get(`/pages?userId=${userId}`).then((res) => res.data),
    staleTime: 2 * 60 * 1000, // 10 minutos cache
    gcTime: 4 * 60 * 1000, // 15 minutos cache
  });

  // console.log('pagesData', pagesData);

  const useGroupsWithPages = () => {
    return useQuery({
      queryKey: ['groupsWithPages', userId],
      queryFn: () => api.get(`/groups/with-pages?userId=${userId}`).then((res) => res.data),
      staleTime: 5 * 60 * 1000,
      gcTime: 8 * 60 * 1000,
    });
  };

  const { data: groupsWithPages, isLoading: isLoadingGroupsWithPages } = useGroupsWithPages();

  console.log('groupsWithPages', groupsWithPages);

  return (
    <div className="flex min-h-dvh w-full">
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavUser user={mockUser} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <ChartSplineIcon />
                        <span>Content Performance</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <UsersIcon />
                        <span>Audience Insight</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <ChartPieIcon />
                        <span>Engagement Metrics</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <HashIcon />
                        <span>Hashtag Performance</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className="bg-primary/10 rounded-full">3</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="bg-card sticky top-0 z-50 border-b">
            <div className="mx-auto flex h-[80px] items-center justify-between gap-6 px-4 py-2 sm:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="[&_svg]:!size-5" />
                <Separator orientation="vertical" className="hidden !h-4 sm:block" />
                <Breadcrumb className="hidden sm:block">
                  <BreadcrumbList className="flex">
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Free</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant={'indigo'}
                  className="flex items-center gap-2"
                  onClick={() => handleCreateProject()}
                >
                  <Plus className="-mt-1" /> Projeto
                </Button>
              </div>
            </div>
          </header>

          {/* Main */}
          <main className="mx-auto size-full flex-1 px-4 py-6 sm:px-6">
            {/* Grid */}
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

              {/* Groups */}
              {isLoadingGroupsWithPages ? (
                <div className="cursor-pointer md:col-span-4 2xl:col-span-3">
                  <Card className="overflow-hidden p-0">
                    <CardContent className="grid grid-cols-4 gap-3 p-4">
                      <Skeleton className="col-span-2 aspect-video w-full rounded-2xl" />
                      <Skeleton className="col-span-2 aspect-video w-full rounded-2xl" />
                      <Skeleton className="col-span-2 aspect-video w-full rounded-2xl" />
                      <Card className="col-span-2 aspect-video rounded-2xl" />
                    </CardContent>

                    <CardFooter className="p-4 pt-0">
                      <Skeleton className="block h-4 w-full" />
                      <Skeleton className="block h-4 w-full" />
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                groupsWithPages?.map((group: any, index: number) => (
                  <div
                    key={index}
                    className="cursor-pointer md:col-span-4 2xl:col-span-3"
                    onClick={() => handleOpenGroup(group._id)}
                  >
                    <Card className="overflow-hidden p-0">
                      <CardContent className="grid grid-cols-4 gap-3 p-4">
                        {group.pages?.slice(0, 3).map((page: any, pageIndex: number) => (
                          <Img
                            key={pageIndex}
                            src={page.cover || './imgs/core/placeholder.webp'}
                            className="col-span-2 aspect-video rounded-2xl"
                            alt=""
                          />
                        ))}
                        {
                          // Fill empty slots to maintain grid structure
                          Array.from({
                            length: group.pages?.length < 4 ? 4 - group.pages?.length : 0,
                          }).map((_, emptyIndex) => (
                            <Card
                              key={`empty-${emptyIndex}`}
                              className="col-span-2 aspect-video rounded-2xl"
                            />
                          ))
                        }
                      </CardContent>

                      <CardFooter className="p-4 pt-0">
                        <div className="flex flex-col gap-0">
                          <span className="!text-sm font-medium">{group.name || 'Sem nome'}</span>
                          <span className="!text-xs">{group.pages?.length || 0} projetos</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                ))
              )}
            </div>
            {/* Grid End*/}
          </main>

          {/* Footer */}
          <footer>
            <div className="text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6">
              <p className="text-balance text-sm max-sm:text-center">
                {`©${new Date().getFullYear()}`}
                {` `}
                <a
                  href="https://github.com/oKelvinCosta"
                  className="text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kelvin Costa
                </a>
                , Made with ❤️ for better web design
              </p>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  );
};
export { App };
