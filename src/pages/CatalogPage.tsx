import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { MovieCard } from "@/components/cards/MovieCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, RotateCcw, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { popularMovies, freeMovies, kidsMovies } from "@/data/movies";

const contentTypes = [
  { id: "films", label: "Фильмы" },
  { id: "cartoons", label: "Мульт" },
  { id: "series", label: "Сериалы" },
  { id: "shows", label: "Шоу" },
];

const genres = [
  "Все жанры",
  "Боевик",
  "Комедия",
  "Драма",
  "Триллер",
  "Ужасы",
  "Фантастика",
  "Мелодрама",
  "Детектив",
  "Приключения",
  "Семейный",
  "Документальный",
];

const countries = [
  "Все страны",
  "Россия",
  "США",
  "Таджикистан",
  "Узбекистан",
  "Индия",
  "Великобритания",
  "Франция",
  "Германия",
  "Корея",
  "Япония",
];

const years = [
  "Все годы",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2010-2017",
  "2000-2009",
  "До 2000",
];

const plots = [
  "Любой сюжет",
  "Основано на реальных событиях",
  "По книге",
  "Ремейк",
  "Продолжение",
  "Оригинальный",
];

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activeType, setActiveType] = useState(searchParams.get("type") || "films");
  const [genre, setGenre] = useState("Все жанры");
  const [country, setCountry] = useState("Все страны");
  const [year, setYear] = useState("Все годы");
  const [plot, setPlot] = useState("Любой сюжет");
  const [hideWatched, setHideWatched] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [madeInAnt, setMadeInAnt] = useState(false);

  // Combine all movies for the catalog
  const allContent = useMemo(() => {
    const all = [...popularMovies, ...freeMovies, ...kidsMovies];
    // Filter based on type
    return all.map((movie, index) => ({
      ...movie,
      id: `catalog-${movie.id}-${index}`,
      // Add some variety for demo
      contentType: index % 4 === 0 ? "films" : index % 4 === 1 ? "cartoons" : index % 4 === 2 ? "series" : "shows",
    }));
  }, []);

  const filteredContent = useMemo(() => {
    return allContent.filter((item) => {
      if (activeType !== "all" && item.contentType !== activeType) {
        return false;
      }
      return true;
    });
  }, [allContent, activeType]);

  const resetFilters = () => {
    setGenre("Все жанры");
    setCountry("Все страны");
    setYear("Все годы");
    setPlot("Любой сюжет");
    setHideWatched(false);
    setFreeOnly(false);
    setMadeInAnt(false);
  };

  const hasActiveFilters = genre !== "Все жанры" || country !== "Все страны" || 
    year !== "Все годы" || plot !== "Любой сюжет" || hideWatched || freeOnly || madeInAnt;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Type tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {contentTypes.map((type) => (
            <Button
              key={type.id}
              variant={activeType === type.id ? "default" : "outline"}
              onClick={() => setActiveType(type.id)}
              className={cn(
                "rounded-full px-6",
                activeType === type.id 
                  ? "bg-primary hover:bg-primary/90" 
                  : "bg-transparent border-border hover:bg-muted"
              )}
            >
              {type.label}
            </Button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Genre */}
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-[160px] bg-card border-border">
              <SelectValue placeholder="Жанр" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {genres.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Country */}
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-[160px] bg-card border-border">
              <SelectValue placeholder="Страна" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {countries.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year */}
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[140px] bg-card border-border">
              <SelectValue placeholder="Год" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {years.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Plot */}
          <Select value={plot} onValueChange={setPlot}>
            <SelectTrigger className="w-[180px] bg-card border-border">
              <SelectValue placeholder="Сюжет" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {plots.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Checkbox filters */}
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={madeInAnt} 
              onCheckedChange={(checked) => setMadeInAnt(checked as boolean)} 
            />
            <span className="text-sm text-foreground">Сделано в АНТ</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={freeOnly} 
              onCheckedChange={(checked) => setFreeOnly(checked as boolean)} 
            />
            <span className="text-sm text-foreground">Бесплатно</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox 
              checked={hideWatched} 
              onCheckedChange={(checked) => setHideWatched(checked as boolean)} 
            />
            <span className="text-sm text-foreground">Скрыть просмотренные</span>
          </label>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-foreground gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              Сбросить
            </Button>
          )}
        </div>

        {/* Content grid - horizontal cards like in reference */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredContent.map((item) => (
            <CatalogCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              rating={item.rating}
              type={item.type}
            />
          ))}
        </div>

        {/* Load more */}
        {filteredContent.length > 0 && (
          <div className="flex justify-center mt-10">
            <Button variant="outline" className="px-8">
              Показать ещё
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Horizontal card component for catalog
interface CatalogCardProps {
  id: string;
  title: string;
  image: string;
  rating?: number;
  type: "film" | "series" | "premiere";
}

function CatalogCard({ id, title, image, rating, type }: CatalogCardProps) {
  const badgeClasses = {
    film: "badge-film",
    series: "badge-series",
    premiere: "badge-premiere",
  };

  const badgeLabels = {
    film: "Фильм",
    series: "Сериал",
    premiere: "Мульт",
  };

  return (
    <a
      href={`/movie/${id}`}
      className="group relative rounded-xl overflow-hidden card-hover"
    >
      {/* Horizontal aspect ratio */}
      <div className="aspect-[16/10] relative overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Type badge */}
        <div className="absolute top-2 left-2">
          <span className={cn(badgeClasses[type], "text-xs")}>{badgeLabels[type]}</span>
        </div>
        
        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2 right-2">
            <span className="rating-badge text-xs">{rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-foreground font-medium text-sm line-clamp-1">{title}</h3>
        </div>
      </div>
    </a>
  );
}

export default CatalogPage;
