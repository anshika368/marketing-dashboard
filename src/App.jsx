import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [message, setMessage] = useState('Checking connection...')

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from('campaign_data').select('*')

      if (error) {
        setMessage('Supabase replied: ' + error.message)
      } else {
        setMessage('Supabase returned ' + data.length + ' rows')
      }
    }

    testConnection()
  }, [])

  return (
    <main>
      <h1>Marketing Dashboard</h1>
      <p>{message}</p>
    </main>
  )
}

export default App