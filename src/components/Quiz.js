import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion'
import '../App.css'
import {ThemeContext} from '../App'
import Confetti from 'react-confetti'
import Modal from '../components/Modal';


const API_URL = "https://opentdb.com/api.php";

const getAPIData = async (numberOfQuestions = 5) => {
	const response = await fetch(`${API_URL}?amount=${numberOfQuestions}&category=18&difficulty=medium&type=multiple`);
	const data = await response.json();
	console.log("data", data);
	return data;
}


function Quiz() {
    const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		getAPIData().then(data => {
			setQuestions(data.results);
			setIsLoading(false);
		});
	}
	, []);

	const handleAnswer = (answer) => {
        if (answer === questions[currentQuestion].correct_answer) {
            setScore(score + 1);
            
        }
		setTimeout (() => {setCurrentQuestion(currentQuestion +1)}, 3000);
        setOpenModal(true);
       
	}
    
	const handleRestart = () => {
		setCurrentQuestion(0);
		setScore(0);
	}

	return (<div>
    <ThemeContext.Provider>
		<div className="App" id="light">
			{isLoading ? <h1 className = "loading">Loading...</h1> :
				<div>
					{/* { currentQuestion > 1 && currentQuestion < questions.length ? 
						<div>
              <h1 className = "score">Score: {Math.round(score / currentQuestion * 50)} </h1>
						</div>
						: null 
					} */}
					{ currentQuestion < questions.length ?
					
						<div className = "quiz">
							<h2 className="questionNumber">{score} / {questions.length}</h2>
							<motion.div 
                            initial={{x: '-100vw'}} 
                            animate={{x: 0}}
                            transition={{type: 'spring', duration: 2, bounce: 0.3}}
                            className="question">
                            <h1 dangerouslySetInnerHTML={{__html: questions[currentQuestion].question}} />
							{questions[currentQuestion].incorrect_answers.concat(questions[currentQuestion].correct_answer).sort(() => Math.random() - 0.5).map((answer, index) => {

								return (<div>
									<motion.button whileHover={{scale:1.2}} whileTap={{scale: 0.9}}  className="answer" key={index} onClick={() => handleAnswer(answer)} dangerouslySetInnerHTML={{__html:answer}} />
                                    </div>
								)
							})}

                            </motion.div>
                            <Modal open={openModal}
                                onClose={() => setOpenModal(false)}
								corrAnswer={questions[currentQuestion].correct_answer}
								close ={setTimeout(() => setOpenModal(false), 3000)}
								/>
								
                        
						</div>
						: <div>
                            <motion.div animate={{scale: 2}} transition={{duration:1.5}} className="finalScore">
								<h1>Final Score: {Math.round((score / questions.length) * 50)}</h1>
								<button onClick={handleRestart} className="restart">Restart </button></motion.div>
							    <Confetti />
                            </div>
                            
							
						}
				</div>
			}
		</div>
        </ThemeContext.Provider>
	</div>
    
	);
}

export default Quiz;
