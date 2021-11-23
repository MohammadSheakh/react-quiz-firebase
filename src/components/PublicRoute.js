// logged in state ta bujhar jonno amra current user ta dorkar hobe .. useAuth ta amar lagbe
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
    const { currentUser } = useAuth(); // currentUser thakar manei hocche state ta logged in

    return !currentUser ? children : <Navigate to="/" />;
}
//================================================================================================
// // logged in state ta bujhar jonno amra current user ta dorkar hobe .. useAuth ta amar lagbe
// import { useAuth } from "../contexts/AuthContext";
// import { Route, Navigate } from "react-router-dom";

// export default function PublicRoute({ element: Element, ...rest }) {
//     // alias kore nilam .. element ke ekhon Element hishebeo access kora jabe ..
//     const { currentUser } = useAuth(); // currentUser thakar manei hocche state ta logged in

//     return !currentUser ? (
//         <Route {...rest}>{(props) => <Element {...props} />}</Route>
//     ) : (
//         // render props pattern er moto..Child hishebe Component / Element ta dia dite pari
//         // exact ar path egula rest hishebe receive hobe .. shegula Route er argument
//         // hishebe pass kore dilam .. ar <Element> ta child heshebe pass kore dilam ..
//         // Element er o argument thakte pare .. shegula thakleo props akare receive hobe
//         // ar ar <Element er argument hishebe pass kore dibo
//         // Good Practice
//         <Navigate to="/" />
//         // <Redirect to="/login" />
//     );
// }
