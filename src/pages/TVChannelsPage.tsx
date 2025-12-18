import { Layout } from "@/components/layout/Layout";
import { TVChannelCard } from "@/components/cards/TVChannelCard";
import { tvChannels } from "@/data/movies";

const TVChannelsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          ТВ-каналы
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {/* Repeat channels to fill the grid */}
          {[...tvChannels, ...tvChannels, ...tvChannels].map((channel, index) => (
            <TVChannelCard
              key={`${channel.id}-${index}`}
              id={channel.id}
              name={channel.name}
              logo={channel.logo}
              currentShow={channel.currentShow}
              showTime={channel.showTime}
              progress={channel.progress}
              timeRemaining={channel.timeRemaining}
              ageRating={channel.ageRating}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TVChannelsPage;
