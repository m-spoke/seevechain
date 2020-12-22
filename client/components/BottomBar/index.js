import React from 'react'
import { useEffect, useState } from 'preact/hooks'

import useAppState from 'lib/appState'
import numberWithCommas from 'lib/numberWithCommas'

import './index.sass'

export default function BottomBar({ togglePageModalVisibility }) {
  const { dailyTotals } = useAppState(s => s.currentBlock)
  const [numberClass, setNumberClass] = useState('BottomBar-number')
  const [initialState, setInitialState] = useState(0)

  useEffect(() => {
    if (initialState === 0) {
      setInitialState(1)
    } else {
      setNumberClass('BottomBar-number BottomBar-number-changing')
      setTimeout(() => {
        setNumberClass('BottomBar-number')
      }, 300)
    }

  }, [dailyTotals.dailyTransactions])

  if (!dailyTotals || Object.keys(dailyTotals).length === 0) return <div className="BottomBar" />

  return <div className="BottomBar" onClick={togglePageModalVisibility}>
    { window.innerWidth > 500 &&
      <svg height="37" width="33" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="16" cy="10" r="2" fill="grey" />
        <circle cx="16" cy="18" r="2" fill="grey" />
        <circle cx="16" cy="26" r="2" fill="grey" />
      </svg>
    }
    <div className="BottomBar-wrapper">
      <div>
        <span className="BottomBar-header">Txs </span>
        <span className={numberClass}>{numberWithCommas(dailyTotals.dailyTransactions) || 0}</span>
      </div>
      <div className="BottomBar-vtho">
        <span className="BottomBar-header">{window.innerWidth < 400 ? '🔥' : 'VTHO Burn'} </span>
        <span className={numberClass}>{numberWithCommas(Math.floor(+dailyTotals.dailyVTHOBurn)) || 0}</span>
      </div>
      <div>
        <span className="BottomBar-header">Clauses </span>
        <span className={numberClass}>{numberWithCommas(dailyTotals.dailyClauses) || 0}</span>
      </div>
    </div>
  </div>
}

