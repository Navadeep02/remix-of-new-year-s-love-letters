import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface MessageData {
  recipientName: string;
  senderName: string;
  apologyTitle: string;
  apologyContent: string[];
  wishesTitle: string;
  wishesContent: string[];
}

const DEFAULT_DATA: MessageData = {
  recipientName: 'Friend',
  senderName: 'Your Friend',
  apologyTitle: "I'm Sorry",
  apologyContent: [
    "My dearest friend,",
    "I know words cannot undo the past, but I hope they can help heal the present. I'm truly sorry for the times I wasn't there when you needed me, for the moments I let you down, and for any pain I may have caused.",
    "You mean the world to me, and the thought of hurting you weighs heavy on my heart. Please know that every mistake I made taught me how precious our friendship truly is.",
    "I promise to be better, to listen more, to be present, and to cherish every moment we share together.",
    "Can you find it in your heart to forgive me?"
  ],
  wishesTitle: "Happy New Year",
  wishesContent: [
    "My wonderful friend,",
    "As we step into this new year together, my heart is filled with so much gratitude and hope. Having you in my life has been one of my greatest blessings.",
    "May this year bring you endless joy, beautiful surprises, and all the happiness your heart can hold. May your dreams take flight, your worries fade away, and your days be filled with laughter and love.",
    "Here's to new adventures, deeper connections, and memories that will last a lifetime. Thank you for being you – for your kindness, your patience, and your beautiful soul.",
    "Let's make this year our best one yet!"
  ]
};

export const useShareableLink = () => {
  const [searchParams] = useSearchParams();

  const messageData = useMemo((): MessageData => {
    const encoded = searchParams.get('m');
    if (!encoded) return DEFAULT_DATA;

    try {
      // Decode with decodeURIComponent to handle Unicode characters
      const decoded = decodeURIComponent(atob(encoded));
      const parsed = JSON.parse(decoded);
      return {
        ...DEFAULT_DATA,
        ...parsed,
      };
    } catch {
      return DEFAULT_DATA;
    }
  }, [searchParams]);

  const generateLink = useCallback((data: Partial<MessageData>): string => {
    const mergedData = { ...DEFAULT_DATA, ...data };
    // Use encodeURIComponent to handle Unicode characters before btoa
    const jsonStr = JSON.stringify(mergedData);
    const encoded = btoa(encodeURIComponent(jsonStr));
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?m=${encoded}`;
  }, []);

  const copyLinkToClipboard = useCallback(async (data: Partial<MessageData>): Promise<boolean> => {
    const link = generateLink(data);
    try {
      await navigator.clipboard.writeText(link);
      return true;
    } catch {
      return false;
    }
  }, [generateLink]);

  return {
    messageData,
    generateLink,
    copyLinkToClipboard,
    isCustomMessage: searchParams.has('m'),
  };
};