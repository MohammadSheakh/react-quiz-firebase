// logged in state ta bujhar jonno amra current user ta dorkar hobe .. useAuth ta amar lagbe
import { useAuth } from "../contexts/AuthContext";
import { Route, Navigate, Routes } from "react-router-dom";

export default function PrivateRoute(
    /*{ element: Element, ...rest }*/ { children }
) {
    // alias kore nilam .. element ke ekhon Element hishebeo access kora jabe ..
    const { currentUser } = useAuth(); // currentUser thakar manei hocche state ta logged in

    return currentUser ? (
        // <Routes>
        //     <Route {...rest}>{(props) => <Element {...props} />}</Route>
        //     <Route>
        //         <Element></Element>
        //     </Route>
        // </Routes>
        children
    ) : (
        // <Element></Element>
        // render props pattern er moto..Child hishebe Component / Element ta dia dite pari
        // exact ar path egula rest hishebe receive hobe .. shegula Route er argument
        // hishebe pass kore dilam .. ar <Element> ta child heshebe pass kore dilam ..
        // Element er o argument thakte pare .. shegula thakleo props akare receive hobe
        // ar ar <Element er argument hishebe pass kore dibo
        // Good Practice
        <Navigate to="/login" />
        // <Redirect to="/login" />
    );
}
