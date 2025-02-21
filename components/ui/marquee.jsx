export default function Marquee({
  items
}) {
  return (
    (<div
      className="relative flex w-full overflow-x-hidden border-2 rounded-base border-border bg-bw text-text font-base">
      <div className="animate-marquee whitespace-nowrap py-4">
        {items.map((item) => {
          return (
            (<span key={item} className="mx-4 text-2xl font-caprasimo">
              {item}
            </span>)
          );
        })}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-4">
        {items.map((item) => {
          return (
            (<span key={item} className="mx-4 text-2xl font-caprasimo">
              {item}
            </span>)
          );
        })}
      </div>
      {/* must have both of these in order to work */}
    </div>)
  );
}
