import React from 'react';
import AlphabetStep from './Steps/AlphabetStep';
import StatesNumber from './Steps/StatesNumber';
import IntialAndFinalStates from './Steps/IntialAndFinalStates';
import TransitionStep from './Steps/TransitionStep';



const StepHandler = ({step, handleChange, handleInitial , handleFinal, data, handleTransitionAdd, handleTransitionChange , handleDeleteTransition}) => {
    const handleStepContent = () => {
        switch(step){
            case 1:
                return <AlphabetStep handleChange={handleChange} data={data}/>
            case 2:
              return <StatesNumber handleChange={handleChange} data={data}/>
            case 3:
              return <IntialAndFinalStates handleChange={handleChange} data={data} handleInitial={handleInitial} handleFinal ={handleFinal}/>
            case 4:
              return <TransitionStep data={data} handleTransitionAdd={handleTransitionAdd} handleTransitionChange={handleTransitionChange} handleDeleteTransition={handleDeleteTransition} />
            default:
                return <div>Stephane</div>
        }
    }
  return (
    <div>{handleStepContent()}</div>
  )
}

export default StepHandler