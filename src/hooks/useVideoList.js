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

export default function useVideoList(page) {
    // 🔢📢
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    // hasMore .. mane kokhon ashole amra thambo .. mane amar ar data nai .. sheta to amader jante
    // hobe .. mane amader ke hasmore ta track korte hobe .. tar mane ekta local state lagbe ..
    const [hasMore, setHasMore] = useState(true);
    // //snapshot.exists() jokhon ar thakbe na .. tokhon hasMore false hoye jabe

    useEffect(() => {
        // database related works
        async function fetchVideos() {
            const db = getDatabase();
            // database er reference ta prothom e pailam
            // database er jei node e ami kaj korte chai ....
            // shei node e amake access kora lagbe
            // tai shei node er ekta reference amake age
            // create korte hobe ...
            const videosRef = ref(db, "videos"); // she amake ref nam e ekta function dey..
            // ref er moddhe first e database er reference ta bole dite hoy ..
            // mane kon db .. 2nd parameter e node er nam bole dite hoy

            // ekhon kaj hocche database er okhan theke amake particular way te
            // amake query korte hobe ..
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt("" + page), // 🔢
                limitToFirst(10) //🔢📢 ekdom prothom e koyta video show korbe ..
            );
            // node er reference ta first parameter
            /**
             * kotha theke shuru korba / koto number video theke dekha shuru korba ..
             * number ta baire theke ashbe .. oi pash theke ekta local statement maintain kore ..
             *  number ta ashbe ..   ..
             * and koyta data diba mane koyta video dekhabe
             *  limitTOFirst => koyta data per page..  prothom theke 5 ta .. limitToLast .. Shesh theke 5 ta
             */

            // video query done .. amra ekhon data fetch korar jonno ready
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
                const snapshot = await get(videoQuery); // get er moddhe query ta diye dite hoy ..
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
                    setVideos((prevVideos) => {
                        return [
                            ...prevVideos,
                            ...Object.values(snapshot.val()),
                        ];
                    }); // object dey .. array banate chai
                } else {
                    //snapshot.exists() jokhon ar thakbe na .. tokhon hasMore false hoye jabe
                    setHasMore(false);
                }
            } catch (err) {
                console.log(
                    "🔴Database data fetch ..>> useVideoList.js : 🔴 : ",
                    err
                );
                setLoading(false);
                setError(true);
            }
        }

        // setTimeout(() => {
        fetchVideos();
        // }, 1000); // 1 second por por load korbe .. jeno amra bujhte pari ..

        // return () => {
        //     cleanup;
        // };
    }, [page]);

    // state gula ekhan theke return kore dite hobe .. jehetu state gula amader videoes file e dorkar hobe .. oi khane
    // amader ei hook ta use kora lagbe  ..
    // tai amra useEffect er pore amra ekta object return kore dibo ..
    return {
        loading,
        error,
        videos,
        hasMore,
    };
    // useVideoList jokhon keo import korbe .. tokhon she ei state gula pabe ..
    // Videos.js e amra ei hook ta call korbo ..
}
