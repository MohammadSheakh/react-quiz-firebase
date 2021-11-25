import { useLocation, useNavigate, useParams } from "react-router";
import Analysis from "../components/Result/Analysis";
import Summary from "../components/Result/Summery";
import useAnswers from "../hooks/useAnswers";
import _ from "lodash";

// import  from "./";
// import styles from "./.module.css";
// import image1 from "";

export default function Result() {
    const location = useLocation();
    const state = location;
    const qna = state; // qna er moddhe amader ager page e user e checked obosthay ultimately
    // full question object tai amader ekhane ase .. jeta amra .. quiz page er submit button er
    // oi khan e navigate er maddhome state ta pass korsilam ..

    // ar answers theke  mane database theke amra same type er ekta object pabo ..
    // difference hocche shekhane checked nai .. only correct gula true kora ase ...

    // so duita object kintu already amader kase ready kora ase .. ei duitar moddhei .. compare
    // korte hobe ..

    // and amader URL parameter e ID ase ..
    const { id } = useParams();

    // hook theke kichu jinish lagbe ..
    const { loading, error, answers } = useAnswers(id); // video ID ta pass kore dilam ..

    console.log("💻1->Page-> Result.js-> answers🟡", answers);
    function calculate() {
        let score = 0;
        answers.forEach((question, index1) => {
            let correctIndexes = [];
            let checkIndexes = [];
            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2); // shei option gular index niyei ami array ta
                // banate chai ..

                if (qna[index1].options[index2].checked) {
                    checkIndexes.push(index2); // shei option gular index niyei ami array ta
                    // banate chai ..
                    option.checked = true; // analysis er jonno kaje lagbe .. // qna er moddhe
                    // kintu checked nai .. checked add korlam.. value true korlam
                }
            });
            if (_.isEqual(correctIndexes, checkIndexes)) {
                // joto nested e hok .. she duita array compare korte pare ..
                score = score + 5;
            }
        });
        return score;
    }
    const userScore = calculate();
    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error in Result page</div>}
            {answers && answers.length > 0 && (
                <>
                    <Summary score={userScore} noq={answers.length}></Summary>

                    <Analysis answers={answers}></Analysis>
                </>
            )}
        </>
    );
}
