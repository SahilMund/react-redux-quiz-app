import { Button } from "@material-ui/core";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { addAnswer,addScor } from "../../redux/action/quizAction";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
}) => {

  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct){
       setScore(score + 1);
       dispatch(addScor(score + 1))
      }
    setError(false);
  };

  const handleNext = () => {
    if (currQues > 8) {
      history.push("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
      dispatch(addAnswer(selected))
    } else setError("Please select an option first");
  };
  const handlePrevious = () => {
    if(currQues>0){
    setCurrQues(currQues - 1);
    setCurrQues(currQues-1)
    }
  };

  // const handleQuit = () => {
  //   setCurrQues(0);
  //   setQuestions();
  // };

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>
      remaining {10 - currQues} Out of 10 
      <div className="singleQuestion">
        <h3>{questions[currQues].question}</h3>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
         
          <Button
            variant="contained"
            color="primary"
            size="medium"
            
            onClick={handlePrevious}
          >
            Previous Question
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            
            onClick={handleNext}
          >
            {currQues > 8 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
