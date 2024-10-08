import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "https://investmentplannerbe-4.onrender.com/api/v1/";
//const BASE_URL = "https://investmentplannerbe-4.onrender.com/api/v1/"

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [savings, setSavings] = useState([]);
  const [error, setError] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //calculate incomes
  const addIncome = async (income) => {
    console.log(income);
    const response = await axios.post(`${BASE_URL}add-income`, income).catch((err) => {
      setError(err.response.data.message);
    });
    getIncomes();
  };

  const updateIncome = async (income) => {
    const response = await axios.put(`${BASE_URL}update-income/${income.id}`, income).catch((err) => {
      setError(err.response.data.message);
      console.log("🚀 ~ updateIncome ~ response:", response);
    });
    return "success";
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate expenses
  const addExpense = async (expense) => {
    const response = await axios.post(`${BASE_URL}add-expense`, expense).catch((err) => {
      setError(err.response.data.message);
    });
    getExpenses();
  };

   const updateExpense = async (expense) => {
     const response = await axios
       .put(`${BASE_URL}update-expense/${expense.id}`, expense)
       .catch((err) => {
         setError(err.response.data.message);
         console.log("🚀 ~ updateExpense ~ response:", response);
       });
     return "success";
   };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data);
    console.log(response.data);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      totalExpenses = totalExpenses + expense.amount;
    });

    return totalExpenses;
  };

  //calculate investments
  const addInvestment = async (investment) => {
    const response = await axios.post(`${BASE_URL}add-investment`, investment).catch((err) => {
      setError(err.response.data.message);
    });
    getInvestments();
  };

   const updateInvestment = async (investment) => {
     const response = await axios
       .put(`${BASE_URL}update-investment/${investment.id}`, investment)
       .catch((err) => {
         setError(err.response.data.message);
         console.log("🚀 ~ updateInvestment ~ response:", response);
       });
     return "success";
   };

  const getInvestments = async () => {
    const response = await axios.get(`${BASE_URL}get-investments`);
    setInvestments(response.data);
    console.log(response.data);
  };

  const deleteInvestment = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-investment/${id}`);
    getInvestments();
  };

  const totalInvestments = () => {
    let totalInvestments = 0;
    investments.forEach((investment) => {
      totalInvestments = totalInvestments + investment.amount;
    });

    return totalInvestments;
  };

  //calculate savings
  const addSaving = async (saving) => {
    const response = await axios.post(`${BASE_URL}add-saving`, saving).catch((err) => {
      setError(err.response.data.message);
    });
    getSavings();
  };

   const updateSaving = async (saving) => {
     const response = await axios
       .put(`${BASE_URL}update-saving/${saving.id}`, saving)
       .catch((err) => {
         setError(err.response.data.message);
         console.log("🚀 ~ updateSaving ~ response:", response);
       });
     return "success";
   };

  const getSavings = async () => {
    const response = await axios.get(`${BASE_URL}get-savings`);
    setSavings(response.data);
    console.log(response.data);
  };

  const deleteSaving = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-saving/${id}`);
    getSavings();
  };

  const totalSavings = () => {
    let totalSavings = 0;
    savings.forEach((saving) => {
      totalSavings = totalSavings + saving.amount;
    });

    return totalSavings;
  };

  const totalBalance = () => {
    return totalIncome() - (totalExpenses() + totalInvestments() + totalSavings());
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses, ...investments, ...savings];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        updateIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        updateExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        addInvestment,
        updateInvestment,
        getInvestments,
        deleteInvestment,
        totalInvestments,
        addSaving,
        updateSaving,
        getSavings,
        deleteSaving,
        totalSavings,
        investments,
        savings,
        totalBalance,
        transactionHistory,
        error,
        setError,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
