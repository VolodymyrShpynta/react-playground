import { useTheme } from '@mui/material'
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart'
import { mockBarData as data } from '../data/mockData'

const series = [
  { dataKey: 'hot dog', label: 'hot dog', color: 'error' as const },
  { dataKey: 'burger', label: 'burger', color: 'secondary' as const },
  { dataKey: 'kebab', label: 'kebab', color: 'success' as const },
  { dataKey: 'donut', label: 'donut', color: 'warning' as const },
]

interface BarChartProps {
  isDashboard?: boolean
}

const BarChart = ({ isDashboard = false }: BarChartProps) => {
  const theme = useTheme()

  const palette = theme.palette

  const coloredSeries = series.map((s) => ({
    ...s,
    color: palette[s.color].main,
  }))

  return (
    <MuiBarChart
      dataset={data}
      xAxis={[
        {
          scaleType: 'band',
          dataKey: 'country',
          label: isDashboard ? undefined : 'Country',
        },
      ]}
      yAxis={[
        {
          label: isDashboard ? undefined : 'Food',
        },
      ]}
      series={coloredSeries}
      slotProps={{
        legend: {
          direction: 'vertical',
          position: { vertical: 'middle', horizontal: 'end' },
        },
      }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    />
  )
}

export default BarChart