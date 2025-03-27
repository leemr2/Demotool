import React, { createContext, useContext, useReducer } from 'react';

const DemoContext = createContext();

const initialState = {
  userType: null,
  currentStep: 1,
  knowledgeBase: null,
  selectedPersona: null,
};

function demoReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return {
        ...state,
        userType: action.payload,
        currentStep: 1,
      };
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'SET_KNOWLEDGE_BASE':
      return {
        ...state,
        knowledgeBase: action.payload,
      };
    case 'SET_SELECTED_PERSONA':
      return {
        ...state,
        selectedPersona: action.payload,
      };
    default:
      return state;
  }
}

export function DemoProvider({ children }) {
  const [state, dispatch] = useReducer(demoReducer, initialState);

  const setUserType = (userType) => {
    dispatch({ type: 'SET_USER_TYPE', payload: userType });
  };

  const setCurrentStep = (step) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  };

  const setKnowledgeBase = (knowledgeBase) => {
    dispatch({ type: 'SET_KNOWLEDGE_BASE', payload: knowledgeBase });
  };

  const setSelectedPersona = (persona) => {
    dispatch({ type: 'SET_SELECTED_PERSONA', payload: persona });
  };

  return (
    <DemoContext.Provider
      value={{
        state,
        setUserType,
        setCurrentStep,
        setKnowledgeBase,
        setSelectedPersona,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoContext must be used within a DemoProvider');
  }
  return context;
} 