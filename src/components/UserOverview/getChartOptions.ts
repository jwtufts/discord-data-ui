import { getCSSVar } from "../../utils/getCSSVar";

export interface SeriesConfig {
  name: string;
  data: number[][];
  color?: string;
}

export const getChartOptions = (seriesConfigs: SeriesConfig[], title: string, yAxisTitle: string): Highcharts.Options => {
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
      series: seriesConfigs.map(cfg => ({
        type: 'line',
        name: cfg.name,
        data: cfg.data,
        color: cfg.color || getCSSVar('--discord-primary'),
      })),
      tooltip: {
        xDateFormat: '%Y-%m-%d',
        shared: true,
      },
      legend: { enabled: true, itemStyle: { color: getCSSVar('--primary-text') }, itemHoverStyle: { color: getCSSVar('--discord-hover') } },
    }
  )
}