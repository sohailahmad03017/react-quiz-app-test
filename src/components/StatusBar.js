import React from 'react'

export default function StatusBar({ width }) {
    return (
        <div style={{
            width: `${width}%`,
            height: '5px',
            backgroundColor: 'green',
            position: 'relative',
            top: 0,
            transition: '0.5s ease',
        }}></div>
    )

}

