import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const greetings = [
  'Hello',              // English
  'Bonjour',            // French
  'Hallo',              // German/Dutch
  'Ciao',               // Italian
  'Hola',               // Spanish
  'Olá',                // Portuguese
  'Hej',                // Swedish/Danish
  'Sveiki',             // Latvian
  'Γειά',               // Greek
  'Здравствуйте',       // Russian
  'Namaste',            // Hindi
  'Salaam',             // Persian/Urdu
  'Merhaba',            // Turkish
  'Aloha',              // Hawaiian
  'Konnichiwa',         // Japanese
  'Annyeonghaseyo',     // Korean
  'Nǐ hǎo',             // Chinese (Mandarin)
  'Selamat siang',      // Indonesian
  'Shalom',             // Hebrew
  'Habari',             // Swahili
  'Sawasdee',           // Thai
  'Xin chào',           // Vietnamese
  'Dzień dobry',        // Polish
  'God dag',            // Norwegian
  'Halo',               // Malay
  'Tere',               // Estonian
  'Ahoy',               // Czech/Slovak
  'Kia ora'             // Māori
];

const TypingHello = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentGreeting = greetings[currentIndex];
    let timeout;

    if (isTyping) {
      // Typing phase
      if (displayText.length < currentGreeting.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentGreeting.slice(0, displayText.length + 1));
        }, 100);
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        // Finished deleting, move to next greeting
        setCurrentIndex((prev) => (prev + 1) % greetings.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isTyping]);

  return (
    <motion.h1 
      className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-8 text-glow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <span className="typing-animation bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
        {displayText}
      </span>
    </motion.h1>
  );
};

export default TypingHello;