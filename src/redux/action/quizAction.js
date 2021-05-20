export const addAnswer = (data) => (dispatch) => {
    console.log(data)
  dispatch({
    type: "ADD_ANSWER",
    payload: data,
  });
};

export const addScor = (data) => (dispatch) => {
  localStorage.setItem("SCOR",data)
  dispatch({
    type: "UPDATE_SCOR",
    payload: data,
  });
};
