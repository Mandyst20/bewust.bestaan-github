import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Inloggen | Bewust Bestaan',
  description: 'Log in op je Bewust Bestaan account. Toegang tot de Nederlandse community voor bewust leven, persoonlijke groei en innerlijke rust.',
  alternates: {
    canonical: 'https://bewustbestaan.nl/login',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-sand-900 mb-2">
            Welkom terug
          </h1>
          <p className="text-sand-600">
            Log in om verder te gaan met je reis naar bewustzijn
          </p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center">
          <p className="text-sm text-sand-500">
            Demo accounts voor testen:<br />
            <strong>Admin:</strong> admin@bewustbestaan.nl / admin123<br />
            <strong>Lid:</strong> sophie@example.nl / member123
          </p>
        </div>
      </div>
    </div>
  )
}
