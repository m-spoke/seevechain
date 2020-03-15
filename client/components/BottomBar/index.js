import React from 'react'
import { useEffect, useState } from 'preact/hooks'

import numberWithCommas from '../../lib/numberWithCommas'

import './index.sass'

export default function BottomBar({ stats }) {
  const [numberClass, setNumberClass] = useState('BottomBar-number')
  useEffect(() => {
    setNumberClass('BottomBar-number BottomBar-number-changing')
    setTimeout(() => {
      setNumberClass('BottomBar-number')
    }, 300)
  }, [stats.dailyVTHOBurn])

  if (!stats || Object.keys(stats).length === 0) return <div className="BottomBar" />

  return <div className="BottomBar">
    <div className="BottomBar-wrapper">
      <div>
        <span className="BottomBar-header">VTHO Burn: </span>
        <span className={numberClass}>{numberWithCommas(Math.floor(+stats.dailyVTHOBurn))}</span>
      </div>
      <div>
        <span className="BottomBar-header">Txs: </span>
        <span className={numberClass}>{numberWithCommas(stats.dailyTransactions)}</span>
      </div>
      <div>
        <span className="BottomBar-header">Clauses: </span>
        <span className={numberClass}>{numberWithCommas(stats.dailyClauses)}</span>
      </div>
    </div>
  </div>
}

