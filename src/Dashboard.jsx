import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import LeadsChart from './LeadsChart'

function Dashboard({ session }) {
  const [companyName, setCompanyName] = useState('')
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
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
        setLoading(false)
        return
      }
      setCompanyName(profile ? profile.company_name : 'No company assigned')

      // No company filter here: RLS decides which rows we receive
      const { data: rows, error: rowsError } = await supabase
        .from('campaign_data')
        .select('id, company_name, channel, leads')
        .order('leads', { ascending: false })

      if (rowsError) {
        setErrorMessage(rowsError.message)
      } else {
        setCampaigns(rows)
      }
      setLoading(false)
    }

    loadData()
  }, [])

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setErrorMessage(error.message)
    }
  }

  const totalLeads = campaigns.reduce((sum, row) => sum + row.leads, 0)

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

      {loading && <p>Loading campaigns...</p>}

      {!loading && !errorMessage && campaigns.length === 0 && (
        <p>No campaign data is available for your account.</p>
      )}

      {!loading && campaigns.length > 0 && (
        <>
          <section className="panel">
            <h2>Campaigns</h2>
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Channel</th>
                  <th className="number">Leads</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((row) => (
                  <tr key={row.id}>
                    <td>{row.company_name}</td>
                    <td>{row.channel}</td>
                    <td className="number">{row.leads}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Total</td>
                  <td className="number">{totalLeads}</td>
                </tr>
              </tfoot>
            </table>
          </section>

          <section className="panel">
            <h2>Leads by channel</h2>
            <LeadsChart campaigns={campaigns} />
          </section>
        </>
      )}
    </main>
  )
}

export default Dashboard