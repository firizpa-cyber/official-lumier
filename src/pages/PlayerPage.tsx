import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipBack, SkipForward, Settings, Subtitles, 
  ChevronLeft, ChevronRight, List, Flag
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import hero1 from "@/assets/hero-1.jpg";

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const PlayerPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const season = searchParams.get("season") || "1";
  const episode = searchParams.get("episode") || "1";
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [quality, setQuality] = useState("1080p");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Movie data
  const movie = {
    title: "Мажор",
    season: parseInt(season),
    episode: parseInt(episode),
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "arrowleft":
          e.preventDefault();
          skip(-10);
          break;
        case "arrowright":
          e.preventDefault();
          skip(10);
          break;
        case "arrowup":
          e.preventDefault();
          changeVolume(Math.min(1, volume + 0.1));
          break;
        case "arrowdown":
          e.preventDefault();
          changeVolume(Math.max(0, volume - 0.1));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [volume]);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Simulate video progress for demo
  useEffect(() => {
    setDuration(3240); // 54 minutes
    
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skip = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)));
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const percent = (e.clientX - rect.left) / rect.width;
    setCurrentTime(percent * duration);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden cursor-none"
      style={{ cursor: showControls ? "default" : "none" }}
    >
      {/* Video placeholder - in real app, use actual video element */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={hero1}
          alt="Video"
          className="w-full h-full object-contain"
        />
        
        {/* Center play/pause overlay */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </button>
        )}
      </div>
      
      {/* Top bar */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between">
          <Link to={`/movie/${id}`} className="flex items-center gap-3 text-white hover:text-white/80 transition-colors">
            <ChevronLeft className="w-6 h-6" />
            <div>
              <h1 className="font-semibold">{movie.title}</h1>
              <p className="text-sm text-white/60">Серия {movie.episode} сезон {movie.season}</p>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Large center controls */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center gap-12 transition-opacity duration-300",
          showControls && isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button onClick={() => skip(-10)} className="player-control p-4">
          <SkipBack className="w-12 h-12" />
        </button>
        <button onClick={togglePlay} className="player-control p-4">
          {isPlaying ? (
            <Pause className="w-16 h-16" />
          ) : (
            <Play className="w-16 h-16 ml-1" />
          )}
        </button>
        <button onClick={() => skip(10)} className="player-control p-4">
          <SkipForward className="w-12 h-12" />
        </button>
      </div>
      
      {/* Bottom controls */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Skip intro button */}
        <div className="flex items-center justify-center gap-4 py-4">
          <Button variant="outline" className="bg-background/20 border-white/30 text-white hover:bg-background/40">
            <SkipForward className="w-4 h-4 mr-2" />
            Пропустить заставку
          </Button>
          <Button className="bg-destructive hover:bg-destructive/90 text-white">
            <SkipForward className="w-4 h-4 mr-2" />
            Пропустить все заставки и титры
          </Button>
        </div>
        
        {/* Progress bar */}
        <div 
          ref={progressRef}
          className="relative h-1 mx-4 bg-white/20 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div 
            className="absolute inset-y-0 left-0 bg-primary"
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progress}%`, transform: `translateX(-50%) translateY(-50%)` }}
          />
        </div>
        
        {/* Controls row */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Watch button */}
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Play className="w-4 h-4 mr-1" />
              Смотреть
            </Button>
            
            {/* Play/Pause */}
            <button onClick={togglePlay} className="player-control">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            {/* Skip */}
            <button onClick={() => skip(10)} className="player-control">
              <SkipForward className="w-5 h-5" />
            </button>
            
            {/* Volume */}
            <div className="flex items-center gap-2 group">
              <button onClick={toggleMute} className="player-control">
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <div className="w-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  onValueChange={([v]) => changeVolume(v / 100)}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            {/* Time */}
            <span className="text-white/80 text-sm ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Episodes */}
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <List className="w-4 h-4 mr-1" />
              Серии и сезоны
            </Button>
            
            {/* Subtitles */}
            <button className="player-control">
              <Subtitles className="w-5 h-5" />
            </button>
            
            {/* Settings */}
            <DropdownMenu open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="player-control">
                  <Settings className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur border-border">
                <DropdownMenuLabel>НАСТРОЙКИ</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="flex justify-between">
                  <span>Качество</span>
                  <span className="text-muted-foreground">{quality}</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex justify-between">
                  <span>Скорость воспроизведения</span>
                  <span className="text-muted-foreground">{playbackSpeed}x</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Режим Марафона</span>
                </DropdownMenuItem>
                <p className="px-2 py-1 text-xs text-muted-foreground">
                  Пропускать все заставки, титры и перерыв
                </p>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="flex items-center gap-2 text-muted-foreground">
                  <Flag className="w-4 h-4" />
                  <span>Сообщить о проблеме</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Fullscreen */}
            <button onClick={toggleFullscreen} className="player-control">
              {isFullscreen ? (
                <Minimize className="w-5 h-5" />
              ) : (
                <Maximize className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
