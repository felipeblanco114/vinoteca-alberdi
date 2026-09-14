import WineCard from "./WineCard.jsx";

export default function WineGrid({ wines, onOpen }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
      {wines.map((wine) => (
        <WineCard key={wine.id} wine={wine} onOpen={onOpen} />
      ))}
    </div>
  );
}
