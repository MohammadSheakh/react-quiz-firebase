import { useEffect, useState } from "react";
import {
    getDatabase,
    ref,
    query,
    orderByKey,
    get,
    startAt,
    limitToFirst,
} from "firebase/database";

export default function useQuestions(videoID) {
    // 🔢📢
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]); // jei question gula database theke anbo .. shegula ekhane thakbe ..

    useEffect(() => {
        // database related works
        async function fetchQuestions() {
            const db = getDatabase();
            // database er reference ta prothom e pailam
            // database er jei node e ami kaj korte chai ....
            // shei node e amake access kora lagbe
            // tai shei node er ekta reference amake age
            // create korte hobe ...
            const quizRef = ref(db, "quiz/" + videoID + "/questions"); // she amake ref nam e ekta function dey..
            // ref er moddhe first e database er reference ta bole dite hoy ..
            // mane kon db .. 2nd parameter e node er nam bole dite hoy
            // quiz er moddhe video ID .. tar pore questions node

            // ekhon kaj hocche database er okhan theke amake particular way te
            // amake query korte hobe ..
            const quizQuery = query(quizRef, orderByKey());
            // node er reference ta first parameter

            // quiz query done .. amra ekhon data fetch korar jonno ready
            // database theke ..

            // async await jehetu korbo .. tai ager moto .. try catch niye nilam

            try {
                // loading and error state neowa lagbe ..
                // request korbo database e ..
                setError(false); // ager state e kono error thakle .. sheta ke
                // false kore nilam..
                setLoading(true); // karon request korar age Loading true kore nite hobe ..

                // request firebase datebase .. API request
                // URL dia korbo na .. firebase amake function diye dise ..
                // sheta diye korbo ..

                // data read korar jonno simple ekta get function diye diyeche firebase
                // get kintu ekta async function hobe .. jehetu data request korbe ..
                const snapshot = await get(quizQuery); // get er moddhe query ta diye dite hoy ..
                // tahole oi query onujayi amader ke data dibe ..
                // data ta snapshot er moddhe save kore fellam .. >> convention

                setLoading(false); // data chole ashse ..
                if (snapshot.exists()) {
                    // data paile value true
                    // data paile ekta local state rakhte hobe ..
                    /**
                     * setVideos er moddhe she ashole amader ekta object dey.. ami take ekta array banate chai ..
                     * setVideos er moddhe amra ekta callback function dite pari .. shekhane amra ager state ta prev..
                     * er maddhome pai .. tar pore amra shekhane ager state shoho .. updated state ta return kori ..
                     * and jehetu eta ekta object .. reference type.. so amake ashole etake immutably korte hobe ..
                     * jar karone amra evabe korsi .. amra ashole array banate chai .. prev.. ta to nilam .. tar shathe
                     * she to amake object diyeche .. tahole amra object theke array banate hobe .. object er value gula
                     * ke nite hobe amake .. object er key gula ke na .. object theke array bananor niyom hocche
                     * object.values() .. clg  kore snapshot ta dekhe neowa jete pare .. mane oi object er valueg gulake
                     * niye ami ekta array banacchi arki .. snapshot er moddhe ashole amader result thake na ..
                     * snapshot.val() ta hocche amader result .. eta amra clg kore dekhe nite pari ..
                     * sheta amra jeta pabo .. sheta hocche ekta array .. tahole shekhan theke destructure kore nite hobe
                     *  3 ta dot er maddhome ..
                     */
                    setQuestions((prevQuestions) => {
                        return [
                            ...prevQuestions,
                            ...Object.values(snapshot.val()),
                        ];
                    }); // object dey .. array banate chai
                }
                //  else {
                //     //snapshot.exists() jokhon ar thakbe na ..
                // }
            } catch (err) {
                console.log(
                    "🔴Database data fetch Question ..>> useQuestions.js : 🔴 : ",
                    err
                );
                setLoading(false);
                setError(true);
            }
        }

        // setTimeout(() => {
        fetchQuestions();
        // }, 1000); // 1 second por por load korbe .. jeno amra bujhte pari ..

        // return () => {
        //     cleanup;
        // };
    }, [videoID]);

    // state gula ekhan theke return kore dite hobe .. jehetu state gula amader videoes file e dorkar hobe .. oi khane
    // amader ei hook ta use kora lagbe  ..
    // tai amra useEffect er pore amra ekta object return kore dibo ..
    return {
        loading,
        error,
        questions,
    };
    // useVideoList jokhon keo import korbe .. tokhon she ei state gula pabe ..
    // Videos.js e amra ei hook ta call korbo ..
}
