// src/components/ComponentsSidebar.tsx
import * as React from "react";
import { Search } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

export type OutlineItem = { id: string; title: string };

export default function ComponentsSidebar({ items }: { items: OutlineItem[] }) {
  const [query, setQuery] = React.useState("");
  const filtered = React.useMemo(
    () =>
      items.filter((i) =>
        i.title.toLowerCase().includes(query.toLowerCase())
      ),
    [items, query]
  );

  function jumpTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-2">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Search className="size-4 opacity-60" />
          <Input
            className="h-8"
            placeholder="Search sections…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filtered.map((it) => (
                <SidebarMenuItem key={it.id}>
                  <SidebarMenuButton onClick={() => jumpTo(it.id)}>
                    <span>{it.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
