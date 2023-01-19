import { Grid, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import StatusBar from '../components/StatusBar';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Countdown from '../components/Countdown';
import SButton from '../components/SButton';
import { useNavigate } from 'react-router-dom';
import questionsData from '../assets/questions'

function Quiz() {

    let [questions, setQuestions] = useState([]);
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
        if (questions && questions.length > 0) {
            const level = questions[current].difficulty;
            level === 'hard' ? setDifficulty(3) : level === 'medium' ? setDifficulty(2) : setDifficulty(1)   
        }
    }

    const handleOptions = () => {
        questions && questions.length > 0 &&
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
        console.log("in next question")
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

      const URLCharacterChanger = (data) => {
      return data.replace(/%20/g, " ").replace(/%3A/g,":").replace(/%3F/g,"?").replace(/%2C/g,",").replace(/%22/g,'"').replace(/%26/g,"&").replace(/%27/g,"'").replace(/%24/g,"$");
  }

  const questionsHandling = () => {
    questionsData.forEach((obj)=>{
      for (let x in obj) {
          if(typeof obj[x] != "object"){
               obj[x] = URLCharacterChanger(obj[x]);
            }else{
              let data = obj[x].map((e)=>{
              return URLCharacterChanger(e)
            })
            obj[x] = data;
          }      
        }
    })
    setQuestions(questionsData);
  }

  useEffect(()=>{
    questionsHandling();
  },[])
  
  useEffect(() => {
        checkDifficulty();
        handleOptions();
    }, [current,questions])


    return (
            < div className = "mainBox" >

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
                <Typography variant='h5' mt={3}>{questions && questions.length > 0 && questions[current].question}</Typography>
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
    )
}

export default Quiz;
