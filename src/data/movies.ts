// Movie and content data for the Lumiere platform

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import heroKids from "@/assets/hero-kids.jpg";
import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";
import movie5 from "@/assets/movie-5.jpg";
import series1 from "@/assets/series-1.jpg";
import series2 from "@/assets/series-2.jpg";
import series3 from "@/assets/series-3.jpg";
import kids1 from "@/assets/kids-1.jpg";
import kids2 from "@/assets/kids-2.jpg";

export interface Movie {
  id: string;
  title: string;
  image: string;
  rating?: number;
  type: "film" | "series" | "premiere";
  year?: string;
  duration?: string;
  country?: string;
  description?: string;
  genres?: string[];
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  type?: "film" | "series" | "premiere";
  rating?: number;
  year?: string;
  duration?: string;
  country?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Свои",
    subtitle: "Основано на реальных событиях",
    description: "Захватывающий военный драматический фильм о героизме и братстве. История о людях, которые встали на защиту своей земли.",
    image: hero1,
    type: "film",
    rating: 8.1,
    year: "2024",
    duration: "2ч 15мин",
    country: "Россия",
  },
  {
    id: "2",
    title: "Анна Каренина",
    subtitle: "Новая экранизация",
    description: "Классическая история любви в современном прочтении. Петербург XIX века оживает на экране в новой интерпретации великого романа.",
    image: hero2,
    type: "premiere",
    rating: 8.4,
    year: "2024",
    duration: "2ч 30мин",
    country: "Россия",
  },
  {
    id: "3",
    title: "Лунтик и его друзья",
    subtitle: "Для всей семьи",
    description: "Добрый мультфильм о дружбе и приключениях. Смотрите вместе с детьми волшебные истории Лунтика и его друзей.",
    image: heroKids,
    type: "series",
    rating: 9.0,
    year: "2024",
    country: "Россия",
  },
];

export const popularMovies: Movie[] = [
  {
    id: "p1",
    title: "Родина",
    image: movie1,
    rating: 8.1,
    type: "series",
    year: "2024",
    genres: ["Драма", "Семейный"],
  },
  {
    id: "p2",
    title: "Чумовая пятница",
    image: movie2,
    rating: 7.8,
    type: "series",
    year: "2023",
    genres: ["Комедия"],
  },
  {
    id: "p3",
    title: "Детектив",
    image: movie3,
    rating: 8.3,
    type: "film",
    year: "2024",
    genres: ["Триллер", "Детектив"],
  },
  {
    id: "p4",
    title: "Любовь в большом городе",
    image: series1,
    rating: 7.5,
    type: "series",
    year: "2024",
    genres: ["Романтика", "Комедия"],
  },
  {
    id: "p5",
    title: "Приключения героя",
    image: series2,
    rating: 8.0,
    type: "series",
    year: "2023",
    genres: ["Приключения", "Экшн"],
  },
  {
    id: "p6",
    title: "Доктора",
    image: series3,
    rating: 8.5,
    type: "series",
    year: "2024",
    genres: ["Драма", "Медицина"],
  },
];

export const freeMovies: Movie[] = [
  {
    id: "f1",
    title: "Королевство",
    image: movie4,
    rating: 8.2,
    type: "film",
    year: "2022",
    genres: ["Исторический", "Драма"],
  },
  {
    id: "f2",
    title: "Ночной гость",
    image: movie5,
    rating: 7.9,
    type: "film",
    year: "2023",
    genres: ["Ужасы", "Триллер"],
  },
  {
    id: "f3",
    title: "Семейные истории",
    image: movie1,
    rating: 8.0,
    type: "series",
    year: "2024",
    genres: ["Драма"],
  },
  {
    id: "f4",
    title: "Весёлые друзья",
    image: movie2,
    rating: 7.6,
    type: "film",
    year: "2023",
    genres: ["Комедия"],
  },
  {
    id: "f5",
    title: "Темный детектив",
    image: movie3,
    rating: 8.4,
    type: "series",
    year: "2024",
    genres: ["Детектив"],
  },
];

export const kidsMovies: Movie[] = [
  {
    id: "k1",
    title: "Волшебный лес",
    image: kids1,
    rating: 8.8,
    type: "film",
    year: "2024",
    genres: ["Мультфильм", "Приключения"],
  },
  {
    id: "k2",
    title: "Малыши",
    image: kids2,
    rating: 9.0,
    type: "series",
    year: "2024",
    genres: ["Мультфильм", "Детский"],
  },
  {
    id: "k3",
    title: "Приключения в лесу",
    image: kids1,
    rating: 8.5,
    type: "series",
    year: "2023",
    genres: ["Мультфильм"],
  },
  {
    id: "k4",
    title: "Добрые друзья",
    image: kids2,
    rating: 8.7,
    type: "series",
    year: "2024",
    genres: ["Мультфильм", "Семейный"],
  },
];

