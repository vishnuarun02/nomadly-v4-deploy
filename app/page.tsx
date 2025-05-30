"use client"

import { useState, useRef, useEffect } from "react"

const MOCK_ITINERARIES = [
  `# 3‑Day Tokyo Food & Temples

**Day 1:**  
• Arrive at Narita, check‑in in Shinjuku  
• Afternoon stroll through Asakusa & Senso‑ji Temple  
• Dinner at Memory Lane yakitori stalls  

**Day 2:**  
• Tsukiji Outer Market breakfast  
• Hamarikyu Gardens boat ride  
• Evening at Shibuya Crossing & ramen dinner  

**Day 3:**  
• Mt. Fuji day‑trip (Hakone)  
• Relax in an onsen with Fuji views  
• Return to Tokyo for farewell sushi dinner  
`,

  `# 4‑Day Bali Beaches & Yoga

**Day 1:**  
• Arrive in Denpasar, transfer to Uluwatu  
• Sunset at Uluwatu Temple & Kecak dance  
• Dinner overlooking the cliff  

**Day 2:**  
• Morning yoga class at The Practice, Uluwatu  
• Beach time at Padang‑Padang  
• Seafood dinner at Jimbaran Bay  

**Day 3:**  
• Day trip to Ubud: rice terraces + Monkey Forest  
• Afternoon spa & Balinese massage  
• Evening market and local café  

**Day 4:**  
• Sunrise yoga at Tirta Empul  
• Brunch by rice paddies  
• Transfer back to airport  
`
];

