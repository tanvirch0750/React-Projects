import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";

const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // for show setup form or question form
  const [waiting, setWaiting] = useState(true);
  // loading for fetching data
  const [loading, setLoading] = useState(false);
  // questions
  const [questions, setQuestions] = useState([]);
  // question index
  const [index, setIndex] = useState(0);
  // correct answers
  const [correct, setCorrect] = useState(0);
  // error
  const [error, setError] = useState(false);
  // modal error
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetch questions
  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);

    const response = await axios(url).catch((err) => console.log(err));

    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
      console.log(data);
    } else {
      setWaiting(true);
    }
  };

  // next questions
  const nextQuestions = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        // openModal()
        return 0;
      } else {
        return index;
      }
    });
  };

  // use-effect for development purpose later will refactor it
  useEffect(() => {
    fetchQuestions(tempUrl);
  }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
