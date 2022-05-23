import './App.css';
import React, { useState, useEffect } from 'react';

const API_URL = "https://opentdb.com/api.php";

const getAPIData = async (numberOfQuestions = 5) => {
	const response = await fetch(`${API_URL}?amount=${numberOfQuestions}&category=18&difficulty=medium&type=multiple`);
	const data = await response.json();
	console.log("data", data);
	return data;
}

function App() {
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

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
		setCurrentQuestion(currentQuestion + 1);
	}

	const handleRestart = () => {
		setCurrentQuestion(0);
		setScore(0);
	}

	return (
		<div className="App">
			{isLoading ? <h1 id = "loading">Loading...</h1> :
				<div>
					{ currentQuestion > 1 && currentQuestion < questions.length ? 
						<div>
              <h1 className = "score">Score: {Math.round(score / currentQuestion * 100)} % </h1>
						</div>
						: null 
					}
					{ currentQuestion < questions.length ?
					
						<div className = "quiz">
							<h2 id="questionNumber">{currentQuestion + 1} / {questions.length}</h2>
							<div id="question">
              <h1 dangerouslySetInnerHTML={{__html: questions[currentQuestion].question}} />
							{questions[currentQuestion].incorrect_answers.concat(questions[currentQuestion].correct_answer).sort(() => Math.random() - 0.5).map((answer, index) => {
								return (
									<button id="answer" key={index} onClick={() => handleAnswer(answer)} dangerouslySetInnerHTML={{__html:answer}} />
								)
							})}</div>
              
						</div>
						:
							<div className="finalScore">
								<h1>Final Score: {Math.round((score / questions.length) * 100)}%</h1>
								<button onClick={handleRestart} id="restart">Restart</button>
							</div>
						}
				</div>
			}
		</div>
	);
}

export default App;