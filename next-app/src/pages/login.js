import { useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { Button, Input, Card, CardBody, CardHeader, CardFooter } from '@heroui/react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setError(null)
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col gap-1 p-8 pb-4">
          <h2 className="text-2xl font-bold text-center">Sign in to your account</h2>
        </CardHeader>
        <CardBody className="px-8 py-4">
          <form className="space-y-8" onSubmit={handleLogin}>
            {error && (
              <div className="bg-danger-50 text-danger-700 p-4 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="bordered"
                fullWidth
                labelPlacement="outside"
                classNames={{
                  input: "py-2",
                  label: "text-sm font-medium mb-2",
                  inputWrapper: "h-12",
                  base: "mb-2"
                }}
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="bordered"
                fullWidth
                labelPlacement="outside"
                classNames={{
                  input: "py-2",
                  label: "text-sm font-medium mb-2",
                  inputWrapper: "h-12",
                  base: "mb-2"
                }}
              />
            </div>

            <Button
              type="submit"
              color="primary"
              variant="solid"
              isLoading={loading}
              fullWidth
              className="h-12 text-base font-medium"
            >
              Sign in
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex justify-center p-8 pt-4">
          <Link href="/register" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
            Don't have an account? Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
} 