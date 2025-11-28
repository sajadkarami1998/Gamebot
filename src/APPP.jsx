import React, { useState, useEffect } from 'react';
import { Heart, Lock, AlertCircle, MessageCircle, Star, X, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles, Flame, Moon } from 'lucide-react';

// --- داده‌های کارت‌ها ---
const CardData = {
  kiss: [
    { title: "بوسه بر گردن", description: "به آرامی و با احساس گردن شریک خود را ببوسید.", icon: "💋", intensity: "ملایم" },
    { title: "بوسه اسپایدرمنی", description: "شریکتان دراز بکشد و شما از بالا (برعکس) او را ببوسید.", icon: "🕷️", intensity: "فانتزی" },
    { title: "بوسه ماراتن", description: "به مدت ۳۰ ثانیه بدون جدا شدن لب‌ها همدیگر را ببوسید.", icon: "⏱️", intensity: "داغ" },
    { title: "بوسه پروانه‌ای", description: "مژه‌های خود را به نرمی روی گونه یا گردن شریکتان حرکت دهید.", icon: "🦋", intensity: "لطیف" },
    { title: "بوسه بر پیشانی", description: "چشمانش را ببندد و شما پیشانی او را ببوسید.", icon: "😌", intensity: "عاشقانه" },
    { title: "بوسه فرانسوی", description: "یک بوسه عمیق و طولانی به سبک فرانسوی.", icon: "🗼", intensity: "داغ" },
    { title: "بوسه غافلگیرانه", description: "چشمانش را ببندید و در یک نقطه غیرمنتظره (صورت یا دست) بوسه بزنید.", icon: "🎁", intensity: "بازیگوش" },
    { title: "بوسه بر شانه", description: "پیراهن او را کمی کنار بزنید و شانه‌اش را ببوسید.", icon: "👕", intensity: "جذاب" },
    { title: "بوسه بر لاله گوش", description: "نرمه گوش او را به آرامی ببوسید یا گاز بگیرید.", icon: "👂", intensity: "حساس" },
    { title: "سه بوسه سریع", description: "سه بوسه سریع اما صدادار روی لب‌ها.", icon: "⚡", intensity: "بانمک" },
    { title: "بوسه روی پلک", description: "روی هر دو پلک چشمان بسته او را ببوسید.", icon: "👁️", intensity: "آرامش‌بخش" },
    { title: "بوسه یخی", description: "یک تکه یخ در دهان بگذارید تا سرد شود، سپس او را ببوسید.", icon: "🧊", intensity: "متفاوت" },
  ],
  hug: [
    { title: "بغل خرسی", description: "او را محکم بغل کنید و اگر می‌توانید از زمین بلند کنید.", icon: "🐻", intensity: "قدرتمند" },
    { title: "بغل قاشقی", description: "به مدت ۱ دقیقه از پشت او را در آغوش بگیرید (Spoon).", icon: "🥄", intensity: "آرام" },
    { title: "گونه به گونه", description: "صورت‌هایتان را به هم بچسبانید و ۳۰ ثانیه در سکوت بمانید.", icon: "😊", intensity: "صمیمی" },
    { title: "صدای قلب", description: "گوش خود را روی قلب او بگذارید و به تپش آن گوش دهید.", icon: "💓", intensity: "عمیق" },
    { title: "بغل از پشت", description: "ناگهانی از پشت او را بغل کنید و گردنش را بو کنید.", icon: "🔙", intensity: "عاشقانه" },
    { title: "بغل گهواره‌ای", description: "همدیگر را بغل کنید و مثل گهواره آرام تکان بخورید.", icon: "🎵", intensity: "ریتمیک" },
    { title: "آغوش چشم تو چشم", description: "دستانتان را دور کمر هم حلقه کنید و فقط به چشم هم زل بزنید.", icon: "👀", intensity: "روحانی" },
    { title: "آغوش محافظ", description: "او را طوری بغل کنید که انگار می‌خواهید از او در برابر دنیا محافظت کنید.", icon: "🛡️", intensity: "امن" },
    { title: "آغوش نشسته", description: "یکی روی مبل بنشیند و دیگری روی پای او بنشیند و همدیگر را بغل کنید.", icon: "🪑", intensity: "نزدیک" },
    { title: "لمس موها", description: "در حین بغل کردن، انگشتان خود را در موهای او فرو ببرید.", icon: "💇", intensity: "لذت‌بخش" },
  ],
  truth: [
    { title: "اولین برداشت", description: "صادقانه بگو: در اولین دیدار دقیقا چه فکری راجع به من کردی؟", icon: "🤔", intensity: "کنجکاوی" },
    { title: "جذاب‌ترین ویژگی", description: "کدام عضو بدن یا ویژگی اخلاقی من تو را بیشتر جذب می‌کند؟", icon: "🔥", intensity: "تحسین" },
    { title: "فانتزی پنهان", description: "یک رویای عاشقانه که تا حالا به من نگفتی چیست؟", icon: "🤫", intensity: "رازآلود" },
    { title: "ترس از دست دادن", description: "چه چیزی در رابطه ما بیشتر از همه تو را می‌ترساند؟", icon: "😨", intensity: "جدی" },
    { title: "بهترین خاطره", description: "لحظه‌ای که فهمیدی عاشق من شدی کی بود؟", icon: "🧠", intensity: "احساسی" },
    { title: "تغییر رفتار", description: "یک اخلاق من که دوست داری تغییر کند چیست؟ (بدون ناراحتی!)", icon: "change", intensity: "سازنده" },
    { title: "دروغ مصلحتی", description: "آخرین دروغ کوچکی که به من گفتی چه بود؟", icon: "🤥", intensity: "خطرناک" },
    { title: "نمره به رابطه", description: "از ۱ تا ۱۰ به وضعیت فعلی رابطه‌مان چند می‌دهی و چرا؟", icon: "📊", intensity: "تحلیلی" },
    { title: "لباس مورد علاقه", description: "کدام لباس من را بیشتر از همه دوست داری؟", icon: "👗", intensity: "سلیقه‌ای" },
    { title: "حسودی", description: "آخرین باری که به کسی در مورد من حسودی کردی کی بود؟", icon: "😠", intensity: "غیرتی" },
    { title: "شبیه کدام سلبریتی؟", description: "من تو را یاد کدام بازیگر یا شخصیت معروف می‌اندازم؟", icon: "⭐", intensity: "فان" },
  ],
  dare: [
    { title: "ماساژ ریلکسی", description: "۳ دقیقه شانه‌ها و گردن شریکت را ماساژ بده.", icon: "💆", intensity: "آرامش" },
    { title: "آواز عاشقانه", description: "یک آهنگ عاشقانه را با صدای بلند و چشمان بسته برایش بخوان.", icon: "🎤", intensity: "جسورانه" },
    { title: "رقص اسلو", description: "بدون موزیک، دستش را بگیر و ۱ دقیقه آرام برقصید.", icon: "💃", intensity: "رمانتیک" },
    { title: "تعریف رگباری", description: "در ۲۰ ثانیه، ۵ ویژگی مثبت او را پشت سر هم بگو.", icon: "⚡", intensity: "سرعتی" },
    { title: "سرویس دهی", description: "تا نوبت بعدی، باید نوشیدنی یا خوراکی را با دست در دهانش بگذاری.", icon: "🍇", intensity: "خدمت" },
    { title: "بازسازی صحنه", description: "یک صحنه عاشقانه از یک فیلم معروف را همین الان اجرا کنید.", icon: "🎬", intensity: "بازیگری" },
    { title: "لمس ممنوع", description: "تا نوبت بعدی حق نداری از دستانت استفاده کنی (برای هیچ کاری!).", icon: "🚫", intensity: "سخت" },
    { title: "عکس یهویی", description: "همین الان یه سلفی خنده‌دار یا عاشقانه بگیرید.", icon: "📸", intensity: "خاطره" },
    { title: "پیام عاشقانه", description: "گوشیش رو بردار و یه استاتوس یا استوری عاشقانه راجع به خودت بذار.", icon: "📱", intensity: "شیطنت" },
    { title: "پابرهنه", description: "جوراب‌هایت را در بیاور و سعی کن با پایت پای او را نوازش کنی.", icon: "🦶", intensity: "عجیب" },
    { title: "چشم‌بند", description: "چشمانت را ببند و حدس بزن او کدام قسمت صورتت را لمس می‌کند.", icon: "🙈", intensity: "حسی" },
  ]
};

