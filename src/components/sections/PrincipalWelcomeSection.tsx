import { SCHOOL_INFO } from "@/types";

export function PrincipalWelcomeSection() {
  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 relative h-full min-h-[380px] bg-surface-container-highest">
            <img 
              alt="Dede Sumarna, S.Pd., M.M. - Kepala Sekolah SMK BPPI Baleendah" 
              className="w-full h-full object-cover object-center" 
              src="/images/kepala-sekolah.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent lg:hidden"></div>
            <div className="absolute bottom-4 left-4 right-4 lg:hidden text-on-primary">
              <span className="font-title text-title">Dede Sumarna, S.Pd., M.M.</span>
              <span className="block font-label-sm text-label-sm text-secondary-fixed">Kepala Sekolah {SCHOOL_INFO.name}</span>
            </div>
          </div>
          
          <div className="lg:col-span-7 p-space-lg lg:p-space-xl flex flex-col justify-center gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="w-8 h-1 bg-secondary rounded-full"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Sambutan Kepala Sekolah</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
              Komitmen Membangun SDM Vokasi yang Berkarakter dan Kompeten
            </h2>
            <div className="relative pl-6">
              <span className="absolute left-0 top-0 text-secondary-fixed-dim material-symbols-outlined text-[36px]">format_quote</span>
              <p className="font-body-lg text-body-lg text-on-surface-variant italic leading-relaxed text-lg">
                &ldquo;Jadikan setiap tantangan sebagai kesempatan untuk berkembang.&rdquo;
              </p>
            </div>
            <div className="pt-space-sm flex items-center justify-between flex-wrap gap-space-md">
              <div className="hidden lg:flex flex-col">
                <span className="font-title text-title text-primary font-semibold text-lg">Dede Sumarna, S.Pd., M.M.</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Kepala Sekolah {SCHOOL_INFO.name}</span>
              </div>
              <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded bg-surface-container text-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
                <span>SK Kemendikbudristek No. 164/M/2021 SMK-PK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
