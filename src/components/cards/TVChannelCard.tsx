import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface TVChannelCardProps {
  id: string;
  name: string;
  logo: string;
  currentShow?: string;
  showTime?: string;
  progress?: number;
  timeRemaining?: string;
  ageRating?: string;
  className?: string;
}

export function TVChannelCard({
  id,
  name,
  logo,
  currentShow,
  showTime,
  progress = 0,
  timeRemaining,
  ageRating,
  className,
}: TVChannelCardProps) {
  return (
    <Link
      to={`/tv/${id}`}
      className={cn(
        "group relative flex flex-col rounded-xl overflow-hidden bg-card hover:bg-card-hover transition-colors",
        className
      )}
    >
      {/* Channel logo/image */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <img
          src={logo}
          alt={name}
          className="max-w-[80%] max-h-[60%] object-contain"
        />
        
        {/* Age rating */}
        {ageRating && (
          <span className="absolute top-2 right-2 bg-background/80 text-foreground text-xs px-1.5 py-0.5 rounded">
            {ageRating}
          </span>
        )}
        
        {/* Time remaining */}
        {timeRemaining && (
          <span className="absolute bottom-2 left-2 bg-background/80 text-foreground text-xs px-2 py-1 rounded">
            {timeRemaining}
          </span>
        )}
        
        {/* Progress bar */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
            <div 
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          {showTime && <span>{showTime}</span>}
          {currentShow && <span className="truncate">{currentShow}</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
            <img src={logo} alt="" className="w-4 h-4 object-contain" />
          </div>
          <span className="text-sm text-muted-foreground truncate">{name}</span>
        </div>
      </div>
    </Link>
  );
}
