import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import StarryBackground from '@/components/StarryBackground';
import FloatingLanterns from '@/components/FloatingLanterns';
import FireworksDisplay from '@/components/FireworksDisplay';
import EiffelTower from '@/components/EiffelTower';
import FloatingHearts from '@/components/FloatingHearts';
import FloatingFlowers from '@/components/FloatingFlowers';
import LetterCard from '@/components/LetterCard';
import AerialFirework from '@/components/AerialFirework';
import HeartFirework from '@/components/HeartFirework';
import FireworkSoundManager from '@/components/FireworkSoundManager';
import SnowFall from '@/components/SnowFall';

const Index = () => {
  const apologyContent = [
    "My dear Rupa❤️‍🩹😊,",
    "I know words cannot undo the past, but I hope they can help heal the present. I'm truly sorry for the moments I let you down, and for any pain I may have caused.",
    "You mean the world to me, and the thought of hurting you weighs heavy on my heart. Please know that every mistake I made taught me how precious u are truly.",
    "Nv block chesthav ani mundhe telusu,ala behave chesthe block chesthav ane ala behave chesa and I thought if i become that kind of person u would hate and it makes easy for u to forget about me and be happy and i am sorry nenu mundhe anukuna ala behave chesthe block chesthav ani atleast I won in this😁",
    "But nv enduku antha kopam ga unavo naku telidhu but thats okay i deserved it neku sorry chepthe nachadhu ani telusu but I cant control myself cause naku na behaviour nachatledhu sarle inka elago end ayipoindhi I am happy",
    "Freedom gurinchi okay ni opinion neku undhi but i know how harsh it is ouside of our comfort zone or the fake people,u are one of the strongest person I had ever met so I have assurance about u that u will succed in life and dont fight for anything live through everything happiness and bad days it is part of life and don't think it is as a fight it is ur pife u dont need to fight for anything if u think it as a fight u will tired of it take it as a way of how u should live with ur own choices to be happy i know na opinion ki values ledhu ani bit that's okay I said what i wanted to say",
    "Naku self-respect ledhu ani anukuntunav anni sarlu sorry chepthunanduku nadhi mistake anipisthe nenu sorry cheptha and nv em anukunte adhi anukuno nenu evari kosam na character marchukonu",
    "Thanku for being a wonderful friend for me,I am really thankful and appreciate ur support☺️ and friendship visyam lo naku friends leru ante I meant u are enough ani,naku evari sympathy avasaram ledhu nenu eppudu na space lo unta,I really dont need anyone but u are an exception ippudu nv kuda avasaram ledhu,the way u talked killed everything inside me and okay ni kopam ki reason undhi and i understand that nad lastly neku elogolaga use ayanu I am happy for that naku ayina antha varaku help chesa but I tried my best",
    "Nenu spoil chesanu ante nenu em cheyali nv kuda nannu friend ani anukovali ga parathi sari nene anni initiate chesthe okasari na side nunchi alochinchi chudu appudu nike ardhamavuthundhi enduku overthink chesano ani,i started to overthink and naku telusu niku chala mandhi friends unnaru ani nenu important kadhu ani but if need me anytime just unblock chesi oka message cheyu I will be there within seconds for you, remember I will always care for u and be there for u I promised that❤️‍🩹",
    "I hope u will forgive me for my behaviour and u will never see me like that,chepadaniki chala undhi but anyhow I dont care annav inka chalu le new year wish vere letter lo rasa chudu okavela motham chaduvuthe website ela undho chepu a crackers sound adhi work avuthundhi ledho kuda telidhu okasari chepu"
  ];

  const wishesContent = [
    "My Dear Rupa or sreeee❤️✨,",
    "Rupa,the best person I had ever met,my number one priority,the person I care most,I wish u a Happy Happy Happy new year ra Rupa❤️,e year jarigindhi anni marchipo whatever it is or who ever it is inka focus on yourself and make ur life happy and the way u wanted,I fucking belive in u I know u can achieve everything,i pray for your sucess and belive me I really want to see u successful and achieve everything u wanted and explore the place u wanted and be super duper fucking happy ",
    "Make ur parents proud and prove urself and show everyone what u are really and the person who is super storng and can achive everything and in your terms fight for everything you wanted learn from the experiences and improve urself and enjoy the process ra rupa it will be super easy to do if enjoy the success or hardships and take it as a motivation and prove urself for anyone who doubted on you or left u and dont worry about the persons who left u,u are fucking special u carry a chram around and u jave the greatest smile and nv chala baguntav a smile tho dont ever lose it ",
    "I really belive in u ra rupa a bank exams clear chesi I want to see u in a better position abd be super happy and confident, independent women,it hurts to remember that i wont be there in this process or see ur success or there for u in ur hardships but oka message rupa I would do anything for ur sucess ni kanna naku ni medha namakam ekkuva anduke I always try push u for ur success✨",
    "I hope from now year every year u will celebrate happily and forget everything u faced and learned from them and use these experiences to become a better person,inka entha chepina nv elago patinchukovu but okay malli chepthuna I will always care for u,be there for u and one last time I love you Rupa❤️❤️❤️❤️❤️,I am super happy that i met u and loved u unconditionally and made sure u never felt alone,u can hate me or whatever misunderstand chesukunapudu nenu em cheyali parthisari so no regrets",
    "As we step into this new year together, my heart is filled with so much gratitude and hope. Having you in my life has been one of my greatest blessings.",
    "May this year bring you endless joy, beautiful surprises, and all the happiness your heart can hold. May your dreams take flight, your worries fade away, and your days be filled with laughter and love.",
    "Here's to new adventures, deeper connections, and memories that will last a lifetime. Thank you for being you – for your kindness, your patience, and your beautiful soul.",
    "Motham chadivuthav ane anukuntuna chala efforts peti chesa e website to make u happy,inka chala chepali ani undhi kani odhule inka bye byeeeee rupa👋🏻👋🏻🙏🏻🙏🏻🙏🏻🙏🏻,It hurts to say goodbye or getting blocked and antilo nve first block kuda u are first person who will ever block me🤣😭🤣,inka anthe love u and happy year🎊✨"
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Sound Manager */}
      <FireworkSoundManager />
      
      {/* Background elements */}
      <StarryBackground />
      <SnowFall />
      <EiffelTower />
      <FloatingHearts />
      <FloatingFlowers />
      <FloatingLanterns />
      <FireworksDisplay />
      
      {/* Reduced aerial fireworks for performance */}
      <AerialFirework startX={25} delay={1000} color="gold" />
      <AerialFirework startX={75} delay={3000} color="cyan" />
      
      {/* Reduced heart fireworks for performance */}
      <HeartFirework startX={20} delay={2500} color="#FF69B4" />
      <HeartFirework startX={50} delay={4500} color="#FF1493" />
      <HeartFirework startX={80} delay={6000} color="#FF6B6B" />

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center"
          >
            {/* Decorative stars */}
            <div className="flex justify-center gap-4 mb-6">
              {[0, 1, 2].map((i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-primary animate-twinkle fill-primary"
                  style={{ animationDelay: `${i * 300}ms` }}
                />
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-handwritten text-primary text-glow mb-6">
              A Special New Year
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwritten text-accent text-glow-soft mb-4">
              Message for You
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-handwritten text-secondary text-glow-soft mb-8">
              Dear Rupa ❤️
            </h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed"
            >
              In the warmth of friendship and my love for u and the magic of a new beginning in your life,
              <br />
              I've written these words from my heart to yours.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-16"
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Sparkles className="w-5 h-5 animate-twinkle" />
                <span className="text-sm">Scroll to discover</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
                >
                  <div className="w-1.5 h-3 bg-primary rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Letters Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-handwritten text-primary text-glow mb-4">
                Two Letters, One Heart
              </h2>
              <p className="text-muted-foreground">
                Tap each letter to reveal what's inside
              </p>
            </motion.div>

            {/* Apology Letter */}
            <LetterCard
              title="I'm Sorry"
              subtitle="A letter from my heart"
              content={apologyContent}
              signature="With all my love and regret ❤️"
              variant="apology"
              icon={<Heart className="w-6 h-6" />}
            />

            {/* Wishes Letter */}
            <LetterCard
              title="Happy New Year"
              subtitle="Wishes for our beautiful journey ahead"
              content={wishesContent}
              signature="Forever your friend ✨"
              variant="wishes"
              icon={<Sparkles className="w-6 h-6" />}
            />
          </div>
        </section>

        {/* Footer Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
              <Heart className="w-6 h-6 text-secondary animate-glow-pulse" fill="currentColor" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
            </div>

            <p className="text-2xl sm:text-3xl font-handwritten text-foreground/90 leading-relaxed mb-8">
              "Thanku for being part of my life.
              <br />
              <span className="text-primary text-glow-soft">
                May 2026 bring you happiness and success in everything you do.
              </span>"
            </p>

            {/* Final sparkles */}
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <Sparkles
                  key={i}
                  className="w-5 h-5 text-accent animate-twinkle"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>

            {/* Year */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="mt-12"
            >
              <span className="text-6xl sm:text-8xl font-bold font-handwritten text-primary text-glow">
                2026
              </span>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default Index;