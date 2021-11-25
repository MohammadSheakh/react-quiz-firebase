// import  from "./";
// import  from "./";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import useQuestions from "../../hooks/useQuestions";
import Answers from "./Answers";
import MiniPlayer from "./MiniPlayer";
import ProgressBar from "./ProgressBar";
import styles from "./Quiz.module.css";
import _ from "lodash";
// import logo from "";
import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set } from "@firebase/database";
import { useNavigate } from "react-router-dom";

const initialState = null;

const reducer = (state, action) => {
    // action er upor depend kore updated state return kore ..
    switch (action.type) {
        // action er object type er jei action ta amra bolchilam .. shei jinish ta nibo ..
        // action.type er moddhe ashole amra value pabo ..
        // action ta hocche ekta object .. action er type property er moddhe amader actions ta ase
        case "questions":
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false;
                });
            });
            return action.value;
        // firebase theke data ashar pore .. amake ekta copy banate hobe .. and prottekta copy
        // er moddhe amake false kore dite hobe .. shei case er nam dhore nicchi ami questions
        // action.value hobe hocche .. firebase theke amra jei questions peyechi sheta ..
        /**
         * prottekta forEach e ami ekta kore question pabo .. tar prottekta options er moddhe
         * amake abar loop korte hobe .. and shei option er prottektar moddhe ekta kore check
         * boshiye dite hobe ..
         */
        case "answer":
            // jokhon user kono ekta .. option choose korbe .. tokhon .. tokhon basically ei case
            // ta fire hobe .. jokhon she answer e chap dibe .. answer ta ke dispatch korte hobe
            const questions = _.cloneDeep(state); // firebase theke jeta ashse .. shetar ekta copy korsi..
            // jehetu object ashe .. hubohu copy korte hobe ..deeply nested ..
            // immutably exactly shob level shoho copy korte gele amra 📢lodash use korte pari ..
            // eta ageo dekhechi..

            // questions er moddhe age amader current state ta full copy kore niye nilam ..
            // amar kaj hocche questions er jayga moto value ta ke true kore dibo ..
            // ami expect korbo action.value er moddhe ase shei jinish ta ..
            questions[action.questionID].options[action.optionIndex].checked =
                action.value;

            // questionID pass korbo .. option er index .. koto number option change korte hobe .. shetao
            // pass korbo
            // checked er value true korbo naki false korbo .. sheta action.value er moddhe pathabo ..
            return questions; // updated state ta return korlam
        default:
            return state;
    }
};