const BOARD_SPACES = [
  { id: 1, type: 'truth', label: 'حقیقت', color: 'from-blue-500 to-cyan-400', icon: MessageCircle, textColor: 'text-cyan-50' },
  { id: 2, type: 'hug', label: 'آغوش', color: 'from-orange-500 to-amber-400', icon: Heart, textColor: 'text-amber-50' },
  { id: 3, type: 'parking', label: 'استراحت', color: 'from-emerald-500 to-green-400', icon: Star, textColor: 'text-emerald-50' },
  { id: 4, type: 'dare', label: 'جرأت', color: 'from-violet-600 to-purple-500', icon: AlertCircle, textColor: 'text-purple-50' },
  { id: 5, type: 'kiss', label: 'بوسه', color: 'from-pink-600 to-rose-400', icon: Flame, textColor: 'text-pink-50' },
  { id: 6, type: 'jail', label: 'زندان عشق', color: 'from-slate-700 to-slate-600', icon: Lock, textColor: 'text-slate-300' },
];

const DiceIcon = ({ value, rolling }) => {
  const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  const TheIcon = icons[value - 1] || Dice1;
  return <TheIcon className={`w-10 h-10 ${rolling ? 'animate-spin text-white opacity-80' : 'text-white'}`} />;
};

export default function App() {
  const [players, setPlayers] = useState([
    { id: 0, name: 'بازیکن ۱', position: 0, color: 'bg-rose-500', shadow: 'shadow-rose-500/50', jailed: false, missedTurn: false },
    { id: 1, name: 'بازیکن ۲', position: 0, color: 'bg-cyan-500', shadow: 'shadow-cyan-500/50', jailed: false, missedTurn: false },
  ]);
  const [turn, setTurn] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [gameLog, setGameLog] = useState(["به بازی حلقه عشق خوش آمدید! ❤️"]);

  const currentPlayer = players[turn];

  const addToLog = (msg) => {
    setGameLog(prev => [msg, ...prev].slice(0, 2)); // Keep logs cleaner
  };

  const rollDice = () => {
    if (isRolling || activeCard) return;

    if (currentPlayer.jailed) {
      if (currentPlayer.missedTurn) {
        const newPlayers = [...players];
        newPlayers[turn].jailed = false;
        newPlayers[turn].missedTurn = false;
        setPlayers(newPlayers);
        addToLog(`${currentPlayer.name} آزاد شد! حالا تاس بریز.`);
      } else {
        const newPlayers = [...players];
        newPlayers[turn].missedTurn = true;
        setPlayers(newPlayers);
        addToLog(`${currentPlayer.name} در زندان است و نوبت سوخت! 🚫`);
        setTurn(turn === 0 ? 1 : 0);
        return;
      }
    }

    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 12) {
        clearInterval(interval);
        finalizeRoll();
      }
    }, 80);
  };

  const finalizeRoll = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);
    setIsRolling(false);
    movePlayer(roll);
  };

  const movePlayer = (steps) => {
    const newPlayers = [...players];
    const currentPos = newPlayers[turn].position;
    let newPos = (currentPos + steps) % 6;
    
    newPlayers[turn].position = newPos;
    setPlayers(newPlayers);

    const space = BOARD_SPACES[newPos];
    setTimeout(() => handleSpace(space), 400); // Small delay for movement effect
  };

  const handleSpace = (space) => {
    if (space.type === 'jail') {
      addToLog(`${currentPlayer.name} رفت زندان! 🔒`);
      const newPlayers = [...players];
      newPlayers[turn].jailed = true;
      newPlayers[turn].missedTurn = false;
      setPlayers(newPlayers);
      setTimeout(() => setTurn(turn === 0 ? 1 : 0), 2000);
    } 
    else if (space.type === 'parking') {
       addToLog("استراحت کن! 🌟");
       setTimeout(() => setTurn(turn === 0 ? 1 : 0), 1500);
    } 
    else {
      drawCard(space.type);
    }
  };

  const drawCard = (type) => {
    const deck = CardData[type];
    if (deck) {
      const randomCard = deck[Math.floor(Math.random() * deck.length)];
      setActiveCard({ ...randomCard, type });
    }
  };

  const closeCard = () => {
    setActiveCard(null);
    setTurn(turn === 0 ? 1 : 0);
  };

  // رنگ‌بندی داینامیک برای کارت‌ها
  const getCardStyle = (type) => {
    switch(type) {
      case 'kiss': return 'from-pink-600 to-rose-900 shadow-pink-500/40';
      case 'hug': return 'from-orange-500 to-amber-800 shadow-orange-500/40';
      case 'truth': return 'from-blue-600 to-indigo-900 shadow-blue-500/40';
      case 'dare': return 'from-purple-600 to-violet-900 shadow-purple-500/40';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const getCardTypeLabel = (type) => {
    switch(type) {
      case 'kiss': return 'بوسـه';
      case 'hug': return 'آغـوش';
      case 'truth': return 'حقیـقت';
      case 'dare': return 'جـرأت';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans overflow-hidden relative" dir="rtl">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-slate-950 to-black z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('[https://www.transparenttextures.com/patterns/stardust.png](https://www.transparenttextures.com/patterns/stardust.png)')] opacity-10 z-0"></div>

      {/* Header */}
      <header className="relative z-10 pt-6 pb-2 text-center">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] flex items-center justify-center gap-3">
          <Sparkles className="text-yellow-300 w-6 h-6 animate-pulse" /> 
          لوپِ عاشقانــه 
          <Sparkles className="text-yellow-300 w-6 h-6 animate-pulse" />
        </h1>
      </header>

      {/* Main Game Area */}
      <main className="relative z-10 flex-1 max-w-md mx-auto w-full p-5 flex flex-col gap-6 justify-center">

        {/* Player Status Bar */}
        <div className="flex justify-between items-stretch gap-4">
          {players.map((p, idx) => {
             const isActive = turn === idx;
             return (
               <div key={p.id} className={`flex-1 transition-all duration-500 rounded-2xl p-3 border border-white/10 backdrop-blur-md relative overflow-hidden ${isActive ? 'bg-white/10 scale-105 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-white/5 opacity-60'}`}>
                 <div className="flex items-center gap-3 relative z-10">
                   <div className={`w-8 h-8 rounded-full ${p.color} ${p.shadow} shadow-lg ring-2 ring-white/20 flex items-center justify-center`}>
                      <span className="text-xs font-bold">{idx + 1}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold text-sm">{p.name}</span>
                     {p.jailed && <span className="text-[10px] text-red-300 flex items-center gap-1"><Lock size={10}/> زندانی</span>}
                   </div>
                 </div>
                 {isActive && <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>}
               </div>
             )
          })}
        </div>

        {/* The Board - Modern Grid Layout */}
        <div className="grid grid-cols-2 gap-4 relative py-2">
          {/* Connecting Line Effect (Visual Only) */}
          <div className="absolute inset-0 border-4 border-white/5 rounded-[2rem] pointer-events-none transform scale-105 z-0"></div>

          {BOARD_SPACES.map((space, index) => {
            const isP1Here = players[0].position === index;
            const isP2Here = players[1].position === index;
            
            return (
              <div 
                key={space.id} 
                className={`
                  relative h-36 rounded-2xl flex flex-col items-center justify-center p-3 text-center 
                  bg-gradient-to-br ${space.color} 
                  shadow-lg transition-all duration-300 border border-white/10
                  ${(isP1Here || isP2Here) ? 'ring-4 ring-white/30 scale-[1.02] z-20 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'hover:scale-[1.01] opacity-90'}
                `}
              >
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>

                <div className="relative z-10">
                  <div className="bg-white/20 p-2 rounded-full mb-2 inline-flex backdrop-blur-sm shadow-inner">
                    <space.icon size={28} className="text-white drop-shadow-md" />
                  </div>
                  <h3 className={`font-bold text-lg ${space.textColor} drop-shadow-md tracking-wide`}>{space.label}</h3>
                </div>

                <div className="absolute top-2 right-3 text-4xl font-black text-white/10 select-none">{space.id}</div>

                {/* Tokens */}
                <div className="absolute -bottom-3 flex gap-2 z-30">
                  {isP1Here && (
                    <div className="w-8 h-8 bg-rose-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(244,63,94,0.6)] flex items-center justify-center text-white text-xs font-bold animate-bounce">
                      ۱
                    </div>
                  )}
                  {isP2Here && (
                    <div className="w-8 h-8 bg-cyan-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(6,182,212,0.6)] flex items-center justify-center text-white text-xs font-bold animate-bounce" style={{animationDelay: '100ms'}}>
                      ۲
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls Section */}
        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center gap-4 relative overflow-hidden">
           {/* Glass reflection */}
           <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

          <div className="w-full flex justify-between items-center px-2">
             <div className="text-xs text-slate-400">نوبتِ:</div>
             <div className={`text-lg font-bold ${turn === 0 ? 'text-rose-400' : 'text-cyan-400'}`}>
                {currentPlayer.name}
             </div>
          </div>

          <button 
            onClick={rollDice} 
            disabled={isRolling || activeCard}
            className={`
              w-full h-16 rounded-2xl flex items-center justify-center gap-4 text-xl font-bold shadow-lg transition-all active:scale-95 group relative overflow-hidden
              ${isRolling || activeCard 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:shadow-[0_0_20px_rgba(192,38,211,0.5)]'
              }
            `}
          >
            {/* Button Shine Effect */}
            {!isRolling && !activeCard && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>}
            
            <span className="z-10">{isRolling ? 'در حال چرخش...' : 'تاس بریز!'}</span>
            <div className="relative z-10">
               <DiceIcon value={diceValue} rolling={isRolling} />
            </div>
          </button>

          {/* Compact Log */}
          <div className="w-full bg-black/20 p-3 rounded-xl border border-white/5 h-12 flex items-center justify-center overflow-hidden">
            <p className="text-sm text-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-300 text-center w-full truncate">
               {gameLog[0]}
            </p>
          </div>
        </div>
      </main>

      {/* --- Card Modal (The "Immersive" Part) --- */}
      {activeCard && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className={`
            relative w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl transform transition-all scale-100 animate-in zoom-in-95 duration-300
            bg-gradient-to-br ${getCardStyle(activeCard.type)} text-white border border-white/20
          `}>
            
            {/* Particles Effect (Background) */}
            <div className="absolute inset-0 bg-[url('[https://www.transparenttextures.com/patterns/cubes.png](https://www.transparenttextures.com/patterns/cubes.png)')] opacity-20 mix-blend-overlay"></div>

            {/* Header */}
            <div className="p-8 pb-4 text-center relative z-10">
              <button onClick={closeCard} className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors backdrop-blur-sm">
                <X size={20} />
              </button>
              
              <div className="text-7xl mb-4 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] animate-bounce-slow">
                {activeCard.icon}
              </div>
              
              <h2 className="text-3xl font-black uppercase tracking-wider mb-1 drop-shadow-md">
                {getCardTypeLabel(activeCard.type)}
              </h2>
              
              <div className="inline-block px-3 py-1 bg-black/30 rounded-full text-xs font-medium border border-white/20">
                سطح: {activeCard.intensity}
              </div>
            </div>

            {/* Body */}
            <div className="px-8 pb-8 text-center relative z-10 flex flex-col gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-inner">
                <h3 className="text-xl font-bold mb-3 text-white/90">{activeCard.title}</h3>
                <p className="text-lg leading-relaxed font-light text-white/90">
                  {activeCard.description}
                </p>
              </div>

              <button 
                onClick={closeCard}
                className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg active:scale-95"
              >
                انجام دادم! ✅
              </button>
            </div>
            
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
}
