import React from 'react'

type Series = {
  label: string
  data: number[]
  color?: string
}

export type LineChartData = {
  series: Series[]
  xaxis: string[]
}

type LineChartProps = {
  data: LineChartData
  width?: number
  height?: number
}

const COLORS = ['steelblue', 'tomato', 'orange', 'green', 'purple', 'red', 'teal', 'gold']

export function txRx2ChartData(URS: { [key: string]: any }[]): LineChartData {
  return {
    series: Object.keys(URS?.[0] || {})
      .filter((key) => key !== 'date')
      .map((key, index) => ({
        label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
        data: URS?.map((item) => item[key]) || [],
        color: ['steelblue', 'orange', 'green'][index % 3], // Cycle through colors
      })),
    xaxis: URS?.map((item) => item.date.slice(0, 10)),
  }
}
export const LineChart: React.FC<LineChartProps> = ({ data, width = 500, height = 300 }) => {
  const padding = 40
  const { series, xaxis } = data

  // Flatten all values to get min/max for Y
  const allYVals = series.flatMap((s) => s.data)
  const yMin = Math.min(0, ...allYVals)
  const yMax = Math.max(...allYVals)

  const mapY = (y: number) => padding + ((yMax - y) / (yMax - yMin || 1)) * (height - 2 * padding)

  const nPoints = xaxis.length
  const xStep = (width - 2 * padding) / Math.max(1, nPoints - 1)
  const getX = (i: number) => padding + i * xStep

  const makePath = (arr: number[]) =>
    arr.map((y, i) => (i === 0 ? `M${getX(i)},${mapY(y)}` : `L${getX(i)},${mapY(y)}`)).join(' ')

  return (
    <>
      <svg
        width={width}
        height={height}
        style={{ background: '#fff' }}
      >
        {/* Axes */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke='#aaa'
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke='#aaa'
        />

        {/* Y axis labels & grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const yValue = yMax - t * (yMax - yMin)
          const y = mapY(yValue)
          return (
            <g key={t}>
              <text
                x={padding - 10}
                y={y + 5}
                textAnchor='end'
                fontSize={10}
              >
                {Math.round(yValue)}
              </text>
              {t > 0 && t < 1 && (
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke='#eee'
                />
              )}
            </g>
          )
        })}

        {/* X axis labels */}
        {xaxis.map((label, i) => (
          <text
            key={label}
            x={getX(i)}
            y={height - padding + 20}
            textAnchor='middle'
            fontSize={10}
          >
            {label}
          </text>
        ))}

        {/* Draw lines & points */}
        {series.map((s, idx) => (
          <g key={s.label}>
            <path
              d={makePath(s.data)}
              stroke={s.color || COLORS[idx % COLORS.length]}
              strokeWidth={2}
              fill='none'
            />
            {s.data.map((y, i) => (
              <circle
                key={i}
                cx={getX(i)}
                cy={mapY(y)}
                r={3}
                fill={s.color || COLORS[idx % COLORS.length]}
              />
            ))}
          </g>
        ))}

        {/* Legend */}
        <g>
          <rect
            x={width - 120}
            y={padding / 2 - 8}
            width={110}
            height={22 * series.length + 8}
            fill='#fff'
            stroke='#ddd'
          />
          {series.map((s, idx) => (
            <g key={s.label}>
              <circle
                cx={width - 110}
                cy={padding / 2 + 13 + idx * 20}
                r={5}
                fill={s.color || COLORS[idx % COLORS.length]}
              />
              <text
                x={width - 100}
                y={padding / 2 + 17 + idx * 20}
                fontSize={12}
              >
                {s.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </>
  )
}