export default function Quiz() {
    const { id } = useParams();
    const { loading, error, questions } = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { currentUser } = useAuth();

    // database er jinish gula ke manupulate korar jonno amader local state e .. shetar ekta copy
    // baniye nilam ..

    // shob logic niye kaj korar jonno useReducerHook use korbo .. jehetu amra bishal object niye
    // kaj kortesi .. tai logic gula mane .. question change hole check naki unchecked .. ei gula
    // monitor korar bepar ta .. eikhane / ei file e korar theke reducer function er moddhe kore
    // sheta ke separate rakha ta better ..

    // notun jei copy ta amra banabo .. shetar nam dilam .. qna .. mane new state..
    // useReducer jehetu use korbo .. tahole ekhane ekta dispatch function pabo ..
    // useReducer er moddhe reducer nam e ekta function dite hoy .. initial state tao diye dite hoy ..
    const [qna, dispatch] = useReducer(reducer, initialState);

    const navigate = useNavigate(); // login korar pore amake dashboard e jete hobe ..
    // ejonno amader navigate ta lagbe .. // kotha change hobe ekhane ..

    useEffect(() => {
        dispatch({
            type: "questions", // reducer er case ..
            value: questions, // firebase theke peyechi ..
        }); // karon amra ekbar e copy banabo question state tar
    }, [questions]);

    function handleAnswerChange(e, index) {
        // jehetu kaj ta ekta form er button e chap deowar pore hobe .. definately amra ekta event pabo
        // and shei shathe amader oitar index number tao lagbe .. karon option joto gula ase .. tar moddhe
        // koto number index.. sheta amar lagbe
        dispatch({
            //action hobe ekta object
            type: "answer",
            questionID: currentQuestion, // local state theke .. current question ekhono update kori nai .. next button e press korle tokhon .. progress bar
            optionIndex: index,
            value: e.target.checked, // ekta value dite hobe .. action.value hishebe .. option ta true naki false .. sheta ashbe form er submission theke ..
            // checked box er karone e.target.value na .. e.target.checked
        });
    }

    // handle when user clicks the next button to get the next question
    // ekhane amader ke current question ta update kore felte hobe ..
    function nextQuestion(e, index) {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(
                (prevCurrentQuestion) => prevCurrentQuestion + 1
            );
        }
    }

    function prevQuestion(e, index) {
        if (currentQuestion > 1 && currentQuestion <= questions.length) {
            setCurrentQuestion(
                (prevCurrentQuestion) => prevCurrentQuestion - 1
            );
        }
    }

    // calculate percentage of progress
    const percentage =
        questions.length > 0
            ? ((currentQuestion + 1) / questions.length) * 100
            : 0;

    // submit quiz.. result ta database e save korar jonno .. firebase ke request korbe..
    /**
     * firebase er database e result nam e notun ekta node banabo .. and shei node er moddhe
     * user er jei ID .. mane firebase user er jei ekta id set kore .. sheta ..
     * mane hocche result namok node er moddhe current user er id er against e .. amra user er answer
     * gula ke save kore felbo .. user er shob kichu kintu amader kase ase .. useReducer use korar pore
     * amra je ekta state er copy baniyechilam .. shetai kintu amader checked state shoho .. user jei
     * jei answer gula select koreche .. shegula tar moddhe ase ..
     */
    async function submitQuiz() {
        // firebase e jehetu request korbo .. tai eta async function hobe ...
        // currentUser er theke user ID ta ber kore niye ashbo .
        const { uid } = currentUser;
        const db = getDatabase(); // user er answer gula ke submit korte chaile db reference lagbe
        const resultRef = ref(db, `result/${uid}`); // result node er jonno reference create korlam..
        // bolte hoy amake .. ami kon node e hit korbo .. mane kon node e data save korbo ..
        await set(resultRef, {
            // data read er shomoy get niyechilam.. write er shomoy set nite hobe ..
            // first parameter -> kon node e data update korbo , 2nd -> ki data update korbo ..
            [id]: qna, // id number node e amra save korbo .. id kintu property name .. tai [id] evabe likhte hoy
            // id er value ta ashole jeta .. sheta property name hishebe set hobe ..
            // ultimately kahini hoilo .. result node -> user id -> video id -> all question with checked  answer
        });
        // ekhon last kaj hocche submit jehetu .. tai porer page e niye jaowa .. mane result page ..

        // tai amra ekhane navigate use korte pari ...
        navigate({
            // URL er shathe .. ek e shathe . tar state tao pathiye dibo ..
            // karon jokhon amra result page e jabo .. tokhon kintu amader question ar tar
            // answer gula lagbe .. shegula shudhu shudhu database theke niye eshe to lav nai
            // jehetu amader kachei ase .. tai ekhan thekei pathiye dibo state ta ..
            // user er answer gula firebase theke niye ashleo question gula kintu dekhate hobe .
            // karon question analysis dekhate hobe .. shegula qna er moddhe anai ase .. ei state e

            // state jehetu pathate hobe .. tai shorashori link na pathiye amra ekta object pathaite pari
            pathname: `/result/${id}`, // video id o pathailam .. karon kon video er shob result dekhabe sheta jante hobe
            state: {
                qna,
            },
        });
    }

    // console.log("😂", qna);
    // console.log("😀", questions);

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && (
                <div>There was an error in Quiz.js useQuestions.js ...</div>
            )}
            {!loading && !error && qna && qna.length > 0 && (
                <div>
                    {/* currentQuestion amader ke question er number ta return kore may be .. onekta id er moto */}
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answers
                        input // input={true} // same kahini
                        options={qna[currentQuestion].options}
                        handleChange={handleAnswerChange}
                    ></Answers>
                    <ProgressBar
                        next={nextQuestion}
                        prev={prevQuestion}
                        progress={percentage}
                        submit={submitQuiz}
                    ></ProgressBar>
                    <MiniPlayer></MiniPlayer>
                </div>
            )}
        </>
    );
}