function getMockItinerary() {
  return MOCK_ITINERARIES[
    Math.floor(Math.random() * MOCK_ITINERARIES.length)
  ];
}
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { PlaneTakeoff, Menu, Map, BookOpen, ChevronDown, Sparkles, Send, HomeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const [activeModel, setActiveModel] = useState("dropdown")
  const [destination, setDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [budget, setBudget] = useState("")
  const [interests, setInterests] = useState("")
  const [prompt, setPrompt] = useState("")
  const [dropdownOutput, setDropdownOutput] = useState("")
  const [llamaOutput, setLlamaOutput] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const dropdownOutputRef = useRef<HTMLDivElement>(null)
  const llamaOutputRef = useRef<HTMLDivElement>(null)

  const quotes = [
    '"The world is a book and those who do not travel read only one page." — St. Augustine',
    '"Travel is the only thing you buy that makes you richer." — Anonymous',
    '"Traveling – it leaves you speechless, then turns you into a storyteller." — Ibn Battuta',
    '"Not all those who wander are lost." — J.R.R. Tolkien',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const handleDropdownGenerate = () => {
    // Mock output for dropdown model
    setDropdownOutput(`
      Based on your preferences, we recommend:
      
      🌟 Top Destinations:
      1. Kyoto, Japan - Perfect for cultural immersion with temples and gardens
      2. Costa Rica - Ideal for nature lovers with rainforests and beaches
      3. Barcelona, Spain - A blend of architecture, cuisine, and coastal beauty
      
      🏨 Accommodation Suggestions:
      • Boutique hotels in historic districts
      • Eco-lodges near natural attractions
      
      🍽️ Culinary Experiences:
      • Local cooking classes
      • Food tours in markets
      
      💡 Pro Tip: Consider visiting during shoulder season for better prices and fewer crowds!
    `)

    setTimeout(() => {
      dropdownOutputRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleHealthCheck = async () => {
    try {
      const res = await fetch("/health");
      const data = await res.json();
      console.log(data);
      alert("Health check response: " + JSON.stringify(data));
    } catch (error) {
      console.error("Health check failed:", error);
      alert("Health check failed. See console for details.");
    }
  };

  const handleLlamaGenerate = async () => {
    if (!prompt.trim()) return;

    // **Production** (on Vercel) → show a mock itinerary
    if (!process.env.NEXT_PUBLIC_API_URL?.includes("localhost")) {
      const mock = getMockItinerary();
      setLlamaOutput(mock);
      setTimeout(() => llamaOutputRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      return;
    }

    // **Local** → call your real Flask API
    setIsLoading(true);
    setLoadingProgress(1);
    setLlamaOutput("Generating itinerary…");

    let progress = 1;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 3) + 1;
      if (progress < 99) setLoadingProgress(progress);
    }, 300);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
          keepalive: true,
        }
      );
      clearInterval(interval);
      setLoadingProgress(100);
      setIsLoading(false);

      const data = await res.json();
      setLlamaOutput(data.response || "No response received.");
      setTimeout(() => llamaOutputRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    } catch {
      clearInterval(interval);
      setIsLoading(false);
      setLoadingProgress(0);
      setLlamaOutput("Error connecting to the AI model.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-teal-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <PlaneTakeoff className="h-6 w-6" />
              <span className="text-xl font-bold">Nomadly</span>
            </div>
            <Button
              onClick={handleHealthCheck}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-teal-600 text-xs"
            >
              Health Check
            </Button>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link href="/" className="flex items-center space-x-1 hover:text-teal-200 transition-colors">
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/documentation" className="flex items-center space-x-1 hover:text-teal-200 transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-teal-600"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-teal-800 py-2">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <Link href="/" className="flex items-center space-x-2 p-2 hover:bg-teal-600 rounded">
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link href="/documentation" className="flex items-center space-x-2 p-2 hover:bg-teal-600 rounded">
                <BookOpen className="h-4 w-4" />
                <span>Documentation</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-teal-600 via-teal-500 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Travel background" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Discover Your Perfect Journey
            </motion.h1>
            <motion.p
              className="text-xl mb-8 text-teal-100 font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let our intelligent travel assistant craft your dream adventure
            </motion.p>
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-8 italic text-teal-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              {quotes[currentQuote]}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Model Selector */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">Choose Your Adventure Style</h2>
            <Tabs defaultValue="dropdown" className="w-full" onValueChange={(value) => setActiveModel(value)}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                  <TabsTrigger value="dropdown" className="text-base w-full">
                    <div className="flex items-center">
                      <ChevronDown className="mr-2 h-4 w-4" />
                      <span>Guided Selection</span>
                    </div>
                  </TabsTrigger>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                  <TabsTrigger value="llama" className="text-base w-full">
                    <div className="flex items-center">
                      <Sparkles className="mr-2 h-4 w-4" />
                      <span>AI Itinerary Creator</span>
                    </div>
                  </TabsTrigger>
                </motion.div>
              </TabsList>

              {/* Dropdown Model */}
              <TabsContent value="dropdown">
                <Card className="border-teal-200 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="grid gap-6">
                      <div>
                        <label className="block text-sm font-medium text-teal-700 mb-1">
                          Where would you like to go?
                        </label>
                        <Select onValueChange={setDestination}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a destination type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beach">Beach Destinations</SelectItem>
                            <SelectItem value="mountain">Mountain Retreats</SelectItem>
                            <SelectItem value="city">City Explorations</SelectItem>
                            <SelectItem value="countryside">Countryside Getaways</SelectItem>
                            <SelectItem value="island">Island Adventures</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-teal-700 mb-1">How long is your trip?</label>
                        <Select onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekend">Weekend (2-3 days)</SelectItem>
                            <SelectItem value="week">One Week</SelectItem>
                            <SelectItem value="twoweeks">Two Weeks</SelectItem>
                            <SelectItem value="month">One Month or More</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-teal-700 mb-1">
                          What's your budget range?
                        </label>
                        <Select onValueChange={setBudget}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="budget">Budget-Friendly</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="luxury">Luxury</SelectItem>
                            <SelectItem value="ultraluxury">Ultra-Luxury</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-teal-700 mb-1">What are your interests?</label>
                        <Select onValueChange={setInterests}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="culture">Culture & History</SelectItem>
                            <SelectItem value="nature">Nature & Outdoors</SelectItem>
                            <SelectItem value="food">Food & Cuisine</SelectItem>
                            <SelectItem value="adventure">Adventure & Sports</SelectItem>
                            <SelectItem value="relaxation">Relaxation & Wellness</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={handleDropdownGenerate}
                          className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white"
                        >
                          Generate Recommendations
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {dropdownOutput && (
                  <div ref={dropdownOutputRef} className="mt-8">
                    <h3 className="text-xl font-bold text-teal-800 mb-4">Your Personalized Recommendations</h3>
                    <Card className="border-teal-200 shadow-lg">
                      <CardContent className="pt-6">
                        <ScrollArea className="h-[400px] w-full pr-4">
                          <div className="whitespace-pre-line">{dropdownOutput}</div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              {/* LLaMA Model */}
              <TabsContent value="llama">
                <Card className="border-teal-200 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="grid gap-6">
                      <div>
                        <label className="block text-sm font-medium text-teal-700 mb-1">Describe your dream trip</label>
                        <Textarea
                          placeholder="E.g., I want to explore Japan for 7 days in spring, focusing on culture and food. I prefer mid-range accommodations and can spend around $2000 excluding flights."
                          className="min-h-[120px] resize-none"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                      </div>

                      <div className="flex gap-4">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button
                            onClick={handleLlamaGenerate}
                            className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white"
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Generate Itinerary
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button
                            onClick={handleLlamaGenerate}
                            variant="outline"
                            className="w-full border-teal-600 text-teal-600 hover:bg-teal-50"
                          >
                            <Sparkles className="mr-2 h-4 w-4" />
                            Surprise Me
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {isLoading && (
                  <div className="mt-6 w-full">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-teal-500 h-full transition-all duration-300 ease-in-out"
                        style={{ width: `${loadingProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-teal-700 mt-1 text-center">{loadingProgress}% generating...</p>
                  </div>
                )}

                {llamaOutput && (
                  <div ref={llamaOutputRef} className="mt-8">
                    <h3 className="text-xl font-bold text-teal-800 mb-4">Your Custom Itinerary</h3>
                    <Card className="border-teal-200 shadow-lg">
                      <CardContent className="pt-6">
                        <ScrollArea className="h-[500px] w-full pr-4">
                          <div className="prose prose-teal max-w-none whitespace-pre-line">{llamaOutput}</div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-teal-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-teal-800 mb-8 text-center">Why Choose Nomadly</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-teal-200 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-b from-white to-teal-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-full p-3 inline-flex mb-4">
                      <Sparkles className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-teal-800 mb-2">AI-Powered Recommendations</h3>
                    <p className="text-teal-700">
                      Our advanced LLaMA model creates personalized itineraries tailored to your unique preferences.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-teal-200 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-b from-white to-teal-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-full p-3 inline-flex mb-4">
                      <Map className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-teal-800 mb-2">Global Destinations</h3>
                    <p className="text-teal-700">
                      Discover hidden gems and popular spots across the world with our curated recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-teal-200 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-b from-white to-teal-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-full p-3 inline-flex mb-4">
                      <PlaneTakeoff className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-teal-800 mb-2">Flexible Planning</h3>
                    <p className="text-teal-700">
                      Choose between guided selections or free-form requests to plan your perfect adventure.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Nomadly</h3>
              <p className="text-teal-200">
                Empowering travelers with AI-driven recommendations for unforgettable journeys.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-teal-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-teal-200 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-teal-700 mt-8 pt-6 text-center text-teal-300">
            <p>&copy; {new Date().getFullYear()} Nomadly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
