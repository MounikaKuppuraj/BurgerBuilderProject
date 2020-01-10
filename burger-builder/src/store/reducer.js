import * as actionTypes from './action';
const INGREDIENT_PRICES={
    meat:5,
    bacon:3.5,
    cheese:0.5,
    salad:1.5
}
const initialState={
    ingredients:{
        meat:0,
        bacon:0,
        cheese:0,
        salad:0
    },
    totalPrice:4
}
const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                   [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]  
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                   [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state;
    }
}

export default reducer;
