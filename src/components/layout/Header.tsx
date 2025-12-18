import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo-lumiere.png";
import { cn } from "@/lib/utils";

const desktopNavItems = [
  {
    label: "Главная",
    href: "/",
    iconNormal: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2Fb0b9026a99054e3dbf3449e57d54d588?format=webp&width=800",
    iconActive: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2F891742d1d96344a3bedb37ce7ccb60d8?format=webp&width=800",
  },
  {
    label: "Детям",
    href: "/kids",
    iconNormal: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2F57da6f0e10a24080a6140e62470461ea?format=webp&width=800",
    iconActive: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2F42037a02cc254fd0abc8aade24d05b53?format=webp&width=800",
  },
  {
    label: "Бесплатно",
    href: "/free",
    iconNormal: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2Fdc3a10171cdb49188396331cd6cce8ad?format=webp&width=800",
    iconActive: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2F588c99cf62c54bfa91e0bec8a534b390?format=webp&width=800",
  },
  {
    label: "Спорт",
    href: "/sports",
    iconNormal: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2Fadd46c706e974358b4e2e70c21ad42ed?format=webp&width=800",
    iconActive: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2F8e618fb6e7d34d61bc9223b386f487c5?format=webp&width=800",
  },
  {
    label: "Коллекции",
    href: "/collections",
    iconNormal: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2F6f2fb373133c4c9498c1e92be38fe4f0?format=webp&width=800",
    iconActive: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2F5e3f0868ba1a4ce7bad23cc392765e83?format=webp&width=800",
  },
  {
    label: "ТВ каналы",
    href: "/tv",
    iconNormal: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2Fc0f701fa7ce644508a74fefc419cc679?format=webp&width=800",
    iconActive: "https://cdn.builder.io/api/v1/image/assets%2F0d77b54bf9a14a4f80a323f36080e67b%2F1ece459a70494a90b606ef033acd44ba?format=webp&width=800",
  },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isCatalogOpen = location.pathname === "/catalog";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const openCatalog = () => {
    navigate("/catalog");
  };

  const closeCatalog = () => {
    navigate(-1);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="w-full px-3 sm:px-4">
        <div className="flex items-center justify-between h-[72px] gap-2 sm:gap-4">
          {/* Left section - Logo & Catalog */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src={logo} alt="Lumiere" className="h-7 sm:h-8 w-auto" />
            </Link>

            <button
              onClick={isCatalogOpen ? closeCatalog : openCatalog}
              className={cn(
                "flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full transition-colors flex-shrink-0",
                isCatalogOpen
                  ? "bg-muted text-foreground"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isCatalogOpen ? <X className="w-4 sm:w-5 h-4 sm:h-5" /> : <Menu className="w-4 sm:w-5 h-4 sm:h-5" />}
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Каталог</span>
            </button>
          </div>

          {/* Center - Search (full width on mobile, limited on larger) */}
          <form onSubmit={handleSearch} className="relative flex items-center flex-1 max-w-xs sm:max-w-sm lg:max-w-sm">
            <Search className="absolute left-3 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => navigate("/search")}
              className="pl-9 w-full text-xs sm:text-sm bg-muted/50 border-border/50 focus:bg-muted"
            />
          </form>

          {/* Desktop navigation (hidden on mobile/tablet) */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-shrink-0">
            {desktopNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "nav-link",
                    isActive && "active"
                  )}
                >
                  <img
                    src={isActive ? item.iconActive : item.iconNormal}
                    alt={item.label}
                    className="nav-link-icon w-5 h-5"
                  />
                  <span className="nav-link-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right section - Promo, Login, Search icon */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link to="/pricing" className="hidden sm:block">
              <Button
                variant="default"
                className="bg-gradient-primary hover:opacity-90 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 h-auto"
              >
                <span className="hidden md:inline">15 смн за 30 дней</span>
                <span className="md:hidden">15 смн</span>
              </Button>
            </Link>

            <Link to="/auth" className="hidden sm:block">
              <Button
                variant="outline"
                className="border-border/50 hover:bg-muted/50 text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 h-auto"
              >
                Войти
              </Button>
            </Link>

            <button
              onClick={() => navigate("/search")}
              className="sm:hidden p-2 text-foreground/80 hover:text-foreground flex-shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
    </header>
  );
}
