import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Flashcard.css';

const Flashcard = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get('http://localhost:5000/api/questions');
      setQuestions(res.data);
    };
    fetchQuestions();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  return (
    <div className="flashcard-container">
      {questions.length > 0 && (
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
          <div className="front">
            <p>{questions[currentIndex].question}</p>
          </div>
          <div className="back">
            <p>{questions[currentIndex].answer}</p>
          </div>
        </div>
      )}
      <button onClick={handleFlip}>Flip Card</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Flashcard;
