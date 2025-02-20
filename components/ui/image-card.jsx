export default function ImageCard({
  imageUrl,
  caption,
  location
}) {
  return (
    (<figure
      className=" overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow">
      <img className="w-full aspect-[4/3]" src={imageUrl} alt="image" />
      <figcaption className="border-t-2 text-mtext border-border p-4 flex flex-col h-[120px]">
        <span className="font-bold">{caption}</span>
        <span className="mt-2 text-sm">{location}</span>
      </figcaption>
    </figure>)
  );
}
