export default function CourseFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="-mt-px w-full bg-indigo-600 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center justify-items-center gap-y-8 px-6 py-5 md:h-20 md:grid-cols-[auto_1fr_auto] md:justify-items-stretch md:gap-x-12 md:gap-y-0 md:px-8 md:py-0">
          <img
            src="./imgs/core/choices-logo.svg"
            alt="Choices"
            className="h-6 w-auto object-contain md:h-7 md:justify-self-start"
          />

          <p className="text-center text-[11px] opacity-95 md:text-sm">
            © Sesi {year}. Todos os direitos reservados.
          </p>

          <img
            src="./imgs/core/sesi-logo.svg"
            alt="SESI"
            className="h-6 w-auto object-contain md:h-7 md:justify-self-end"
          />
        </div>
      </footer>
    </>
  );
}
