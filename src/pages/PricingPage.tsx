import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import logo from "@/assets/logo-lumiere.png";

const plans = [
  {
    id: "basic",
    name: "Базовый",
    price: 299,
    description: "Хороший выбор для начала",
    period: "месяц",
    popular: false,
    features: [
      "HD качество",
      "1 устройство",
      "Без рекламы",
      "Базовая библиотека",
    ],
    badge: null,
  },
  {
    id: "standard",
    name: "Стандарт",
    price: 499,
    description: "Лучший выбор для семьи",
    period: "месяц",
    popular: true,
    features: [
      "Full HD качество",
      "2 устройства",
      "Без рекламы",
      "Полная библиотека",
      "Скачивание контента",
      "Одновременный просмотр",
    ],
    badge: "Популярный",
  },
  {
    id: "premium",
    name: "Премиум",
    price: 799,
    description: "Максимум возможностей",
    period: "месяц",
    popular: false,
    features: [
      "4K + HDR качество",
      "4 устройства",
      "Без рекламы",
      "Полная библиотека",
      "Скачивание контента",
      "Эксклюзивные премьеры",
      "Семейный доступ",
      "Приоритетная поддержка",
    ],
    badge: null,
  },
];

const PricingPage = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    navigate("/payment", { state: { selectedPlan: planId } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Link to="/" className="inline-block mb-8">
            <img src={logo} alt="Lumiere" className="h-10" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Выберите подписку
          </h1>
          <p className="text-lg text-muted-foreground">
            Получайте доступ к премиум-контенту и смотрите фильмы без ограничений
          </p>
        </div>

        {/* Free banner */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-primary via-primary/80 to-secondary p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              15 смн за 30 дней — Бесплатно!
            </h2>
            <p className="text-white/90 text-lg">
              Получите неограниченный доступ к контенту на целый месяц без платежа
            </p>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? "ring-2 ring-primary scale-105 shadow-2xl"
                  : "border border-border shadow-lg"
              } hover:shadow-xl`}
            >
              {/* Card background */}
              <div
                className={`absolute inset-0 ${
                  plan.popular
                    ? "bg-gradient-to-br from-primary/10 via-background to-secondary/10"
                    : "bg-card"
                }`}
              />

              <div className="relative p-8 flex flex-col h-full">
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-1 text-sm font-semibold rounded-bl-2xl">
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Plan name and description */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">₽</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    за {plan.period}
                  </div>
                </div>

                {/* Button */}
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full mb-6 font-semibold py-2 h-auto transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white"
                      : "bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                  }`}
                >
                  Выбрать план
                </Button>

                {/* Features list */}
                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features comparison */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Всё включено в каждый план
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎬", title: "Полная библиотека", desc: "Тысячи фильмов и сериалов" },
              { icon: "📱", title: "На всех устройствах", desc: "Смотрите где угодно, когда угодно" },
              { icon: "⬇️", title: "Скачивание", desc: "Смотрите без интернета" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Могу ли я изменить или отменить подписку в любой момент?",
                a: "Да, вы можете изменить или отменить подписку в любой момент через настройки аккаунта.",
              },
              {
                q: "Есть ли бесплатный пробный период?",
                a: "Да, новые пользователи получают 15 дней бесплатного доступа ко всем функциям.",
              },
              {
                q: "Какой способ оплаты вы принимаете?",
                a: "Мы принимаем платежи по банковским картам, мобильным кошелькам и другим способам.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <p className="text-center mt-12 text-muted-foreground text-sm">
          <Link to="/" className="hover:text-foreground transition-colors">
            ← Вернуться на главную
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
