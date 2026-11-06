'use client'

import { useState, type FormEvent } from 'react'

export default function LeadForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setMessage('')

    const form = new FormData(event.currentTarget)

    try {
      const response = await fetch('https://hook.us2.make.com/v1fsydy9uejrine9agtyuiz82cm9n2i4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          leadScore: Number(form.get('leadScore')),
        }),
      })

      if (!response.ok) throw new Error('Submission failed')
      event.currentTarget.reset()
      setMessage('Thanks — your details were submitted.')
    } catch {
      setMessage('Could not submit your details. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-5 rounded-xl border p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Get in touch</h2>

      <label className="block space-y-1">
        <span className="text-sm font-medium">Name</span>
        <input name="name" required className="w-full rounded-md border px-3 py-2" />
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium">Email</span>
        <input name="email" type="email" required className="w-full rounded-md border px-3 py-2" />
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium">Lead Score</span>
        <input name="leadScore" type="number" required className="w-full rounded-md border px-3 py-2" />
      </label>

      <button disabled={pending} className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50">
        {pending ? 'Sending…' : 'Submit'}
      </button>

      {message && <p role="status" className="text-sm">{message}</p>}
    </form>
  )
}