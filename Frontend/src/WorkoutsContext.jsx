// // eslint-disable-next-line no-unused-vars
// import React, { createContext, useReducer, useState } from 'react'

// export const WorkoutsContext = createContext()

// export const workoutsReducer = (state, action) => {

//     switch(action.type){
//         case 'SET_WORKOUTS':
//             return  {
//                 workouts: action.payload
//             }
//         case 'CREATE_WORKOUTS': 
//         return  {
//                 workouts: [action.payload,...state.workouts]
//             }
//         default:
//             return state
//     }
 
// }

// export const WorkoutsContextProvider = ({children}) => {

//     const [state, dispatch] = useReducer(workoutsReducer, {
//         workouts: null,
        
//     })

//     dispatch ({type : 'SET_WORKOUTS', payload : [{}, {}]})

//     return (
//         <WorkoutsContext.Provider value={{state, dispatch}}>
//             { children }
//         </WorkoutsContext.Provider>
//     )
// }
// eslint-disable-next-line no-unused-vars
import React, { createContext, useReducer, useState } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {

    switch(action.type){
        case 'SET_WORKOUTS':
            return  {
                workouts: action.payload
            }
        case 'CREATE_WORKOUTS': 
        return  {
                workouts: [action.payload,...state.workouts]
            }
            
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w)=> w._id !== action.payload._id)
            }
            
        case 'UPDATE_WORKOUT':
        default:
            return state
    }
 
}

export const WorkoutsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null,
        
    })

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
)
}