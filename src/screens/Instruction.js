import { Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import SButton from '../components/SButton'

export default function Instruction() {

    const navigate = useNavigate();

    return (
        <div className='mainBox'>
            <div className='instructionHeader' >
                General Instructions
            </div>

            <ol className='instructions' >
                <li>You will have only 10 seconds for each question.</li>
                <li>Once you select your answer, you can't reselect it.</li>
                <li>You can't select any option, once time goes off.</li>
                <li>Once you have started the Quiz, you can't leave it.</li>
                <li>You will get point on the basis of your correct answers.</li>
                <li>To avoid any kind of loss of data or other problems, please take care of the following things.
                    <ul className='nestedInstructions' >
                        <li>Don't close the Browser Window.</li>
                        <li>Don't press browser back button.</li>
                        <li>Don't refresh the browser window.</li>
                    </ul>
                </li>
            </ol>

            <div className='instructionsBtnBox'>
                <SButton label='Start Quiz' onClick={() => navigate('/Quiz')} />
            </div>
        </div>
    )
}
