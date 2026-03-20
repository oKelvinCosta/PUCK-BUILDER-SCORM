// src/pages/template/components-demo/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { Boxes, Bug, Home, List, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const componentSectionTitles = [
  'Colors',
  'Typography',
  'Buttons',
  'Card',
  'Accordion',
  'Carousel',
  'Alerts',
  'Question Radio',
  'Question Checkbox',
  'Click Reveal',
  'Image Map',
  'YouTube Video',
  'Video Box',
  'List Builder',
  'Tab Content',
  'Block Content',
  'Header Editor',
  'Section Builder',
];

const componentNavItems = componentSectionTitles
  .map((title) => ({
    title,
    id: slug(title),
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

export function AppSidebar() {
  const { pathname, hash } = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const nav = [
    { to: '/', label: 'Home', Icon: Home },
    { to: '/debug-scorm', label: 'Debug SCORM', Icon: Bug },
    { to: '/edit', label: 'Edit', Icon: Sparkles },
    { to: '/components', label: 'Components', Icon: Boxes },
  ];

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);

  const onComponents = pathname.includes('components');
  const activeId = onComponents && hash ? decodeURIComponent(hash.slice(1)) : '';

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ⭐ NEW — tell accordion which section to open
  const announceOpenSection = (id: string) => {
    window.dispatchEvent(new CustomEvent('open-section-from-sidebar', { detail: id }));
  };

  // ⭐ Updated anchor click handler
  const handleAnchorClick = (id: string) => {
    announceOpenSection(id); // 🔥 open accordion
    setTimeout(() => scrollToId(id), 80); // 🔥 smooth scroll
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" side="left" className="bg-sidebar">
      <SidebarHeader>
        <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-sidebar-foreground/70">
          Navigation
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Nav */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map(({ to, label, Icon }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton asChild isActive={isActive(to)} tooltip={label}>
                    <Link
                      to={to}
                      onClick={handleNavClick}
                      aria-current={isActive(to) ? 'page' : undefined}
                    >
                      {Icon ? <Icon /> : null}
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Components sidebar */}
        {onComponents && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2 text-xs">
                <List className="size-4" /> Components
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {componentNavItems.map(({ id, title }) => (
                    <SidebarMenuItem key={id}>
                      <SidebarMenuButton
                        asChild
                        variant={activeId === id ? 'default' : 'outline'}
                        size="sm"
                        tooltip={title}
                        isActive={activeId === id}
                      >
                        <Link to={`/components#${id}`} onClick={() => handleAnchorClick(id)}>
                          <span>{title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Choices Page">
              <Link to="/choices" onClick={handleNavClick}>
                <Sparkles />
                <span>Choices Page</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="px-2 py-1 text-xs text-sidebar-foreground/60">
          © {new Date().getFullYear()}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
