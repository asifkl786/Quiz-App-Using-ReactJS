import React, { useState,useRef } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

const Quiz = () => {
    let [index , setIndex] = useState(0);
    let [ question, setQuestion] = useState(data[index]);
    let [lock,setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let optionA = useRef(null);
    let optionB = useRef(null);
    let optionC = useRef(null);
    let optionD = useRef(null);

    let option_array = [optionA,optionB,optionC,optionD]; 

    const checkAns = (e,answer) => {
        if(lock === false){
            if(question.answer === answer){
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            }else{
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.answer-1].current.classList.add("correct");
            }
        } 
    }
    const next = () => {
       if(lock === true) {
            if(index === data.length-1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
       }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

  return (
    <div className='container'>
         <h1> Quiz App</h1>
         <hr />
         {result ? <></> : <> <h2>{index + 1}.{data[index].question}</h2>
         <ul>
            <li ref={optionA} onClick={(e)=>{checkAns(e,1)}}>{data[index].optionA}</li>
            <li ref={optionB} onClick={(e)=>{checkAns(e,2)}}>{data[index].optionB}</li>
            <li ref={optionC} onClick={(e)=>{checkAns(e,3)}}>{data[index].optionC}</li>
            <li ref={optionD} onClick={(e)=>{checkAns(e,4)}}>{data[index].optionD}</li>
         </ul>
         <button onClick={next}>Next</button>
         <div className='index'>{index + 1} of {data.length} questions</div>
         </> }
         {result ? <>
            <h2>You Scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button></> : <></>}
       
    </div>
  )
}

export default Quiz