import { useTheme } from '@mui/material'
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart'
import { mockLineData as data } from '../data/mockData'

const paletteKeys = ['warning', 'secondary', 'error'] as const

const xLabels = data[0].data.map((point) => point.x)

interface LineChartProps {
  isDashboard?: boolean
}

const LineChart = ({ isDashboard = false }: LineChartProps) => {
  const theme = useTheme()

  const series = data.map((line, index) => ({
    data: line.data.map((point) => point.y),
    label: line.id,
    color: theme.palette[paletteKeys[index % paletteKeys.length]].main,
    curve: 'catmullRom' as const,
  }))

  return (
    <MuiLineChart
      xAxis={[
        {
          scaleType: 'point',
          data: xLabels,
          label: isDashboard ? undefined : 'Transportation',
        },
      ]}
      yAxis={[
        {
          label: isDashboard ? undefined : 'Count',
        },
      ]}
      series={series}
      slotProps={{
        legend: {
          direction: 'vertical',
          position: { vertical: 'middle', horizontal: 'end' },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    />
  )
}

export default LineChart