export interface TVChannel {
  id: string;
  name: string;
  logo: string;
  currentShow?: string;
  showTime?: string;
  progress?: number;
  timeRemaining?: string;
  ageRating?: string;
}

export const tvChannels: TVChannel[] = [
  {
    id: "tv1",
    name: "Первый канал",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Channel_One_Russia.svg/200px-Channel_One_Russia.svg.png",
    currentShow: "Новости",
    showTime: "00:00",
    progress: 45,
    timeRemaining: "13 минут осталось",
    ageRating: "12+",
  },
  {
    id: "tv2",
    name: "Россия 1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Rossiya-1_Logo.svg/200px-Rossiya-1_Logo.svg.png",
    currentShow: "Утро России",
    showTime: "00:00",
    progress: 60,
    timeRemaining: "13 минут осталось",
    ageRating: "16+",
  },
  {
    id: "tv3",
    name: "НТВ",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/NTV_logo.svg/200px-NTV_logo.svg.png",
    currentShow: "Название шоу",
    showTime: "00:00",
    progress: 30,
    timeRemaining: "13 минут осталось",
    ageRating: "18+",
  },
  {
    id: "tv4",
    name: "СТС",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/CTC_logo_%282023%29.svg/200px-CTC_logo_%282023%29.svg.png",
    currentShow: "Сериал",
    showTime: "00:00",
    progress: 75,
    timeRemaining: "13 минут осталось",
    ageRating: "6+",
  },
  {
    id: "tv5",
    name: "Мульт",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Mult_%28TV_channel%29_2017_logo.svg/200px-Mult_%28TV_channel%29_2017_logo.svg.png",
    currentShow: "Мультики",
    showTime: "00:00",
    progress: 50,
    timeRemaining: "13 минут осталось",
    ageRating: "0+",
  },
  {
    id: "tv6",
    name: "Sport HD",
    logo: "https://via.placeholder.com/200x100/3b82f6/ffffff?text=SPORT",
    currentShow: "Футбол",
    showTime: "00:00",
    progress: 25,
    timeRemaining: "13 минут осталось",
    ageRating: "12+",
  },
];

export interface Collection {
  id: string;
  title: string;
  gradient: string;
  images?: string[];
}

export const collections: Collection[] = [
  { id: "films", title: "Фильмы", gradient: "collection-gradient-red", images: [movie3, movie4, movie5] },
  { id: "series", title: "Сериалы", gradient: "collection-gradient-purple", images: [series1, series2, series3] },
  { id: "shows", title: "Шоу", gradient: "collection-gradient-yellow", images: [movie2] },
  { id: "popular", title: "Популярные фильмы", gradient: "collection-gradient-blue" },
  { id: "adventures", title: "Приключения", gradient: "collection-gradient-cyan" },
  { id: "popular-series", title: "Популярные сериалы", gradient: "collection-gradient-magenta" },
  { id: "sports", title: "Спорт", gradient: "collection-gradient-green" },
  { id: "documentary", title: "Документальные", gradient: "collection-gradient-purple" },
  { id: "kids", title: "Для детей", gradient: "collection-gradient-cyan", images: [kids1, kids2] },
  { id: "new", title: "Новинки", gradient: "collection-gradient-accent" },
];

export interface SportMatch {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  time: string;
  isLive?: boolean;
}

export const sportMatches: SportMatch[] = [
  {
    id: "s1",
    league: "UEFA Champions League",
    homeTeam: "Барселона",
    awayTeam: "Челси",
    time: "11:10",
    isLive: false,
  },
  {
    id: "s2",
    league: "UEFA Europa League",
    homeTeam: "Барселона",
    awayTeam: "Челси",
    time: "11:10",
  },
  {
    id: "s3",
    league: "UEFA Champions League",
    homeTeam: "Барселона",
    awayTeam: "Челси",
    time: "11:10",
  },
  {
    id: "s4",
    league: "UEFA Champions League",
    homeTeam: "Барселона",
    awayTeam: "Челси",
    time: "11:10",
  },
  {
    id: "s5",
    league: "UEFA Champions League",
    homeTeam: "Барселона",
    awayTeam: "Челси",
    time: "11:10",
  },
];
