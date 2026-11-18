import { Container } from "@/components/ui/Section";

/** Squelette affiché pendant le chargement d'une page dynamique. */
export function PageLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="bg-navy-950 py-24">
        <Container>
          <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
          <div className="mt-6 h-12 w-3/4 max-w-xl animate-pulse rounded-lg bg-white/10" />
          <div className="mt-4 h-5 w-2/3 max-w-lg animate-pulse rounded bg-white/10" />
        </Container>
      </div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}
