import React, { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

const TestimonialAndFAQ = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const testimonials = [
    {
      initial: 'S',
      name: 'Sarah Johnson',
      rating: 5,
      timeAgo: '2 weeks ago',
      content: 'The professional body care products have transformed my spa treatments. My clients love the results!',
      verified: true,
    },
    {
      initial: 'M',
      name: 'Michael Chen',
      rating: 5,
      timeAgo: '2 weeks ago',
      content: 'Superior quality body lotions that meet our high standards. The organic options are particularly popular.',
      verified: true,
    },
    {
      initial: 'E',
      name: 'Emma Rodriguez',
      rating: 5,
      timeAgo: '2 weeks ago',
      content: 'These professional-grade body lotions provide the perfect consistency for treatments.',
      verified: true,
    },
    {
      initial: 'J',
      name: 'John Smith',
      rating: 5,
      timeAgo: '3 weeks ago',
      content: 'Excellent products that consistently deliver great results. Highly recommended!',
      verified: true,
    },
  ]

  const faqs = [
    {
      question: "What makes your products professional grade?",
      answer: "Our products are formulated with high-quality ingredients and undergo rigorous testing to meet professional spa and salon standards. We use concentrated formulations that are specifically designed for professional treatments."
    },
    {
      question: "Are your products organic?",
      answer: "Yes, we offer a complete line of certified organic products. Our organic range is made with naturally sourced ingredients and is free from synthetic chemicals, preservatives, and artificial fragrances."
    },
    {
      question: "Do you offer samples for professionals?",
      answer: "Yes, we provide sample kits for licensed professionals. Please contact our professional support team with your credentials to request a sample kit."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day satisfaction guarantee on all our products. If you're not completely satisfied, you can return the unused portion for a full refund or exchange."
    },
    {
      question: "Do you offer bulk pricing for spas?",
      answer: "Yes, we offer special wholesale pricing for licensed spas and salons. Please create a professional account to access our wholesale pricing and bulk ordering options."
    }
  ]

  const slidesPerView = 3
  const totalSlides = Math.ceil(testimonials.length / slidesPerView)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="mb-20">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <img 
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
              alt="Google"
              className="h-6 object-contain"
            />
            <span className="text-gray-600">Reviews</span>
            <div className="flex items-center gap-1">
              <span className="font-medium">4.9</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-500 text-sm">(2,394)</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-1">What Our Customers Say</h2>
          <p className="text-gray-600 text-center">Read trusted reviews from our customers</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-none w-1/3 px-3">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-600">{testimonial.initial}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{testimonial.name}</h3>
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm">{testimonial.timeAgo}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{testimonial.content}</p>
                    {testimonial.verified && (
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <span>✓</span>
                        <span>Verified Purchase</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
            disabled={currentSlide === totalSlides - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalSlides)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full ${
                i === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default TestimonialAndFAQ