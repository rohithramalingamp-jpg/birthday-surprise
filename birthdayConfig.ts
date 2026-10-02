/**
 * ====================================================================
 * 🎂 BIRTHDAY CONFIGURATION - CUSTOMIZE EVERYTHING HERE
 * ====================================================================
 * You can easily personalize Shamili's birthday website from this file!
 * Change the name, messages, card contents, music, and accents below.
 * ====================================================================
 */

export interface BirthdayCardConfig {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  secretMessage: string;
  glowColor: string;
  badge: string;
}

export interface BirthdayConfig {
  /**
   * The name of the birthday person.
   * Change "Shamili" here to update it everywhere across the website!
   */
  recipientName: string;

  /**
   * Nickname or short pet name (optional)
   */
  nickname: string;

  /**
   * Path to background audio file.
   * Drop your MP3 file (e.g. birthday-music.mp3) into the /public folder!
   * An ambient celestial melody will play automatically if this file is not yet uploaded.
   */
  musicUrl: string;

  /**
   * SCREEN 1: Mystery Intro
   */
  screen1: {
    greeting: string;
    subtext: string;
    buttonLabel: string;
  };

  /**
   * SCREEN 2: Birthday Reveal
   */
  screen2: {
    tagline: string;
    revealTitle: string;
    nameSuffix: string;
    subtitle: string;
    buttonLabel: string;
  };

  /**
   * SCREEN 3: Personal Message
   */
  screen3: {
    heading: string;
    paragraphs: string[];
    buttonLabel: string;
  };

  /**
   * SCREEN 4: Three Surprise Cards
   */
  cards: BirthdayCardConfig[];

  /**
   * SCREEN 5: Countdown
   */
  screen5: {
    prompt: string;
    countdownStart: number;
    revealNotice: string;
  };

  /**
   * SCREEN 6: Final Birthday Message & Wishes
   */
  screen6: {
    mainHeading: string;
    leadParagraph: string;
    affirmation: string;
    footerSignoff: string;
  };

  /**
   * Interactive Virtual Cake & Wish Jar settings
   */
  extras: {
    showCake: boolean;
    cakeWishPrompt: string;
    blownCandlesMessage: string;
    wishJarMessages: string[];
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  // 1. RECIPIENT NAME
  recipientName: "Shamili",
  nickname: "Shamili",

  // 2. BACKGROUND MUSIC PATH
  // Drop your audio file named `birthday-music.mp3` in the `public` folder.
  // The app will attempt to load this first, and gracefully falls back to a real-time
  // soothing Web Audio synthesizer if no mp3 is present!
  musicUrl: "/birthday-music.mp3",

  // 3. SCREEN 1: MYSTERY INTRO
  screen1: {
    greeting: "Hey Shamili... 👀",
    subtext: "I made something special for you.",
    buttonLabel: "Don't Click This 👀",
  },

  // 4. SCREEN 2: BIRTHDAY REVEAL
  screen2: {
    tagline: "A SPECIAL MOMENT FOR A SPECIAL SOUL",
    revealTitle: "HAPPY BIRTHDAY",
    nameSuffix: "❤️",
    subtitle: "Today is your day.",
    buttonLabel: "There's More ✨",
  },

  // 5. SCREEN 3: PERSONAL MESSAGE
  // Edit these lines or add new ones to say whatever is in your heart.
  screen3: {
    heading: "A Little Message For You 💌",
    paragraphs: [
      "Some people become part of our lives without making a big announcement.",
      "They simply become part of the conversations, the laughs, the random moments, and the memories we end up keeping.",
      "Today is your day, Shamili.",
      "So I wanted to create something a little different instead of just saying...",
      "Happy Birthday.",
      "I wanted to make you a tiny corner of the internet that is completely yours. ❤️",
    ],
    buttonLabel: "Keep Going →",
  },

  // 6. SCREEN 4: THREE SURPRISE CARDS
  // Each card unlocks an intimate thought or wish when tapped.
  cards: [
    {
      id: "card-1",
      icon: "🌷",
      title: "A Little Reminder",
      subtitle: "Tap to unfold",
      secretMessage: "Never forget how many people are lucky to have you in their lives.",
      glowColor: "from-pink-500/20 to-purple-500/20",
      badge: "01",
    },
    {
      id: "card-2",
      icon: "✨",
      title: "A Tiny Wish",
      subtitle: "Tap to unfold",
      secretMessage: "May this year bring you more laughter, unexpected happiness, beautiful memories, and fewer unnecessary headaches. 😂✨",
      glowColor: "from-amber-500/20 to-rose-500/20",
      badge: "02",
    },
    {
      id: "card-3",
      icon: "🎁",
      title: "One Last Surprise",
      subtitle: "Tap to unfold",
      secretMessage: "You thought that was everything?",
      glowColor: "from-purple-500/20 to-indigo-500/20",
      badge: "03",
    },
  ],

  // 7. SCREEN 5: THE COUNTDOWN
  screen5: {
    prompt: "Wait...",
    countdownStart: 3,
    revealNotice: "Get ready for the grand finale...",
  },

  // 8. SCREEN 6: FINAL BIRTHDAY MESSAGE
  screen6: {
    mainHeading: "Happy Birthday, Shamili ❤️",
    leadParagraph:
      "May your new chapter be filled with happiness, unforgettable memories, good people, crazy laughter, and everything you've been wishing for.",
    affirmation: "Keep smiling. Keep being you. ✨",
    footerSignoff: "Made specially for Shamili.",
  },

  // 9. DELIGHTFUL EXTRAS: Interactive Cake & Wish Jar
  extras: {
    showCake: true,
    cakeWishPrompt: "Close your eyes, make a silent wish, and tap the candles to blow them out!",
    blownCandlesMessage: "Your wish has been sent to the stars! ✨ May it come true this year.",
    wishJarMessages: [
      "🌟 A year full of spontaneous road trips and uncontrollable giggles",
      "☕ Calm mornings and peaceful sunsets whenever you need a breather",
      "💫 Success in every single ambition and silent dream you hold close",
      "🍰 Guilt-free desserts and unlimited joyful moments with loved ones",
      "🌸 Continuous peace of mind and strength that never wavers",
      "🥂 Cheers to another 365 days of being uniquely, wonderfully you!",
    ],
  },
};
