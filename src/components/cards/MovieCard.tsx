import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  rating?: number;
  type?: "film" | "series" | "premiere";
  year?: string;
  className?: string;
}

export function MovieCard({ 
  id, 
  title, 
  image, 
  rating, 
  type = "film",
  year,
  className 
}: MovieCardProps) {
  const badgeClasses = {
    film: "badge-film",
    series: "badge-series", 
    premiere: "badge-premiere",
  };

  const badgeLabels = {
    film: "Фильм",
    series: "Сериал",
    premiere: "Премьера",
  };

  return (
    <Link
      to={`/movie/${id}`}
      className={cn(
        "group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] rounded-xl overflow-hidden card-hover",
        className
      )}
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={badgeClasses[type]}>{badgeLabels[type]}</span>
        </div>
        
        {/* Rating badge */}
        {rating && (
          <div className="absolute top-3 right-3">
            <span className="rating-badge">{rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Title on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-foreground font-medium text-sm line-clamp-2">{title}</h3>
          {year && <p className="text-muted-foreground text-xs mt-1">{year}</p>}
        </div>
      </div>
    </Link>
  );
}
