export const initialState = {
    table_id: null,
    table_number: null,
    business_user: null,
    total_menu_item: null,
    cafe_id: null,
    total_members: null,
};

export const actionTypes = {
    SET_TABLE_ID: "SET_TABLE_ID",
    SET_TABLE_NUMBER: "SET_TABLE_NUMBER",
    SET_BUSINESS_USER: "SET_BUSINESS_USER",
    SET_TOTAL_MENU_ITEM: "SET_TOTAL_MENU_ITEM",
    SET_CAFE_ID: "SET_CAFE_ID",
    SET_TOTAL_MEMBERS: "SET_TOTAL_MEMBERS",
};

const reducer = (state, action) => {
    // console.log(action)

    switch (action.type) {
        case actionTypes.SET_BUSINESS_USER:
            return {
                ...state,
                business_user: action.business_user,
            };

        case actionTypes.SET_TOTAL_MENU_ITEM:
            return {
                ...state,
                total_menu_item: action.total_menu_item,
            };

        case actionTypes.SET_TABLE_ID:
            return {
                ...state,
                table_id: action.table_id,
            };

        case actionTypes.SET_TABLE_NUMBER:
            return {
                ...state,
                table_number: action.table_number,
            };

        case actionTypes.SET_CAFE_ID:
            return {
                ...state,
                cafe_id: action.cafe_id,
            };

        case actionTypes.SET_TOTAL_MEMBERS:
            return {
                ...state,
                total_members: action.total_members,
            };
        default:
            return state;
    }
};

export default reducer;