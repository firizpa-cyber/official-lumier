import { Layout } from "@/components/layout/Layout";
import { ContentRow } from "@/components/content/ContentRow";
import { sportMatches } from "@/data/movies";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SportsPage = () => {
  const featuredMatch = {
    league: "FIFA",
    homeTeam: "Chelsea",
    awayTeam: "Real Madrid",
    time: "17:20",
  };
  
  return (
    <Layout>
      {/* Hero - Featured Match */}
      <section className="relative py-12 bg-gradient-to-b from-background-elevated to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-8">
            <span className="text-sm">FIFA</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Home team */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-900/50 flex items-center justify-center border-2 border-blue-500/30">
                <span className="text-4xl md:text-5xl">🦁</span>
              </div>
              <span className="mt-3 text-foreground font-medium">{featuredMatch.homeTeam}</span>
            </div>
            
            {/* VS */}
            <div className="text-center">
              <span className="text-3xl md:text-4xl font-bold text-muted-foreground">VS</span>
            </div>
            
            {/* Away team */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                <span className="text-4xl md:text-5xl">👑</span>
              </div>
              <span className="mt-3 text-foreground font-medium">{featuredMatch.awayTeam}</span>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {featuredMatch.homeTeam} - {featuredMatch.awayTeam}
            </h2>
            <p className="text-muted-foreground">
              Трансляция начнётся сегодня в {featuredMatch.time}
            </p>
          </div>
        </div>
      </section>
      
      {/* Popular now */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Популярное сейчас</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-muted/50">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-muted/50">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sportMatches.map((match) => (
              <div 
                key={match.id}
                className="bg-card rounded-xl p-4 hover:bg-card-hover transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span>🏆</span>
                  <span className="truncate">{match.league}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{match.homeTeam}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{match.awayTeam}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{match.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Europa League */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Лига Европы</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-muted/50">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-muted/50">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sportMatches.map((match, index) => (
              <div 
                key={`europa-${match.id}-${index}`}
                className="bg-card rounded-xl p-4 hover:bg-card-hover transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span>🏆</span>
                  <span className="truncate">UEFA Europa League</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{match.homeTeam}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{match.awayTeam}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{match.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SportsPage;
