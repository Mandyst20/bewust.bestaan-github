import type { Metadata } from 'next'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = {
  title: 'Gratis Account Aanmaken | Bewust Bestaan',
  description: 'Word lid van de grootste Nederlandse community voor bewust leven. Gratis registreren voor toegang tot forums, oefeningen en verbinding met gelijkgestemden.',
  alternates: {
    canonical: 'https://bewustbestaan.nl/register',
  },
  openGraph: {
    title: 'Gratis Account Aanmaken | Bewust Bestaan',
    description: 'Word lid van de Nederlandse community voor bewust leven en persoonlijke groei.',
    type: 'website',
    locale: 'nl_NL',
  },
}

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-sand-900 mb-2">
            Word lid van onze community
          </h1>
          <p className="text-sand-600">
            Begin je reis naar bewustzijn en innerlijke rust
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  )
}
