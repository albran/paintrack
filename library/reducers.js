export const liveStrokeReducer = (state, dispatch) => {
  switch (dispatch.do) {
    case "init":
      return { ...dispatch.props };
    case "append":
      return { ...state, ...dispatch.props };
    case "set":
      return { ...dispatch.props };
    case "delete":
      return null;
  }
};

export const strokesReducer = (state, dispatch) => {
  switch (dispatch.do) {
    case "append":
      return [...state, { ...dispatch.payload }];
    case "set":
      return [...dispatch.payload];
    case "delete":
      return state.filter((val, i) => dispatch.i !== i);
  }
};

export const factorsReducer = (state, dispatch) => {
  switch (dispatch.do) {
    case "set":
      return { ...dispatch.payload };
    case "toggle":
      return { ...state, ...dispatch.payload };
  }
};

export const factorsInitialState = {
  opened: false,
  sex: false,
  one: false,
  two: false,
  bleeding: "none",
};
