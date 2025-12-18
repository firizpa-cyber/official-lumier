import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ContentRow } from "@/components/content/ContentRow";
import { MovieCard } from "@/components/cards/MovieCard";
import { popularMovies, freeMovies } from "@/data/movies";
import { Play, Plus, Share2, ThumbsUp, Star, Clock, Globe, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import hero2 from "@/assets/hero-2.jpg";

const MovieDetailPage = () => {
  const { id } = useParams();
  
  // Mock movie data - in real app, fetch by id
  const movie = {
    id: id || "1",
    title: "Сводишь с ума",
    originalTitle: "Crazy About You",
    image: hero2,
    rating: 8.1,
    type: "series" as const,
    year: "2024",
    duration: "45 мин",
    country: "Россия",
    description: "Анна Грановская в прерасной молодёжной комедии о любви, интригах и прокисающем браке. Она всё ещё в замужней паре переживает настоящую проблему.",
    genres: ["Драма", "Романтика", "Комедия"],
    seasons: 2,
    episodes: 16,
    quality: "FullHD",
    subtitles: "Русские",
    ageRating: "16+",
  };

  return (
    <Layout>
      {/* Hero section with movie backdrop */}
      <section className="relative min-h-[500px] md:min-h-[600px]">
        <div className="absolute inset-0">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute inset-0 hero-overlay-bottom" />
        </div>
        
        <div className="relative container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-[200px] md:w-[280px] mx-auto md:mx-0">
            <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-card">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge-series">Сериал</span>
              <span className="text-sm text-muted-foreground">{movie.ageRating}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              {movie.title}
            </h1>
            
            {movie.originalTitle && (
              <p className="text-muted-foreground mb-4">{movie.originalTitle}</p>
            )}
            
            {/* Rating and meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="rating-badge text-lg">{movie.rating}</span>
                <div className="text-sm">
                  <div className="text-foreground font-medium">Рейтинг Lumiere</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {movie.year}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {movie.seasons} сезона
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {movie.country}
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link to={`/watch/${movie.id}`}>
                <Button className="bg-gradient-primary hover:opacity-90 gap-2 px-6">
                  <Play className="w-5 h-5 fill-current" />
                  Смотреть сериал
                </Button>
              </Link>
              <Button variant="outline" className="border-foreground/30 hover:bg-foreground/10 gap-2">
                <Play className="w-5 h-5" />
                Трейлер
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-muted/50">
                <Plus className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-muted/50">
                <ThumbsUp className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-muted/50">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Quality badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                {movie.quality}
              </span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                {movie.subtitles}
              </span>
            </div>
            
            {/* Description */}
            <p className="text-foreground/80 max-w-2xl">
              {movie.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Tabs */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="episodes" className="w-full">
          <TabsList className="bg-muted/50 mb-6">
            <TabsTrigger value="episodes">Серии</TabsTrigger>
            <TabsTrigger value="details">Детали</TabsTrigger>
            <TabsTrigger value="similar">Похожие</TabsTrigger>
          </TabsList>
          
          <TabsContent value="episodes">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Сезон 1</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Link 
                    key={index}
                    to={`/watch/${movie.id}?season=1&episode=${index + 1}`}
                    className="group relative aspect-video rounded-lg overflow-hidden bg-muted"
                  >
                    <img
                      src={movie.image}
                      alt={`Серия ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-white text-sm">Серия {index + 1}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">О сериале</h3>
                <p className="text-muted-foreground mb-6">{movie.description}</p>
                
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <span className="text-muted-foreground w-32">Жанр:</span>
                    <span className="text-foreground">{movie.genres?.join(", ")}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground w-32">Год:</span>
                    <span className="text-foreground">{movie.year}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground w-32">Страна:</span>
                    <span className="text-foreground">{movie.country}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground w-32">Длительность:</span>
                    <span className="text-foreground">{movie.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="similar">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {popularMovies.map((m) => (
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  image={m.image}
                  rating={m.rating}
                  type={m.type}
                  year={m.year}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Similar content */}
      <ContentRow title="Вам также понравится">
        {[...popularMovies, ...freeMovies.slice(0, 2)].map((m, index) => (
          <MovieCard
            key={`similar-${m.id}-${index}`}
            id={m.id}
            title={m.title}
            image={m.image}
            rating={m.rating}
            type={m.type}
            year={m.year}
          />
        ))}
      </ContentRow>
    </Layout>
  );
};

export default MovieDetailPage;
