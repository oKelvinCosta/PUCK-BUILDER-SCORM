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

import Img from '@/components/img';
import { NavUser } from '@/components/nav-user';

const Home = () => {
  const handleCreateProject = () => {
    console.log('Create project');
  };

  const handleOpenProject = (id: number) => {
    console.log('Open project', id);
  };

  const handleOpenGroup = (id: number) => {
    console.log('Open group', id);
  };

  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
  };

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
                      <NavUser user={data.user} />
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
                    <SidebarMenuBadge className="rounded-full bg-primary/10">3</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b bg-card">
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
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="cursor-pointer md:col-span-4 2xl:col-span-3"
                  onClick={() => handleOpenProject(index)}
                >
                  <Card className="overflow-hidden p-0">
                    <CardHeader>
                      <Img
                        src="./imgs/core/placeholder.webp"
                        className="aspect-video !rounded-none"
                        alt=""
                      />
                    </CardHeader>

                    <CardFooter className="p-4">
                      <div className="flex flex-col gap-0">
                        <span className="!text-sm font-medium">EAD Builder</span>
                        <span className="!text-xs">Editado há 9 horas atrás</span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}

              {Array.from({ length: 1 }).map((_, index) => (
                <div
                  key={index}
                  className="cursor-pointer md:col-span-4 2xl:col-span-3"
                  onClick={() => handleOpenGroup(index)}
                >
                  <Card className="overflow-hidden p-0">
                    <CardContent className="grid grid-cols-4 gap-3 p-4">
                      <Img
                        src="./imgs/core/placeholder.webp"
                        className="col-span-2 aspect-video rounded-2xl"
                        alt=""
                      />
                      <Img
                        src="./imgs/core/placeholder.webp"
                        className="col-span-2 aspect-video rounded-2xl"
                        alt=""
                      />
                      <Img
                        src="./imgs/core/placeholder.webp"
                        className="col-span-2 aspect-video rounded-2xl"
                        alt=""
                      />
                      <Card className="col-span-2 aspect-video rounded-2xl" />
                    </CardContent>

                    <CardFooter className="p-4 pt-0">
                      <div className="flex flex-col gap-0">
                        <span className="!text-sm font-medium">Grupo de Estudos</span>
                        <span className="!text-xs">3 projetos</span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            {/* Grid End*/}
          </main>

          {/* Footer */}
          <footer>
            <div className="mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 text-muted-foreground max-sm:flex-col sm:gap-6 sm:px-6">
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

export { Home };
