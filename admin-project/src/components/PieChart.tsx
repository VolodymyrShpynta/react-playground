import { useTheme } from '@mui/material'
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart'
import { mockPieData as data } from '../data/mockData'

const paletteKeys = ['error', 'secondary', 'success', 'warning', 'info'] as const

const PieChart = () => {
  const theme = useTheme()

  const series = data.map((item, index) => ({
    id: item.id,
    label: item.label,
    value: item.value,
    color: theme.palette[paletteKeys[index % paletteKeys.length]].main,
  }))

  return (
    <MuiPieChart
      series={[
        {
          data: series,
          innerRadius: '50%',
          paddingAngle: 2,
          cornerRadius: 3,
        },
      ]}
      slotProps={{
        legend: {
          direction: 'horizontal',
          position: { vertical: 'bottom', horizontal: 'center' },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    />
  )
}

export default PieChart