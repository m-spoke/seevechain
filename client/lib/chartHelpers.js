import BurnTxsAndClausesCharts from 'components/BurnTxsAndClausesCharts'
import TopContractsChart from 'components/TopContractsChart'

export const locationToChartMap = {
  '/burn': {
    title: 'VTHO Burn, Clauses & Txs',
    component: BurnTxsAndClausesCharts,
  },
  '/contracts': {
    title: 'Today\'s Top Contracts',
    component: TopContractsChart,
  }
}

export const colorSet = [
  '#2f4b7c',
  '#f95d6a',
  '#665191',
  '#ffa600',
  '#488f31',
  '#a05195',
  '#ff7c43',
  '#d45087',
  '#8ba741',
  '#e4ca6f',
  '#f17758',
  '#6b9b38',
  '#aab34e',
  '#c7be5d',
  '#ffd582',
  '#fdbf71',
  '#fba764',
  '#f7905c',
  '#e95d58',
  '#de425b',
]