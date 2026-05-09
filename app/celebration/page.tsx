'use client';

import { useEffect, useMemo, useState, useRef } from 'react';

export default function CelebrationPage() {
  const [candlesBlown, setCandlesBlown] = useState<number[]>([]);
  const [balloonsPopped, setBalloonsPopped] = useState<number[]>([]);
  const [showPhotos, setShowPhotos] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const repeshPhotos = [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.44.08%20PM%20%281%29-cUcml6OHbPE4BuSd36G59BuYiDDT8s.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.44.08%20PM-h5lpngRQoQvLBOyQf8ouYu0RD1t7To.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.49.03%20PM-JM3B87z4Jh3QucNocUyJtx7wcs6oTb.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.44.07%20PM-NfaDFxQtfJDse55mSrWiBqOpGd6xex.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.45.38%20PM-JILndHhqtR5Yr0EVfRQjOQCdnPglTU.jpeg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-09%20at%206.49.06%20PM%20%281%29-DZqmvmlGRi6vwxZju32TatL4U7LMgz.jpeg',
  ];

  const numCandles = 6;
  const numBalloons = 20;
  const balloonColors = [
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#FF8A65',
    '#FF6BB6', '#6BCB77', '#FF8A65', '#FFD93D', '#6BCB77',
    '#FF6B6B', '#4D96FF', '#FFB6D9', '#95E1D3', '#FF8A65',
    '#FF6BB6', '#6BCB77', '#FF8A65', '#FFD93D', '#6BCB77',
  ];

  const balloonConfigs = useMemo(
    () =>
      Array.from({ length: numBalloons }, (_, index) => ({
        left: Math.random() * 100,
        delay: index * 0.1,
        duration: 2.5 + Math.random() * 1.5,
      })),
    [numBalloons]
  );

  useEffect(() => {
    // Play celebration music
    const audio = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/music-WgEwZYMKrLueehGr2VkbsCALN3HYOY.mp3');
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;
    audio.play().catch(() => {
      console.log('[v0] Music autoplay blocked');
    });

    return () => {
      audio.pause();
    };
  }, []);

  // When all candles are blown, trigger balloons
  useEffect(() => {
    if (candlesBlown.length === numCandles && balloonsPopped.length === 0) {
      const popTimer = setTimeout(() => {
        // Automatically pop all balloons after a delay
        const allBalloons = Array.from({ length: numBalloons }, (_, i) => i);
        setBalloonsPopped(allBalloons);
        setShowPhotos(true);
      }, 1200);

      return () => {
        clearTimeout(popTimer);
      };
    }
  }, [candlesBlown.length, balloonsPopped.length, numCandles, numBalloons]);

  const handleCandleClick = (index: number) => {
    setCandlesBlown((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  // Generate random balloon positions and timings
  const generateBalloonStyle = (index: number) => {
    const config = balloonConfigs[index];

    return {
      left: `${config.left}%`,
      top: '100%',
      animation: balloonsPopped.includes(index)
        ? 'popBalloon 0.6s ease-out forwards'
        : `floatUp ${config.duration}s ease-in forwards`,
      animationDelay: `${config.delay}s`,
    };
  };

  return (
    <div 
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 px-4 pt-24 pb-20"
      style={{
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Balloon-Border-8pFwx75puhChShmQCIttjuuue4ZgEM.png)',
        backgroundPosition: 'top center',
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100px',
      }}
    >
      {/* Cake Container */}
      <div className="relative z-20 flex w-full max-w-4xl flex-col items-center gap-5 drop-shadow-2xl">
        <div className="rounded-3xl border-4 border-white/80 bg-white/85 px-5 py-4 text-center shadow-xl backdrop-blur-sm">
          <p className="text-lg font-black tracking-wide text-pink-700 sm:text-2xl">
            Tap all 6 candles to start the final surprise
          </p>
        </div>

        {/* SVG Cake */}
        <div className="mb-4 transform cursor-pointer transition-transform hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
            className="h-[18rem] w-[18rem] sm:h-[22rem] sm:w-[22rem]"
          >
            {/* Cake base - pink layers */}
            <ellipse cx="400" cy="500" rx="280" ry="80" fill="#FFB6D9" />
            <rect x="120" y="400" width="560" height="120" fill="#FF88C2" />
            <ellipse cx="400" cy="400" rx="280" ry="80" fill="#FF99CC" />
            
            {/* Cake middle layer */}
            <rect x="140" y="280" width="520" height="100" fill="#FFB6D9" />
            <ellipse cx="400" cy="280" rx="260" ry="70" fill="#FF99CC" />
            
            {/* Cake top layer */}
            <rect x="160" y="180" width="480" height="90" fill="#FF88C2" />
            <ellipse cx="400" cy="180" rx="240" ry="65" fill="#FF99CC" />
            
            {/* Frosting decoration */}
            <ellipse cx="400" cy="500" rx="290" ry="85" fill="none" stroke="#E91E63" strokeWidth="8" />
            <ellipse cx="400" cy="400" rx="280" ry="75" fill="none" stroke="#E91E63" strokeWidth="6" />
            <ellipse cx="400" cy="280" rx="270" ry="70" fill="none" stroke="#E91E63" strokeWidth="6" />

            {/* Interactive Candles - mapped from props */}
            {[
              { x: 200, name: '1' },
              { x: 280, name: '2' },
              { x: 360, name: '3' },
              { x: 440, name: '4' },
              { x: 520, name: '5' },
              { x: 600, name: '6' },
            ].map((candle, idx) => (
              <g key={idx} onClick={() => handleCandleClick(idx)} style={{ cursor: 'pointer' }}>
                {/* Candle stick */}
                <rect x={candle.x - 8} y="80" width="16" height="90" fill="#2C2C2C" />
                
                {/* Flame - only show if not blown */}
                {!candlesBlown.includes(idx) && (
                  <>
                    <ellipse cx={candle.x} cy="65" rx="12" ry="18" fill="#FFD700" opacity="0.9" />
                    <ellipse cx={candle.x} cy="60" rx="8" ry="14" fill="#FFA500" opacity="0.7" />
                    <ellipse cx={candle.x} cy="55" rx="4" ry="8" fill="#FF6B00" opacity="0.5" />
                  </>
                )}
                
                {/* Smoke when blown */}
                {candlesBlown.includes(idx) && (
                  <circle cx={candle.x} cy="50" r="8" fill="#999999" opacity="0.4" />
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Birthday Message */}
        <div className="rounded-3xl border-4 border-pink-500 bg-white px-6 py-4 text-center shadow-2xl sm:px-8">
          <p className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-2xl font-black text-transparent sm:text-3xl">
            HAPPY BIRTHDAY REPESH!
          </p>
        </div>
      </div>

      {/* Animated Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: numBalloons }).map((_, idx) => {
          return (
            <div
              key={idx}
              className={`absolute h-16 w-12 rounded-full shadow-lg transition-all sm:h-20 sm:w-14 ${
                balloonsPopped.includes(idx) ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                ...generateBalloonStyle(idx),
                backgroundColor: balloonColors[idx % balloonColors.length],
                pointerEvents: balloonsPopped.includes(idx) ? 'none' : 'auto',
              }}
            >
              {/* Balloon string */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0.5 h-32 bg-gradient-to-b from-gray-400 to-transparent"></div>
            </div>
          );
        })}
      </div>

      {/* Photos Gallery Modal */}
      {showPhotos && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowPhotos(false);
            }
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border-4 border-pink-500 bg-white p-5 shadow-2xl sm:p-8">
            <button
              onClick={() => setShowPhotos(false)}
              className="absolute right-4 top-4 rounded-full bg-pink-100 px-3 py-1 text-sm font-bold text-pink-700 transition-colors hover:bg-pink-200"
            >
              Close
            </button>
            <p className="mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-center text-3xl font-black text-transparent sm:mb-8 sm:text-4xl">
              REPESH'S UNFORGETTABLE MOMENTS
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {repeshPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={photo}
                    alt={`Repesh moment ${idx + 1}`}
                    className="h-44 w-full object-cover sm:h-48"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Instructions - Bottom Banner */}
      {candlesBlown.length < numCandles && (
        <div className="fixed bottom-6 left-1/2 z-30 w-max max-w-[90vw] -translate-x-1/2 transform rounded-full border-4 border-yellow-400 bg-white px-5 py-3 shadow-xl">
          <p className="text-center text-sm font-bold text-purple-600 sm:text-base">
            Blow out the candles ({candlesBlown.length}/{numCandles})
          </p>
        </div>
      )}

      {candlesBlown.length === numCandles && !showPhotos && (
        <div className="fixed bottom-6 left-1/2 z-30 w-max max-w-[90vw] -translate-x-1/2 transform rounded-full border-4 border-red-400 bg-white px-5 py-3 shadow-xl">
          <p className="text-center text-sm font-bold text-red-600 sm:text-base">
            Balloons popping!
          </p>
        </div>
      )}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
        
        @keyframes popBalloon {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
