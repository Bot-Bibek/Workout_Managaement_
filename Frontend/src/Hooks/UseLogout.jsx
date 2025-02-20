import { useAuthContext } from "./UseAuthContext";
import { useWorkoutsContext } from "./UseWorkoutContext";

export const useLogout = () => {

const {dispatch} = useAuthContext();
const {dispatch:workoutsDispatch} = useWorkoutsContext();
    const logout = () => {
        //remove the token from local storageA
        localStorage.removeItem('user');

        //dispatch logout action 
        dispatch({ type: 'LOGOUT' });
        workoutsDispatch({ type: 'SET_WORKOUTS', payload:null }); // Clear all workouts when user logs out
       
    }

    return {logout}
}