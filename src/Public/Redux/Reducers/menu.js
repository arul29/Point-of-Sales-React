const initialState = {
  menuData: [],
  // counter: 0,
  isLoading: false,
  isRejected: false,
  isFulfilled: false
};

const menu = (prevState = initialState, action) => {
  switch (action.type) {
    case "GET_MENU_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "GET_MENU_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "GET_MENU_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        menuData: action.payload.data.response
      };

    // case "POST_BOOK_PENDING":
    //   return {
    //     ...prevState,
    //     isFulfilled: false,
    //     isRejected: false,
    //     isLoading: true
    //   };
    // case "POST_BOOK_REJECTED":
    //   return {
    //     ...prevState,
    //     isLoading: false,
    //     isRejected: true
    //   };
    // case "POST_BOOK_FULFILLED":
    //   return {
    //     ...prevState,
    //     isLoading: false,
    //     isFulfilled: true,
    //     bookData: action.payload.data.response
    //   };

    default:
      return prevState;
  }
};

export default menu;
