import Link from "next/link"
import { ArrowLeft, BookOpen, Code, PlaneTakeoff, Layers, Palette } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <header className="bg-teal-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-teal-100 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Nomadly Documentation</h1>
          <p className="text-xl text-teal-100 max-w-2xl">
            Learn about the engineering and design principles behind our travel recommendation platform.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Nomadly Platform Overview</CardTitle>
                <CardDescription>A comprehensive look at our travel recommendation application</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-teal max-w-none">
                <p>
                  Nomadly is a next-generation travel recommendation platform that combines traditional input-based
                  filtering with advanced AI to create personalized travel experiences. Our platform is designed to make
                  travel planning effortless and inspiring.
                </p>

                <h3>Core Features</h3>
                <ul>
                  <li>Dual recommendation engines (dropdown-based and AI-powered)</li>
                  <li>Personalized itinerary generation</li>
                  <li>Destination discovery based on preferences</li>
                  <li>Budget-aware recommendations</li>
                </ul>

                <h3>Technology Stack</h3>
                <p>
                  Nomadly is built using modern web technologies including Next.js, React, and Tailwind CSS for the
                  frontend. Our backend leverages Node.js with Express, and our AI capabilities are powered by a
                  fine-tuned LLaMA model.
                </p>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100 my-6">
                  <h4 className="text-teal-800 font-medium mb-2">Our Mission</h4>
                  <p className="text-teal-700 mb-0">
                    To transform travel planning from a stressful task into an enjoyable part of the journey, using AI
                    to bridge the gap between travelers and their perfect destinations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engineering Tab */}
          <TabsContent value="engineering">
            <Card>
              <CardHeader>
                <CardTitle>Engineering Architecture</CardTitle>
                <CardDescription>Technical details of the Nomadly platform</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-teal max-w-none">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-2 rounded-full mr-4">
                    <Layers className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="mt-0">System Architecture</h3>
                    <p>
                      Nomadly follows a modern microservices architecture with separate services for user management,
                      recommendation engines, and content delivery. This approach allows us to scale individual
                      components as needed and maintain high availability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-2 rounded-full mr-4">
                    <Code className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="mt-0">Frontend Implementation</h3>
                    <p>
                      Our frontend is built with Next.js and React, utilizing server components for improved
                      performance. We use Tailwind CSS for styling and Framer Motion for animations. The UI is fully
                      responsive and optimized for both desktop and mobile devices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-2 rounded-full mr-4">
                    <BookOpen className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="mt-0">AI Model Integration</h3>
                    <p>
                      The LLaMA model is deployed as a separate service with an API that the main application
                      communicates with. We use a fine-tuned version of LLaMA that has been trained on travel data,
                      itineraries, and destination information to provide accurate and relevant recommendations.
                    </p>
                  </div>
                </div>

                <h3>Performance Optimizations</h3>
                <ul>
                  <li>Implemented caching for common queries and destinations</li>
                  <li>Utilized edge functions for faster global response times</li>
                  <li>Optimized images and assets for quick loading</li>
                  <li>Implemented progressive loading for large content</li>
                </ul>

                <h3>Security Measures</h3>
                <ul>
                  <li>API rate limiting to prevent abuse</li>
                  <li>Input sanitization to prevent injection attacks</li>
                  <li>Data encryption for sensitive information</li>
                  <li>Regular security audits and penetration testing</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design">
            <Card>
              <CardHeader>
                <CardTitle>Design Philosophy</CardTitle>
                <CardDescription>The principles and aesthetics behind Nomadly</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-teal max-w-none">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-2 rounded-full mr-4">
                    <Palette className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="mt-0">Visual Identity</h3>
                    <p>
                      Nomadly's visual identity is built around a teal color palette that evokes feelings of
                      tranquility, trust, and adventure. The color scheme is complemented by clean typography and ample
                      white space to create a calm, focused user experience.
                    </p>
                  </div>
                </div>

                <h3>Design Principles</h3>
                <ul>
                  <li>
                    <strong>Clarity:</strong> Information is presented in a clear, digestible format
                  </li>
                  <li>
                    <strong>Inspiration:</strong> Visual elements and quotes inspire wanderlust
                  </li>
                  <li>
                    <strong>Accessibility:</strong> Design is inclusive and accessible to all users
                  </li>
                  <li>
                    <strong>Consistency:</strong> UI patterns are consistent throughout the application
                  </li>
                </ul>

                <h3>User Experience</h3>
                <p>
                  The user journey is designed to be intuitive and frictionless. We've carefully crafted each
                  interaction to guide users naturally from initial exploration to final itinerary creation. The dual
                  model approach allows users to choose their preferred method of interaction.
                </p>

                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                    <h4 className="text-teal-800 font-medium mb-2">Dropdown Model</h4>
                    <p className="text-teal-700 mb-0">
                      Designed for users who prefer structured choices and guided experiences. The interface uses
                      familiar form elements with clear labels.
                    </p>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                    <h4 className="text-teal-800 font-medium mb-2">LLaMA Model</h4>
                    <p className="text-teal-700 mb-0">
                      Designed for users who prefer conversational interactions. The interface emphasizes the free-form
                      input area with subtle cues for effective prompting.
                    </p>
                  </div>
                </div>

                <h3>Typography</h3>
                <p>
                  We've chosen IBM Plex Serif as our primary typeface for its elegant, professional appearance and
                  excellent readability. The serif nature of the font adds a touch of sophistication that complements
                  our travel-focused brand, while maintaining clarity across different screen sizes and devices.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Models Tab */}
          <TabsContent value="models">
            <Card>
              <CardHeader>
                <CardTitle>Recommendation Models</CardTitle>
                <CardDescription>Technical details of our dual recommendation engines</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-teal max-w-none">
                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-2 rounded-full mr-4">
                    <PlaneTakeoff className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="mt-0">Dropdown-Based Model</h3>
                    <p>
                      Our traditional recommendation engine uses a combination of collaborative filtering and
                      content-based filtering. It analyzes user preferences from dropdown selections and matches them
                      against our database of destinations and activities.
                    </p>

                    <h4>Key Features:</h4>
                    <ul>
                      <li>Structured input through familiar form elements</li>
                      <li>Fast processing with pre-computed recommendations</li>
                      <li>High precision for specific preference combinations</li>
                      <li>Transparent recommendation logic</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <div className="bg-teal-100 p-2 rounded-full mr-4">
                    <BookOpen className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="mt-0">LLaMA-Powered AI Model</h3>
                    <p>
                      Our advanced AI model is based on a fine-tuned version of LLaMA, specifically trained on travel
                      data. It can understand natural language requests and generate detailed, personalized itineraries.
                    </p>

                    <h4>Technical Specifications:</h4>
                    <ul>
                      <li>Based on LLaMA architecture with 7B parameters</li>
                      <li>Fine-tuned on a dataset of 100,000+ travel itineraries</li>
                      <li>Optimized for low latency (response time &lt; 2 seconds)</li>
                      <li>Continuous learning from user feedback</li>
                    </ul>

                    <h4>Training Process:</h4>
                    <p>
                      The model was fine-tuned using a combination of supervised learning and reinforcement learning
                      from human feedback (RLHF). We used a diverse dataset that includes professional travel guides,
                      user-generated itineraries, and expert recommendations.
                    </p>
                  </div>
                </div>

                <h3>Model Comparison</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-teal-200 bg-teal-50 p-2 text-left">Feature</th>
                      <th className="border border-teal-200 bg-teal-50 p-2 text-left">Dropdown Model</th>
                      <th className="border border-teal-200 bg-teal-50 p-2 text-left">LLaMA Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-teal-200 p-2">Input Type</td>
                      <td className="border border-teal-200 p-2">Structured selections</td>
                      <td className="border border-teal-200 p-2">Natural language</td>
                    </tr>
                    <tr>
                      <td className="border border-teal-200 p-2">Processing Time</td>
                      <td className="border border-teal-200 p-2">Fast (&lt;0.5s)</td>
                      <td className="border border-teal-200 p-2">Moderate (1-2s)</td>
                    </tr>
                    <tr>
                      <td className="border border-teal-200 p-2">Output Format</td>
                      <td className="border border-teal-200 p-2">Structured recommendations</td>
                      <td className="border border-teal-200 p-2">Detailed itineraries</td>
                    </tr>
                    <tr>
                      <td className="border border-teal-200 p-2">Personalization</td>
                      <td className="border border-teal-200 p-2">Good</td>
                      <td className="border border-teal-200 p-2">Excellent</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Nomadly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
