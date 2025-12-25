import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useShareableLink, MessageData } from '@/hooks/useShareableLink';
import { toast } from 'sonner';

const ShareLinkGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { messageData, copyLinkToClipboard, generateLink } = useShareableLink();

  const [formData, setFormData] = useState<Partial<MessageData>>({
    recipientName: messageData.recipientName,
    senderName: messageData.senderName,
    apologyContent: messageData.apologyContent,
    wishesContent: messageData.wishesContent,
  });

  const handleCopy = async () => {
    const success = await copyLinkToClipboard(formData);
    if (success) {
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy link');
    }
  };

  const generatedLink = generateLink(formData);

  return (
    <>
      {/* Floating Share Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <Share2 className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-handwritten text-primary">Create Shareable Link</h2>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Recipient's Name</label>
                  <Input
                    value={formData.recipientName || ''}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    placeholder="Enter recipient's name"
                    className="bg-muted/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Your Name</label>
                  <Input
                    value={formData.senderName || ''}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    placeholder="Enter your name"
                    className="bg-muted/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Apology Message</label>
                  <Textarea
                    value={formData.apologyContent?.join('\n\n') || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      apologyContent: e.target.value.split('\n\n').filter(p => p.trim()) 
                    })}
                    placeholder="Write your apology message..."
                    className="bg-muted/50 min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">New Year Wishes</label>
                  <Textarea
                    value={formData.wishesContent?.join('\n\n') || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      wishesContent: e.target.value.split('\n\n').filter(p => p.trim()) 
                    })}
                    placeholder="Write your new year wishes..."
                    className="bg-muted/50 min-h-[120px]"
                  />
                </div>

                {/* Generated Link */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <label className="text-xs text-muted-foreground mb-2 block">Your unique link:</label>
                  <div className="flex gap-2">
                    <Input
                      value={generatedLink}
                      readOnly
                      className="text-xs bg-background/50 font-mono"
                    />
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button onClick={handleCopy} className="w-full" size="lg">
                  {copied ? 'Copied!' : 'Copy Link to Share'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShareLinkGenerator;