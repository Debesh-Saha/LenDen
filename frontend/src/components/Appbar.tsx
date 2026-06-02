export const Appbar = () => {
  return (
    <header className="h-15 px-4 flex items-center justify-between bg-accent/70 border-b-3 border-text-secondary/30">
      
      <div className="flex items-center gap-3">
        <div className="font-bold text-xl text-text-secondary tracking-tight">
          LenDen
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="text-text-primary font-medium text-base hover:text-text-secondary transition">
          Hello!
        </button>

        <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-medium">
          D
        </div>
      </div>
    </header>
  );
};