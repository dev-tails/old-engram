const INITIAL_STATE = new Date();

type SetDateAction = {
  type: "SET_DATE";
  payload: Date;
};

const DateReducer = (state = INITIAL_STATE, action: SetDateAction) => {
  switch (action.type) {
    case "SET_DATE":
      return action.payload;
    default:
      return state;
  }
};

export default DateReducer;
