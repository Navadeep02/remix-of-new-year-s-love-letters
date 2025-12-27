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
    "My dearest friend,",
    "I know words cannot undo the past, but I hope they can help heal the present. I'm truly sorry for the times I wasn't there when you needed me, for the moments I let you down, and for any pain I may have caused.",
    "You mean the world to me, and the thought of hurting you weighs heavy on my heart. Please know that every mistake I made taught me how precious our friendship truly is.",
    "I promise to be better, to listen more, to be present, and to cherish every moment we share together.",
    "Can you find it in your heart to forgive me?"
  ];

  const wishesContent = [
    "My wonderful friend,",
    "As we step into this new year together, my heart is filled with so much gratitude and hope. Having you in my life has been one of my greatest blessings.",
    "May this year bring you endless joy, beautiful surprises, and all the happiness your heart can hold. May your dreams take flight, your worries fade away, and your days be filled with laughter and love.",
    "Here's to new adventures, deeper connections, and memories that will last a lifetime. Thank you for being you – for your kindness, your patience, and your beautiful soul.",
    "Let's make this year our best one yet!"
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