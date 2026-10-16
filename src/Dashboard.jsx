import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function Dashboard({ session }) {
  const [companyName, setCompanyName] = useState('')
  const [rowCount, setRowCount] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadData() {
      // RLS returns only this user's own profile, so no filter is needed
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('company_name')
        .maybeSingle()

      if (profileError) {
        setErrorMessage(profileError.message)
        return
      }
      setCompanyName(profile ? profile.company_name : 'No company assigned')

      // No company filter here: the database decides which rows we get
      const { data: rows, error: rowsError } = await supabase
        .from('campaign_data')
        .select('*')

      if (rowsError) {
        setErrorMessage(rowsError.message)
        return
      }
      setRowCount(rows.length)
    }

    loadData()
  }, [])

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <main>
      <header className="topbar">
        <div>
          <h1>{companyName || 'Loading...'}</h1>
          <p>Signed in as {session.user.email}</p>
        </div>
        <button onClick={handleLogout}>Log out</button>
      </header>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {rowCount !== null && (
        <p>The database returned <strong>{rowCount}</strong> campaign rows.</p>
      )}
    </main>
  )
}

export default Dashboard