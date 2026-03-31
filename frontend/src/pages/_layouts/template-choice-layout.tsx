import { AppSidebar } from '@/components/template/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

export default function TemplateLayout() {
  return (
    <SidebarProvider>
      {/* Left sidebar */}
      <AppSidebar />

      {/* Main area that shifts with sidebar */}
      <SidebarInset>
        {/* 🔹 Header */}
        <header className="grid h-14 grid-cols-[1fr_auto_1fr] items-center border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-4" />
          </div>

          <h1 className="m-0 justify-self-center text-base font-semibold leading-none tracking-tight">
            CHOICES TEMPLATE 1.0.0
          </h1>

          <div />
        </header>

        {/* 🔹 Divider under header */}
        <Separator className="opacity-60" />

        {/* 🔹 Main content wrapper */}
        <div className="container flex min-h-[calc(100vh-3.5rem)] flex-col">
          {/* 🔹 Divider above main content */}
          <Separator className="my-4 opacity-40" />

          {/* MAIN CONTENT */}
          <main className="m-2 flex-1 rounded-lg border bg-background p-4">
            <Outlet />
          </main>

          {/* 🔹 Divider above footer */}
          <Separator className="my-4 opacity-40" />

          {/* FOOTER */}
          <footer className="m-2 mt-auto rounded-lg border bg-background p-4">
            Footer © {new Date().getFullYear()}
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
