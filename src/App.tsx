import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react'
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
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 z-0" />
      
      {/* Radial gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent z-0" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl mx-auto text-center"
        >
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-block bg-white text-black font-bold text-2xl px-4 py-2 rounded">
              ACME
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Join the waitlist
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Be the first to experience our revolutionary platform. 
            Sign up now to secure early access.
          </p>
          
          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 pr-12 bg-gray-900 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-1.5 rounded-md transition-colors"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowRight className="h-5 w-5" />
                  )}
                </button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 text-left"
                >
                  {error}
                </motion.p>
              )}
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md mx-auto"
            >
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
              <p className="text-gray-400">
                Thank you for joining our waitlist. We'll notify you when we launch.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-500 text-sm">
        <div className="container mx-auto">
          <p>© 2023 ACME Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App