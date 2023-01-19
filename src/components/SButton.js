import { Button } from '@mui/material'
import React from 'react'

export default function SButton({ onClick, label }) {
    return (
        <button onClick={onClick} className='SBtn'>{label}</button>
    )
}
