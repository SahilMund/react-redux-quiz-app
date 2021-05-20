import "./Quiz.css";
import {
  CircularProgress,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

import {useSelector} from 'react-redux'
import { useEffect, useState ,useRef} from "react";
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import Question from "../../components/Question/Question";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useHistory } from "react-router";
const userData = JSON.parse(localStorage.getItem("DATA"));

const RenderTime = ({ remainingTime }) => {
 
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender(val => val + 1);
    }, 10);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
        </div>
      )}
      
    </div>
  );
};

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {

  const quizData = useSelector(state => state.quizReducer)
  const scor = localStorage.getItem("SCOR");
  const history = useHistory()
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const [timer, setTimer] = useState(20);
  const id =useRef(null);
  const clear=()=>{
  window.clearInterval(id.current)
}

  useEffect(()=>{
     id.current=window.setInterval(()=>{
      setTimer((time)=>time-1)
    },1000)
    return ()=>clear();
  },[])

  useEffect(()=>{
    if(timer===0){
      clear()
      history.push('/')
    }
  },[timer])



  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  console.log(questions);

  

  const handleShuffle = (options) => {
    
    return options.sort(() => Math.random() - 0.5);
  };

  
  return (
    <div  className="quiz">
  
  <div className="navbar">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            Quizzy
          </Typography>
         {
           name || userData?(
            <Typography className="subtitle" variant="h6"  >
            Welcome , {name?name:userData?userData.name:""}
            <Avatar style={{float:"left",marginRight:"10px"}}>{name?name[0]:userData?userData.name[0]:""}</Avatar>
          </Typography>
           ):
           ''
         }
          <Button variant="contained" color="secondary" size="large" href="/">
          <Tooltip title="Exit" onClick={()=>{ localStorage.clear()}}>
            <ExitToAppIcon/>
            </Tooltip>
          </Button>{" "}
        </Toolbar>
      </AppBar>
      </div>

      {questions ? (
        <>
          <div className="quizInfo">
            <span>
              <h6 className="category_ques">{questions[currQues].category}</h6>
              <h6 className="level_ques"> LEVEL : {questions[currQues].difficulty}</h6>
            </span>
            <span className="score_ques">
             
              Score : {quizData.scor?quizData.scor:0} /10
            </span>
          </div>
          <div className="timer">
          <div className="timer-wrapper">
        
      </div>


      <CountdownCircleTimer className="countdown_timer"
          isPlaying
          duration={60}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        >
          {RenderTime}
        </CountdownCircleTimer>
      
  

          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;




 