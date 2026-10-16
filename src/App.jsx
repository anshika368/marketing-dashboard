import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  const [session, setSession] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    // 1. On page load: is someone already logged in?
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setCheckingSession(false)
    })

    // 2. Listen for future logins and logouts
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession)
    })

    // 3. Stop listening if App is ever removed from the page
    return () => data.subscription.unsubscribe()
  }, [])

  if (checkingSession) {
    return <main><p>Loading...</p></main>
  }

  return session ? <Dashboard session={session} /> : <Login />
}

export default App