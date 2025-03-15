import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'
import { z } from 'zod'

function App() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const emailSchema = z.string().email('Please enter a valid email address')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      // Validate email
      emailSchema.parse(email)
      
      // Simulate API call
      setIsSubmitting(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Success
      setIsSubmitted(true)
      setIsSubmitting(false)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else {
        setError('Something went wrong. Please try again.')
      }
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Subtle noise texture overlay */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none z-10" />
      
      {/* Subtle gradient */}
      <div className="absolute top-[-50%] right-0 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(120,119,198,0.15),rgba(0,0,0,0))] blur-3xl z-0" />
      
      {/* Header */}
      <header className="relative z-20 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold text-xl">
            <span className="font-bold">ACME</span>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <main className="relative z-20 flex-grow flex items-center justify-center px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Join the waitlist
          </h1>
          
          {/* Subheadline */}
          <p className="text-gray-400 text-lg mb-8">
            Be the first to experience our platform when we launch.
          </p>
          
          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 bg-gray-950 border ${error ? 'border-red-500' : 'border-gray-800'} rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all`}
                  disabled={isSubmitting}
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-gray-200 text-black font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin text-gray-800" />
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-950 border border-gray-800 rounded-md p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-medium">You're on the list</h3>
              </div>
              <p className="text-gray-400">
                Thanks for joining our waitlist. We'll notify you when we launch.
              </p>
            </motion.div>
          )}
          
          {/* Extra info */}
          <p className="text-gray-500 text-sm mt-6">
            By joining, you agree to our{' '}
            <a href="#" className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-20 border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2023 ACME, Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">GitHub</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App