export default function Legend() {
    return (
      <div className="absolute top-5 right-5 z-20 rounded-lg bg-black/70 p-4 text-white">
        <h3 className="mb-3 font-semibold">Legend</h3>
  
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-cyan-400" />
            Human
          </div>
  
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-500" />
            Bot
          </div>
  
          <hr className="border-zinc-600" />
  
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            Loot
          </div>
  
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            Bot Kill
          </div>
  
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-purple-500" />
            Storm Death
          </div>
        </div>
      </div>
    );
  }