import { Grid, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import StatusBar from '../components/StatusBar';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Countdown from '../components/Countdown';
import SButton from '../components/SButton';
import { useNavigate } from 'react-router-dom';

function Quiz() {

    let [questions, setQuestions] = useState([
        {
            category: 'History',
            type: "multiple",
            difficulty: 'hard',
            question: 'Quaid-e-Azam was born on 25 December ________ in Karachi.',
            correct_answer: '1876',
            incorrect_answers: [
                '1877',
                '1878',
                '1875'
            ]
        },
        {
            category: 'Computer',
            type: "multiple",
            difficulty: 'easy',
            question: 'In RAM, M stands for',
            correct_answer: 'Memory',
            incorrect_answers: [
                'Machine',
                'Merchant',
                'Message'
            ]
        },
        {
            category: 'Computer',
            type: "multiple",
            difficulty: 'medium',
            question: 'There are ____ main parts of CPU',
            correct_answer: 'two',
            incorrect_answers: [
                'three',
                'four',
                'five'
            ]
        },
        {
            category: 'History',
            type: "multiple",
            difficulty: 'hard',
            question: 'Quaid-e-Azam was died on ________.',
            correct_answer: '11 September 1948',
            incorrect_answers: [
                '11 September 1947',
                '21 April 1947',
                '21 April 1948'
            ]
        },
        {
            category: 'Computer',
            type: "bool",
            difficulty: 'easy',
            question: 'Is RAM is a volatile memory?',
            correct_answer: 'true',
            incorrect_answers: [
                'false',
            ]
        },
        {
            category: 'Computer',
            type: "multiple",
            difficulty: 'medium',
            question: 'Who is known as the father of Computer?',
            correct_answer: 'Charles Babbage',
            incorrect_answers: [
                'Thomas Edison',
                'Einstein',
                'Newton'
            ]
        },
        {
            category: 'History',
            type: "multiple",
            difficulty: 'hard',
            question: 'Who is our national poet?',
            correct_answer: 'Allama Iqbal',
            incorrect_answers: [
                'Quaid-e-Azam',
                'Mir Taqqi Mir',
                'Mirza Galib'
            ]
        },
        {
            category: 'Computer',
            type: "bool",
            difficulty: 'easy',
            question: 'HDD is better than SSD.',
            correct_answer: 'false',
            incorrect_answers: [
                'true',
            ]
        },
        {
            category: 'Computer',
            type: "multiple",
            difficulty: 'medium',
            question: 'There are ____ main parts of CPU',
            correct_answer: 'two',
            incorrect_answers: [
                'three',
                'four',
                'five'
            ]
        },
        {
            category: 'Computer',
            type: "bool",
            difficulty: 'medium',
            question: 'CU stands for?',
            correct_answer: 'Control Unit',
            incorrect_answers: [
                'Computer System',
                'Controlled System',
            ]
        },
        {
            category: 'History',
            type: "multiple",
            difficulty: 'hard',
            question: 'Quaid-e-Azam was born on 25 December ________ in Karachi.',
            correct_answer: '1876',
            incorrect_answers: [
                '1877',
                '1878',
                '1875'
            ]
        },
        {
            category: 'Computer',
            type: "multiple",
            difficulty: 'easy',
            question: 'In RAM, M stands for',
            correct_answer: 'Memory',
            incorrect_answers: [
                'Machine',
                'Merchant',
                'Message'
            ]
        },
        {
            category: 'Computer',
            type: "multiple",
            difficulty: 'medium',
            question: 'There are ____ main parts of CPU',
            correct_answer: 'two',
            incorrect_answers: [
                'three',
                'four',
                'five'
            ]
        },
        {
            category: 'History',
            type: "multiple",
            difficulty: 'hard',
            question: 'Quaid-e-Azam was died on ________.',
            correct_answer: '11 September 1948',
            incorrect_answers: [
                '11 September 1947',
                '21 April 1947',
                '21 April 1948'
            ]
        },
        {
            category: 'Computer',
            type: "bool",
            difficulty: 'easy',
            question: 'Is RAM is a volatile memory?',
            correct_answer: 'true',
            incorrect_answers: [
                'false',
            ]
        },
        {
            category: 'Computer',
            type: "multiple",
            difficulty: 'medium',
            question: 'Who is known as the father of Computer?',
            correct_answer: 'Charles Babbage',
            incorrect_answers: [
                'Thomas Edison',
                'Einstein',
                'Newton'
            ]
        },
        {
            category: 'History',
            type: "multiple",
            difficulty: 'hard',
            question: 'Who is our national poet?',
            correct_answer: 'Allama Iqbal',
            incorrect_answers: [
                'Quaid-e-Azam',
                'Mir Taqqi Mir',
                'Mirza Galib'
            ]
        },
        {
            category: 'Computer',
            type: "bool",
            difficulty: 'easy',
            question: 'HDD is better than SSD.',
            correct_answer: 'false',
            incorrect_answers: [
                'true',
            ]
        },
        {
            category: 'Computer',
            type: "multiple",
            difficulty: 'medium',
            question: 'There are ____ main parts of CPU',
            correct_answer: 'two',
            incorrect_answers: [
                'three',
                'four',
                'five'
            ]
        },
        {
            category: 'Computer',
            type: "bool",
            difficulty: 'medium',
            question: 'CU stands for?',
            correct_answer: 'Control Unit',
            incorrect_answers: [
                'Computer System',
                'Controlled System',
            ]
        }
    ])
    let [current, setCurrent] = useState(0);
    let [difficulty, setDifficulty] = useState(2);
    let [options, setOptions] = useState([]);
    let [score, setScore] = useState(0);
    let [questionTime, setQuestionTime] = useState(10)
    let [attempted, setAttempted] = useState(0);
    let [selectedOpt, setSelectedOpt] = useState('');
    let [isCorrect, setIsCorrect] = useState(false);
    let [isAttempted, setIsAttempted] = useState(false);
    let [stopTimer, setStopTimer] = useState(false);
    let [isTimeOver, setIsTimeOver] = useState(false);

    //Functions
    const checkDifficulty = () => {
        const level = questions[current].difficulty;
        level === 'hard' ? setDifficulty(3) : level === 'medium' ? setDifficulty(2) : setDifficulty(1);
    }

    const handleOptions = () => {
        setOptions([questions[current].correct_answer, ...questions[current].incorrect_answers].sort())
    }

    const checkAnswer = (e) => {
        if (questions[current].correct_answer === e) {
            setScore(score + 1)
            setIsCorrect(true)
        }
        setAttempted(attempted + 1)
        setIsAttempted(true);
        setSelectedOpt(e);
        setStopTimer(true);
    }

    const navigate = useNavigate();
    const nextQuestion = () => {
        if (current + 1 === questions.length) {
            navigate('/Result', {
                state: {
                    totalQuestions: questions.length,
                    score
                }
            })
        }
        else {
            setCurrent(current + 1)
            setIsAttempted(false)
            setIsCorrect(false)
        }
        setStopTimer(false);
        setIsTimeOver(false);
    }

    const checkCorrect = (e) => {
        if (isAttempted && questions[current].correct_answer === e) { return " green " }
        if (isAttempted && e === selectedOpt && selectedOpt !== questions[current].correct_answer) { return " red " }
        if (isAttempted) { return " disableOption" }
    }

    const handleCountdown = () => {
        checkAnswer('');
        setIsTimeOver(true);
    };

    useEffect(() => {
        checkDifficulty();
        handleOptions();
    }, [current])


    return (
        <div className="mainBox">

            {/* questions user has attempted */}
            <StatusBar width={attempted / questions.length * 100} />

            {/* main content */}
            <div className='mainContent'>

                <div className='questionHeader'>
                    <div>
                        <Typography variant='p'>Entertainment Board Game </Typography>
                        <Typography variant='h4'>Question {current + 1} of {questions.length}</Typography>
                        <Rating value={difficulty} max={3} readOnly />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TimerOutlinedIcon />
                        <Countdown startingSeconds={questionTime} stopTimer={stopTimer} func={handleCountdown} />
                    </div>
                </div>

                {/* Question Rendering */}
                <Typography variant='h5' mt={3}>{questions[current].question}</Typography>
                <Grid container spacing={3} mt={2} >
                    {
                        options.map((e, i) => {
                            return (
                                <Grid lg={6} md={6} sm={6} xs={12} item key={i}>
                                    <div onClick={() => checkAnswer(e, i)} className={'optionBox ' + checkCorrect(e)} >
                                        <Typography >{e}</Typography>
                                    </div>
                                </Grid>
                            )
                        })
                    }
                </Grid>

                {
                    isAttempted &&

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {isTimeOver ?
                            <Typography variant='h4' mt={3} sx={{ color: 'red' }}>OOPs Time Over!</Typography>
                            :
                            isCorrect ?
                                <Typography variant='h4' mt={3} sx={{ color: 'green' }}>Correct!</Typography>
                                :
                                <Typography variant='h4' mt={3} sx={{ color: 'red' }}>Sorry!</Typography>
                        }
                        <SButton onClick={nextQuestion} label={(current === questions.length - 1) ? 'Finish Quiz' : 'Next Question'} />
                    </div>
                }

                <div className='progressBox'>

                    <div className='progressText'>
                        {/* Score */}
                        <Typography>Score: {Number.isNaN(score / attempted * 100) ? 0 : (score / attempted * 100).toFixed(0)}%</Typography>

                        {/* Max Score */}
                        <Typography>Max Score: {((score + questions.length - attempted) / questions.length * 100).toFixed(0)}%</Typography>
                    </div>

                    {/* Required ProgressBar */}
                    < div style={{ width: '100%', position: 'relative' }} >

                        <div className='prog' style={{ backgroundColor: 'gray', width: `100%` }}></div>

                        <div className='prog' style={{ backgroundColor: 'green', width: `${((score + questions.length - attempted) / questions.length * 100).toFixed(0)}%` }}></div>

                        <div className='prog' style={{ backgroundColor: 'yellow', width: `${attempted / questions.length * 100}%` }}></div>

                        {/* <div className='prog' style={{ backgroundColor: 'orange', width: `${Number.isNaN(score / attempted) ? 0 : (score / attempted * 100)}%` }}></div> */}

                        <div className='prog' style={{ backgroundColor: 'red', width: `${score / questions.length * 100}%` }}></div>
                    </div >

                    {/* My Opinion */}
                    < div style={{ width: '100%', position: 'relative', marginTop: '40px' }} >

                        <div className='prog' style={{ backgroundColor: 'gray', width: `100%` }}></div>

                        <div className='prog1' style={{ backgroundColor: 'red', width: `${(attempted - score) / questions.length * 100}%`, left: `${(score / questions.length * 100).toFixed(0)}%` }}></div>

                        <div className='prog' style={{ backgroundColor: 'green', width: `${(score / questions.length * 100).toFixed(0)}%` }}></div>


                    </div >
                </div>

            </div>

        </div>
    );
}

export default Quiz;
