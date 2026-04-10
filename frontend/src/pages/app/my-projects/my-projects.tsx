import { Header, ListGroups, ListPages } from '@/pages/app/my-projects';

export function MyProjects() {
  return (
    <>
      <Header />
      <div className="mx-auto size-full flex-1 px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-12 lg:gap-8 2xl:grid-cols-12">
          {/* Pages */}
          <ListPages />

          {/* Groups */}
          <ListGroups />
        </div>
      </div>
    </>
  );
}
