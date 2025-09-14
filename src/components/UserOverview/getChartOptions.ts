import { getCSSVar } from "../../utils/getCSSVar";

export const getChartOptions = (data: number[][], title: string, yAxisTitle: string): Highcharts.Options => {
  return (
    {
      chart: {
        backgroundColor: getCSSVar('--middle-background'),
      },
      title: { text: title, style: { color: getCSSVar('--primary-text') } },
      xAxis: {
        type: 'datetime',
        title: { text: undefined },
        lineColor: getCSSVar('--border-color'),
        tickColor: getCSSVar('--border-color'),
        labels: {
          style: {
            color: getCSSVar('--primary-text'),
          },
        }
      },
      yAxis: {
        title: { text: yAxisTitle, style: { color: getCSSVar('--primary-text') } },
        allowDecimals: false,
        gridLineColor: getCSSVar('--border-color'),
        labels: {
          style: {
            color: getCSSVar('--primary-text'),
          }
        },
      },
      series: [
        {
          type: 'line',
          name: 'Messages',
          data: data,
          color: getCSSVar('--discord-primary'),
        },
      ],
      tooltip: {
        xDateFormat: '%Y-%m-%d',
        shared: true,
      },
      legend: { enabled: false },
    }
  )
}