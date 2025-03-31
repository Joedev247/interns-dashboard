// src/components/home/HeroSection.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroTexts = [
    "Luxury Redefined",
    "Timeless Elegance",
    "Premium Fashion",
    "Exclusive Style"
  ];

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
      position: "center",
    },
    {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020",
      position: "center",
    },
    {
      image: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069",
      position: "center",
    },
    {
      image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=2073",
      position: "top",
    }
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const currentText = heroTexts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < currentText.length) {
          setCurrentCharIndex(prev => prev + 1);
        } else {
          setIsDeleting(true);
          setTimeout(() => { }, 2000);
        }
      } else {
        if (currentCharIndex > 0) {
          setCurrentCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentTextIndex, isDeleting]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[92vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundPosition: slide.position,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative h-full container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 text-white">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-fade-in drop-shadow-2xl">
            StyleStore
          </h1>
          <div className="h-20">
            <p className="text-4xl md:text-5xl font-light tracking-wide drop-shadow-lg">
              {heroTexts[currentTextIndex].substring(0, currentCharIndex)}
              <span className="animate-blink">|</span>
            </p>
          </div>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Experience the epitome of luxury fashion. Where style meets sophistication.
          </p>
          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => navigate('/shop')}
              className="bg-white text-gray-900 px-12 py-4 text-lg font-medium 
                       transition-all duration-300 transform hover:scale-105
                       hover:bg-opacity-90 backdrop-blur-md
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Shop Collection
            </button>
            <button
              onClick={() => navigate('/new-arrivals')}
              className="border-2 border-white text-white px-12 py-4 text-lg font-medium 
                       transition-all duration-300 transform hover:scale-105
                       hover:bg-white/10 backdrop-blur-md
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              New Arrivals
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                         ${index === currentSlide 
                           ? 'bg-white w-8' 
                           : 'bg-white/50 hover:bg-white/75'}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full
                     bg-black/20 hover:bg-black/30 transition-all duration-300 
                     backdrop-blur-md border border-white/20 group"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full
                     bg-black/20 hover:bg-black/30 transition-all duration-300 
                     backdrop-blur-md border border-white/20 group"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
