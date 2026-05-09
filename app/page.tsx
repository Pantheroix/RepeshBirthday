'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function BirthdayPage() {
  const [emojis, setEmojis] = useState<Array<{ id: number; left: number; emoji: string }>>([]);
  const [gifs, setGifs] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);
  const [needsAudioInteraction, setNeedsAudioInteraction] = useState(false);
  const rickrollAudioRef = useRef<HTMLAudioElement | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const animationFrameRef = useRef<number | null>(null);

  // Media items with photos and videos mixed
  const media = [
    { type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.44.08%20PM%20%281%29-cUcml6OHbPE4BuSd36G59BuYiDDT8s.jpeg' },
    { type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.44.08%20PM-h5lpngRQoQvLBOyQf8ouYu0RD1t7To.jpeg' },
    { type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.49.03%20PM-JM3B87z4Jh3QucNocUyJtx7wcs6oTb.jpeg' },
    { type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.44.07%20PM-NfaDFxQtfJDse55mSrWiBqOpGd6xex.jpeg' },
    { type: 'video', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video1-ABxtsZ4BkOIE5mySCWkZxm5bYRPmNy.mp4' },
    { type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.45.38%20PM-JILndHhqtR5Yr0EVfRQjOQCdnPglTU.jpeg' },
    { type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.49.06%20PM%20%281%29-DZqmvmlGRi6vwxZju32TatL4U7LMgz.jpeg' },
    { type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.49.04%20PM-3q4Pmqc7sHW6absKVCK9cEzgJwEMa3.jpeg' },
    { type: 'video', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video2-Ghi0bro5ur9q4Iuk24OCAPxLHdWKiT.mp4' },
    { type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.44.09%20PM-TdhrCa4HX0Xy0Be8bFgBuEJVwQIVLI.jpeg' },
  ];

  const emojiList = ['\u{1F389}', '\u{1F38A}', '\u{1F388}', '\u{1F381}', '\u{1F602}', '\u{1F525}', '\u{1F451}', '\u{1F4AF}', '\u{1F3AD}', '\u{1F3AA}'];

  const tryStartRickroll = useCallback(async () => {
    const audio = rickrollAudioRef.current;
    if (!audio) return false;

    try {
      await audio.play();
      setNeedsAudioInteraction(false);
      return true;
    } catch {
      setNeedsAudioInteraction(true);
      return false;
    }
  }, []);

  useEffect(() => {
    // Initialize Rick Roll audio with loop
    const rickAudio = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rick-Roll-Sound-Effect-2lwHnUL34UKuJry8yKMDsOlOcdzaUL.mp3');
    rickAudio.loop = true;
    rickAudio.volume = 0.5;
    rickrollAudioRef.current = rickAudio;

    // Try autoplay first, then retry once the user interacts with the page.
    const unlockOnInteraction = () => {
      void tryStartRickroll();
    };

    void tryStartRickroll();
    window.addEventListener('pointerdown', unlockOnInteraction);
    window.addEventListener('keydown', unlockOnInteraction);

    // Create falling emojis
    const createEmoji = () => {
      const newEmoji = {
        id: Date.now(),
        left: Math.random() * 100,
        emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      };
      setEmojis((prev) => [...prev, newEmoji]);

      // Remove emoji after animation
      setTimeout(() => {
        setEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
      }, 3000);
    };

    const emojiInterval = setInterval(createEmoji, 300);

    // Create bouncing GIFs
    const createGif = () => {
      const newGif = {
        id: Date.now() + Math.random(),
        x: Math.random() * (window.innerWidth - 80),
        y: Math.random() * (window.innerHeight - 80),
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
      };
      setGifs((prev) => [...prev, newGif]);
    };

    const gifInterval = setInterval(createGif, 2000);

    return () => {
      window.removeEventListener('pointerdown', unlockOnInteraction);
      window.removeEventListener('keydown', unlockOnInteraction);
      clearInterval(emojiInterval);
      clearInterval(gifInterval);
      rickAudio.pause();
      rickAudio.src = '';
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [tryStartRickroll]);

  // Animate bouncing GIFs
  useEffect(() => {
    const animate = () => {
      setGifs((prevGifs) =>
        prevGifs
          .map((gif) => {
            let newX = gif.x + gif.vx;
            let newY = gif.y + gif.vy;
            let newVx = gif.vx;
            let newVy = gif.vy;

            // Bounce off walls
            if (newX < 0 || newX > window.innerWidth - 80) {
              newVx = -newVx;
              newX = Math.max(0, Math.min(window.innerWidth - 80, newX));
            }
            if (newY < 0 || newY > window.innerHeight - 80) {
              newVy = -newVy;
              newY = Math.max(0, Math.min(window.innerHeight - 80, newY));
            }

            return { ...gif, x: newX, y: newY, vx: newVx, vy: newVy };
          })
          .filter((gif) => {
            const age = Date.now() - gif.id;
            return age < 15000; // Remove GIF after 15 seconds
          })
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle video play/pause for audio switching
  const handleVideoPlay = (index: number) => {
    if (rickrollAudioRef.current) {
      rickrollAudioRef.current.pause();
    }
  };

  const handleVideoPause = () => {
    void tryStartRickroll();
  };

  return (
    <div className="w-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 relative overflow-x-hidden">
      {/* Bouncing GIFs */}
      {gifs.map((gif) => (
        <img
          key={gif.id}
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/undefined%20-%20Imgur-YZ7CssEE7yVwKkzBF07jWFh5Qdwr73.gif"
          alt="bouncing cake"
          className="fixed pointer-events-none z-50 w-20 h-20"
          style={{
            left: `${gif.x}px`,
            top: `${gif.y}px`,
          }}
        />
      ))}

      {/* Falling Emojis */}
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="fixed text-4xl animate-bounce pointer-events-none z-40"
          style={{
            left: `${emoji.left}%`,
            top: '-50px',
            animation: 'fall 3s linear forwards',
          }}
        >
          {emoji.emoji}
        </div>
      ))}

      {needsAudioInteraction && (
        <div className="fixed top-4 right-4 z-[60]">
          <button
            onClick={() => {
              void tryStartRickroll();
            }}
            className="rounded-full border-2 border-white bg-black/70 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80"
          >
            Tap to start music
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Title */}
        <div className="text-center mb-8 animate-bounce">
          <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-lg mb-4">
            REPESH ROY
          </h1>
          <p className="text-2xl md:text-4xl text-yellow-300 font-bold drop-shadow-lg">
            HAPPY BIRTHDAY LEGEND!
          </p>
          <p className="text-lg text-white font-bold mt-2">Scroll up for surprises!</p>
        </div>

        {/* Flying Photos - Grid */}
        <div className="relative w-full max-w-6xl h-96 mb-8">
          {media.slice(0, 8).map((item, idx) => (
            item.type === 'image' && (
              <div
                key={idx}
                className="absolute rounded-lg overflow-hidden shadow-2xl transform hover:scale-110 transition-transform duration-300 border-4 border-white"
                style={{
                  width: '140px',
                  height: '140px',
                  left: `${(idx % 4) * 25 + 10 + Math.sin(idx) * 20}%`,
                  top: `${(Math.floor(idx / 4) * 40 + Math.cos(idx) * 25)}px`,
                  transform: `rotate(${idx * 15}deg)`,
                  animation: `float 4s ease-in-out ${idx * 0.3}s infinite`,
                }}
              >
                <img
                  src={item.url}
                  alt={`Repesh moment ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          ))}
        </div>

        {/* Fun Messages */}
        <div className="bg-yellow-300 rounded-3xl p-6 max-w-md text-center shadow-2xl border-4 border-orange-400">
          <p className="text-2xl font-black text-orange-600 mb-3">
            FUN FACTS ABOUT REPESH
          </p>
          <ul className="text-left text-lg font-bold text-purple-600 space-y-2">
            <li>Black Spiderman of HKBK</li>
            <li>Professional Superman cosplayer</li>
            <li>Birthday legend status UNLOCKED</li>
            <li>100% meme material</li>
          </ul>
        </div>
      </div>

      {/* Scrollable Media Section */}
      <div className="relative z-5">
        {media.map((item, idx) => (
          <div
            key={idx}
            className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-transparent to-black/10"
          >
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={`Moment ${idx + 1}`}
                  className="w-full h-screen object-cover"
                />
              ) : (
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[idx] = el;
                  }}
                  src={item.url}
                  className="w-full h-screen object-cover"
                  controls
                  onPlay={() => handleVideoPlay(idx)}
                  onPause={handleVideoPause}
                  onEnded={handleVideoPause}
                />
              )}
            </div>

            {/* Click me button after 2nd last media item (idx = 8) */}
            {idx === media.length - 2 && (
              <div className="mt-12 flex justify-center">
                <Link href="/celebration">
                  <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-black text-3xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-white animate-bounce">
                    CLICK ME!
                  </button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>



      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}

