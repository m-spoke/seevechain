import React from 'react'

import useAppState from 'lib/appState'
import { HorizontalBar } from 'react-chartjs-2'
import { getLongKnownContract, TOKEN_CONTRACTS } from '../../../shared/knownAddresses'
import { colorSet3 } from 'lib/chartHelpers'
import Spinner from 'components/Spinner'
import numeral from 'numeral'
import numberWithCommas from 'lib/numberWithCommas'
import LineChart from 'components/LineChart'

export default function UsdVthoBurnChart({}) {
  const currentBlock = useAppState(s => s.currentBlock)
  const dailyStats = useAppState(s => s.dailyStats)
  const topContracts = useAppState(s => s.topContracts)
  if (
    !currentBlock.dailyBurnUsd ||
    !dailyStats.length ||
    !topContracts.length
  ) return <div className="TopContractsCharts"><Spinner /></div>

  const usdVthoBurnTopContracts = topContracts.sort((a, b) => b.usdBurned - a.usdBurned).slice(0, 20)
  const topContractsData = {
    labels: usdVthoBurnTopContracts.map(({ contract, usdBurned }) => {
      const matchingKnownContract = getLongKnownContract(contract)
      const label = matchingKnownContract
        ? matchingKnownContract
        : TOKEN_CONTRACTS[contract]
          ? TOKEN_CONTRACTS[contract]
          : `${contract.slice(2,6)}..${contract.slice(-4)}`
      return `${label}: $${numberWithCommas(Number(usdBurned))}`
    }),
    datasets: [{
      label: 'USD VTHO Burn by Contract',
      backgroundColor: colorSet3,
      data: usdVthoBurnTopContracts.map(contract => contract.usdBurned),
    }]
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#bfbfc9',
        },
      }],
      xAxes: [{
        ticks: {
          fontColor: '#bfbfc9',
          userCallback: num => window.innerWidth > 760 ? numberWithCommas(num) : numeral(num).format('0.0a'),
        },
      }]
    },
    legend: {
      onClick: () => {},
    },
    tooltips: {
      titleFontSize: 16,
      bodyFontSize: 14,
      xPadding: 12,
      yPadding: 12,
      displayColors: false,
      bodyAlign: 'center',
      backgroundColor: '#182024',
      borderColor: '#bfbfc9',
      borderWidth: .5,
      callbacks: {
        label: () => '',
      },
    },
  }

  const labels = []
  const usdBurnSeries = []
  dailyStats.forEach(dayStat => {
    if (dayStat.vthoBurnUsd) {
      labels.unshift(dayStat.day)
      usdBurnSeries.unshift(Number(dayStat.vthoBurnUsd).toFixed(2))
    }
  })

  return <div className="TopContractsCharts">
    <div className="BurnTxsAndClausesCharts-avgBurn">
      USD VTHO Burn Today:
      <span>
        &nbsp;${numberWithCommas(Number(currentBlock.dailyBurnUsd).toFixed(2))}
      </span>
    </div>
    <div
      className="TopContractsCharts-chart"
      onClick={event => {
        const offsetY = event.offsetY
        const segment = event.target.clientHeight / (usdVthoBurnTopContracts.length + 2)
        const index = Math.floor(offsetY / segment) - 1
        window.open(
          `http://www.vechainuniverse.com/Stalker/Stalk/${usdVthoBurnTopContracts[index].contract}`, `_blank`
        )
      }}
    >
      <HorizontalBar {...{
        data: topContractsData,
        options,
      }}/>
    </div>
    <LineChart
      labels={labels}
      datasets={[
        {
          label: 'Daily USD VTHO Burn',
          data: usdBurnSeries,
          borderColor: 'rgb(151, 83, 224)',
          backgroundColor: 'rgb(151, 83, 224, .1)',
        },
      ]}
    />
  </div>
}
