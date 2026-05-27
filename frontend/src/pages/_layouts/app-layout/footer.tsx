export function Footer() {
  return (
    <footer>
      <div className="text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6">
        <p className="text-balance text-sm">
          {`©${new Date().getFullYear()}`},{` `} feito com ❤️ para criadores
        </p>
      </div>
    </footer>
  );
}
