import { useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { Button, Input, Card, CardBody, CardHeader, CardFooter } from '@heroui/react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setError(null)
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      router.push('/login')
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
          <h2 className="text-2xl font-bold text-center">Create your account</h2>
        </CardHeader>
        <CardBody className="px-8 py-4">
          <form className="space-y-8" onSubmit={handleRegister}>
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
                placeholder="Create a password"
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

              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Create account
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex justify-center p-8 pt-4">
          <Link href="/login" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
            Already have an account? Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
} 