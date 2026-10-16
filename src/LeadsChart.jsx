import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function LeadsChart({ campaigns }) {
  // Add up leads for each channel
  const totals = {}
  for (const row of campaigns) {
    totals[row.channel] = (totals[row.channel] || 0) + row.leads
  }

  // Turn { Google: 500, Meta: 400 } into [{ channel: 'Google', leads: 500 }, ...]
  const chartData = Object.keys(totals).map((channel) => ({
    channel: channel,
    leads: totals[channel],
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="channel" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="leads" fill="#2f6fed" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default LeadsChart