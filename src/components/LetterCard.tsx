import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface LetterCardProps {
  title: string;
  subtitle: string;
  content: string[];
  signature: string;
  variant: 'apology' | 'wishes';
  icon: React.ReactNode;
}

const LetterCard = ({ title, subtitle, content, signature, variant, icon }: LetterCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isApology = variant === 'apology';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Envelope/Card */}
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative cursor-pointer rounded-2xl p-1 transition-all duration-500
          ${isApology ? 'box-glow-red' : 'box-glow'}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Outer glow border */}
        <div className={`
          absolute inset-0 rounded-2xl opacity-50
          ${isApology 
            ? 'bg-gradient-to-br from-secondary/30 via-transparent to-secondary/20' 
            : 'bg-gradient-to-br from-primary/30 via-transparent to-accent/20'
          }
        `} />

        {/* Card content */}
        <div className={`
          relative rounded-xl p-6 sm:p-8 backdrop-blur-sm
          ${isApology ? 'gradient-card' : 'gradient-card-warm'}
        `}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`
              p-3 rounded-full
              ${isApology 
                ? 'bg-secondary/20 text-secondary' 
                : 'bg-primary/20 text-primary'
              }
            `}>
              {icon}
            </div>
            <div>
              <h3 className={`
                text-2xl sm:text-3xl font-handwritten font-bold
                ${isApology ? 'text-secondary' : 'text-primary'}
                text-glow-soft
              `}>
                {title}
              </h3>
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            </div>
          </div>

          {/* Tap hint */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-4">
            <Sparkles className="w-4 h-4 animate-twinkle" />
            <span>{isOpen ? 'Tap to close' : 'Tap to read'}</span>
            <Sparkles className="w-4 h-4 animate-twinkle" style={{ animationDelay: '500ms' }} />
          </div>

          {/* Letter content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className={`
                  relative p-6 rounded-xl my-4
                  bg-gradient-to-br from-foreground/5 to-transparent
                  border border-border/30
                `}>
                  {/* Decorative corner */}
                  <div className={`
                    absolute top-2 right-2 w-8 h-8 opacity-30
                    ${isApology ? 'text-secondary' : 'text-primary'}
                  `}>
                    <Heart className="w-full h-full" fill="currentColor" />
                  </div>

                  {/* Letter text */}
                  <div className="font-handwritten text-xl sm:text-2xl leading-relaxed text-foreground/90 space-y-4">
                    {content.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  {/* Signature */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: content.length * 0.2 }}
                    className={`
                      mt-6 pt-4 border-t border-border/20 text-right
                      font-handwritten text-2xl
                      ${isApology ? 'text-secondary' : 'text-primary'}
                    `}
                  >
                    {signature}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LetterCard;
