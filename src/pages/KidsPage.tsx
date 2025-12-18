import { Layout } from "@/components/layout/Layout";
import { ContentRow } from "@/components/content/ContentRow";
import { MovieCard } from "@/components/cards/MovieCard";
import { kidsMovies, popularMovies } from "@/data/movies";
import heroKids from "@/assets/hero-kids.jpg";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const KidsPage = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="relative h-[500px] md:h-[550px] overflow-hidden">
        <img
          src={heroKids}
          alt="Лунтик"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 hero-overlay-bottom" />
        
        <div className="absolute inset-0 container mx-auto px-4 flex items-center">
          <div className="max-w-xl">
            <span className="badge-premiere mb-4 inline-block">Премьера</span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Лунтик и его друзья
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
              <span>1ч 56 минут</span>
              <span>•</span>
              <span>2003</span>
              <span>•</span>
              <span>Великобритания</span>
            </div>
            
            <p className="text-foreground/80 text-sm md:text-base mb-6 line-clamp-4">
              «Лунтик и его друзья» — российский многосерийный мультсериал, созданный студией «Меломаньяк». 
              В оcьмилетний Кевин остаётся один в большом доме после того, как его родители в спешке забывают взять его с собой в отпуск.
            </p>
            
            <div className="flex items-center gap-3">
              <Link to="/watch/kids-1">
                <Button className="bg-gradient-primary hover:opacity-90 gap-2 px-6">
                  <Play className="w-5 h-5 fill-current" />
                  Смотреть
                </Button>
              </Link>
              <Link to="/movie/kids-1">
                <Button variant="outline" className="border-foreground/30 hover:bg-foreground/10 gap-2">
                  <Info className="w-5 h-5" />
                  Подробнее
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* First episode free */}
      <ContentRow title="Первая серия бесплатно">
        {kidsMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            rating={movie.rating}
            type={movie.type}
            year={movie.year}
          />
        ))}
        {popularMovies.slice(0, 3).map((movie) => (
          <MovieCard
            key={`kids-pop-${movie.id}`}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            rating={movie.rating}
            type="series"
            year={movie.year}
          />
        ))}
      </ContentRow>
      
      {/* Watch free */}
      <ContentRow title="Смотрите бесплатно">
        {[...kidsMovies].reverse().map((movie) => (
          <MovieCard
            key={`free-${movie.id}`}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            rating={movie.rating}
            type={movie.type}
            year={movie.year}
          />
        ))}
      </ContentRow>
      
      {/* Watch with parents */}
      <ContentRow title="Смотри вместе с родителями">
        {kidsMovies.map((movie) => (
          <MovieCard
            key={`parents-${movie.id}`}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            rating={movie.rating}
            type={movie.type}
            year={movie.year}
          />
        ))}
      </ContentRow>
    </Layout>
  );
};

export default KidsPage;
