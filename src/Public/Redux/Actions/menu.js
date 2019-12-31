import Axios from "axios";

export const getMenu = () => {
  return {
    type: "GET_MENU",
    payload: Axios.get("http://localhost:6660/api/menu")
  };
};

// export const postBook = newBook => {
//   return {
//     type: "POST_BOOK",
//     payload: Axios.post(
//       "https://nameless-plateau-17084.herokuapp.com/book/addbook",
//       newBook,
//       {
//         headers: {
//           Authorization: "bearer " + localStorage.id_token
//         }
//       }
//     )
//   };
