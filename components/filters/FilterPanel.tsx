"use client";

type Filters = {
  humans: boolean;
  bots: boolean;
  loot: boolean;
  botKills: boolean;
  stormDeaths: boolean;
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<
    React.SetStateAction<Filters>
  >;
};

export default function FilterPanel({
  filters,
  setFilters,
}: Props) {
  const toggle = (
    key: keyof Filters
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const Button = ({
    label,
    active,
    color,
    onClick,
  }: {
    label: string;
    active: boolean;
    color: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`rounded-lg border px-4 py-2 text-sm font-medium transition
      ${
        active
          ? `${color} border-transparent text-white`
          : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-3">

      <Button
        label="Humans"
        active={filters.humans}
        color="bg-cyan-600"
        onClick={() =>
          toggle("humans")
        }
      />

      <Button
        label="Bots"
        active={filters.bots}
        color="bg-orange-600"
        onClick={() =>
          toggle("bots")
        }
      />

      <Button
        label="Loot"
        active={filters.loot}
        color="bg-yellow-500"
        onClick={() =>
          toggle("loot")
        }
      />

      <Button
        label="Bot Kills"
        active={filters.botKills}
        color="bg-red-600"
        onClick={() =>
          toggle("botKills")
        }
      />

      <Button
        label="Storm Deaths"
        active={filters.stormDeaths}
        color="bg-purple-600"
        onClick={() =>
          toggle("stormDeaths")
        }
      />

    </div>
  );
}