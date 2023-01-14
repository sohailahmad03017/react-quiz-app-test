import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SButton from '../components/SButton';

export default function Result() {

    const location = useLocation();
    const navigate = useNavigate();

    let [score, setScore] = useState('');
    let [totalQuestions, setTotalQuestions] = useState('');
    let [resultRemark, setResultRemark] = useState('');
    let [remark, setRemark] = useState('');
    let [resultClass, setResultClass] = useState('');

    const remarkCalc = (percentage) => {
        if (percentage >= 80) {
            setResultClass("result best");
            setResultRemark("Congratulation!");
            setRemark("Excellent and Keep it Up")
        }
        else if (percentage >= 60) {
            setResultClass("result average");
            setResultRemark("Fair!");
            setRemark("You have to do better")
        }
        else {
            setResultClass("result poor");
            setResultRemark("Alas!");
            setRemark("You have to Work Hard.");
        }
    }

    useEffect(() => {
        if (location.state) {
            setScore(location.state.score);
            setTotalQuestions(location.state.totalQuestions);
            remarkCalc(location.state.score / location.state.totalQuestions * 100);
        }
        else {
            navigate('/')
        }
    }, [])
    return (
        <div className='mainBox'>
            <div className='resultHeader' >
                Quiz Result
            </div>

            <div className={resultClass}>
                <span style={{ fontSize: 15 }}>You Score</span>
                {(score / totalQuestions * 100).toFixed(0)}%
            </div>

            <Typography variant='h3' sx={{ textAlign: 'center' }}>{resultRemark}</Typography>
            <Typography variant='h4' mt={3} mb={3} sx={{ textAlign: 'center' }}>{remark}</Typography>

            <div className='instructionsBtnBox'>
                <SButton label='Try Again' onClick={() => navigate('/')} />
            </div>

        </div>
    )
}
