import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ id: null, question: "", answer: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get('https://task-backend-k2nf.onrender.com/api/questions');
      setQuestions(res.data);
    };
    fetchQuestions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion({ ...currentQuestion, [name]: value });
  };

  const handleAddQuestion = async () => {
    if (currentQuestion.question && currentQuestion.answer) {
      const res = await axios.post('https://task-backend-k2nf.onrender.com/api/questions', currentQuestion);
      setQuestions([...questions, res.data]);
      setCurrentQuestion({ id: null, question: "", answer: "" });
    }
  };

  const handleEditQuestion = (question) => {
    setCurrentQuestion(question);
    setIsEditing(true);
  };

  const handleUpdateQuestion = async () => {
    await axios.put(`https://task-backend-k2nf.onrender.com/api/questions/${currentQuestion.id}`, currentQuestion);
    setQuestions(
      questions.map((q) =>
        q.id === currentQuestion.id ? currentQuestion : q
      )
    );
    setCurrentQuestion({ id: null, question: "", answer: "" });
    setIsEditing(false);
  };

  const handleDeleteQuestion = async (id) => {
    await axios.delete(`https://task-backend-k2nf.onrender.com/api/questions/${id}`);
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="form">
        <input
          type="text"
          name="question"
          placeholder="Enter question"
          value={currentQuestion.question}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="answer"
          placeholder="Enter answer"
          value={currentQuestion.answer}
          onChange={handleInputChange}
        />
        {isEditing ? (
          <button onClick={handleUpdateQuestion}>Update Question</button>
        ) : (
          <button onClick={handleAddQuestion}>Add Question</button>
        )}
      </div>

      <div className="question-list">
        <h3>Question List</h3>
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              <span>{q.question} - {q.answer}</span>
              <button onClick={() => handleEditQuestion(q)}>Edit</button>
              <button onClick={() => handleDeleteQuestion(q.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
