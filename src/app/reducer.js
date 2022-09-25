export const initialState = {
    basket: []
}

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM"
}

const reducer = (state, action)=>{
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case "REMOVE_ITEM":
            const item = state.basket.findIndex((x)=>(x._id === action._id));
            const newItems = [...state.basket];
            item >= 0 ? newItems.splice(item, 1) : console.log("cannot be deleted");
            return {
                ...state,
                basket: newItems,
            }
        default: return state;
    }
}

export default reducer;