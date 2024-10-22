import React, { useEffect, useState } from 'react';

const Quiz = ({ data }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [correctQuestionIds, setCorrectQuestionIds] = useState([]);

  const questions = data; // dataは配列として渡される

  useEffect(() => {
    // クイズが開始されたときに状態をリセット
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowScore(false);
    setCorrectQuestionIds([]);

    // ローカルストレージからスコアを読み込む
    const savedScore = localStorage.getItem('quizScore');
    if (savedScore !== null) {
      setScore(parseInt(savedScore, 10));
    }

    // ローカルストレージから正解した問題のIDを読み込む
    const savedCorrectQuestionIds = localStorage.getItem('correctQuestionIds');
    if (savedCorrectQuestionIds !== null) {
      setCorrectQuestionIds(JSON.parse(savedCorrectQuestionIds));
    }
  }, [questions]);

  useEffect(() => {
    // スコアが更新されたときにローカルストレージに保存
    localStorage.setItem('quizScore', score);
    localStorage.setItem('correctQuestionIds', JSON.stringify(correctQuestionIds));
  }, [score, correctQuestionIds]);

  if (!questions || questions.length === 0) {
    return <div>クイズデータがありません。</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === currentQuestion.answer) {
      // 正解した問題のIDが既に存在しない場合のみスコアをカウント
      if (!correctQuestionIds.includes(currentQuestion.id)) {
        setScore(score + 1);
        setCorrectQuestionIds([...correctQuestionIds, currentQuestion.id]);
      }else(
        alert('すでに正解しています')
      )
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer('');
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      {showScore ? (
        <div>あなたのスコアは {score} 点です。</div>
      ) : (
        <div>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                value={option}
                checked={selectedAnswer === option}
                onChange={handleAnswerSelect}
              />
              {option}
            </div>
          ))}
          <button onClick={handleSubmit}>回答を送信</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;