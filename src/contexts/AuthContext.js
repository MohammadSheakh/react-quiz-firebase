// ekhane shobar age amra ekta context create korbo ..

import React, { useState, useContext, useEffect } from "react";
import "../firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged,
} from "firebase/auth"; // ei getAuth function ta call korle amra ekta authentication object pabo
// ei jinish ta amader signup and login er shomoy kaje lagbe ..

const AuthContext = React.createContext(); // first e ekta context create korlam

// now we are making a custom hook
export function useAuth() {
    return useContext(AuthContext); // jeta ashole tar use korar kotha chilo
    // taile jeita holo .. onnano component ke ekhon ar useContext use kora lagbe na .. karon taile abar tader ke
    // AuthContext ta provide kora lagto .. tara ekhon useAuth custom hook ta use korbe..
}

// ei context er value hishebe amra jekono jinish ke set korte pari ..
// context provider er value hishebe .. and shei provider dia amader application
// ke wrap kore dile .. and value pass kore dile .. shei value gulai hobe amar
// authentication state .. mane .. current user ke .... sign up function .. log in
// function  .. egula amra shekhane pass kore dibo .. shei jinish ta jokhon onno
// kono component sheta ke access korte jabe .. tokhon she useContext Hook er maddhome
// shei value gula ke access korte parbe ..

// amra context related shomosto kichui .. useContext ba ei bepar gula shomosto component e
// bar bar useContext() use na korte hoy.. ei full authentication feature ta shomosto component e
// available korar jonno .. amra ekta standard way dekhbo ..

// Authentication Provider .. ei AuthProvider dia e amra amader full application ke wrap korbo ..
// eta kintu amader Context er provider ta na .. ekhan theke  amra ashole return Context er provider ta korbo
// ekhoni amra bujhte parbo eta ..

// AuthProvider er moddhe jei shob component ke amra wrap korbo .. tader ke amra ekhane children akare pabo
export function AuthProvider({ children }) {
    // ekhon amader jehetu  instantly login state ta available thakbe na .. firebase shob shomoy server theke request kore niye ashte
    // hobe .. tai amader ekta loading state rakhte hobe .. sheta ke maintain korar jonno
    const [loading, setLoading] = useState(true);

    // jei user login korbe .. tar ekta usename thakbe .. ba current user object ekta dorkar hobe
    // login korar pore firebase theke current user ta pabo
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        // event listener ... event listen korar jonno boshe thake .. eita ekta side effect .. egula re
        // onAuthStateChanged

        // firebase er current user er logged in state er .. listener hocche onAuthStateChanged
        // ei jinish ta amra listen korbo always .. jokhon e status ta change hobe .. onAuthStateChanged
        // she amader ke janan dibe .. and shetar callback function e amra amader current user ta update
        // kore dibo .. tokhon amader setLoading ta proyojon hobe ...
        //

        const auth = getAuth();

        const unSubscribe = onAuthStateChanged(auth, (user) => {
            // current user ta pailam ..
            setCurrentUser(user);
            setLoading(false);
        });
        return unSubscribe; // memory leak hobe na .. kintu kahini ta bujhi nai 🔴
    }, []);

    // amader prothom kaj signup kora .. ekhane amra ekhon ekta signup function likhbo 🟠
    async function signup(email, password, username) {
        // signup form e amader name deowar option ase ..
        // firebase e signup korar shathe shathe log in o hoye jay ..
        // firebase er user object shomporke documentation dekhte hobe ..
        // Authentication jinish ta ke use korar jonno amader ke age .. firebase er AUTH object ta ke niye ashte hobe .
        //
        const auth = getAuth(); // Authentication korar jonno proyojonio AUTH ta firebase theke peye gelam ..
        // ami eibar signup korbo .. signup er jonno firebase er simple ekta function ase ..
        await createUserWithEmailAndPassword(auth, email, password); // kintu ei process ta hocche asyncronous process
        // karon  sever request korbe firebase e ..so eta kintu instanly hobe na ..
        // tar mane ekhane amader ke ashole await korte hobe .. kintu await use korte hobe .. definatly amader
        // async function use korte hobe ..
        // tahole ei process ta ultimately server theke request kore she ashole signup kore felbe ..

        // er porer kaj hocche amar profile update kora 🟡
        await updateProfile(auth.currentUser, {
            displayName: username,
        }); // amake current user ta dite hobe age .. karon ami tar profile
        // update korchi

        // ekhon amader state ta ke amader update korte hobe ..
        const user = auth.currentUser; // updated user ta niye ashlam ..
        setCurrentUser({
            ...user, // erokom kore korte hoy .. nahole 🔴immutably jinish ta hoy na ..
        });
    }

    // login function                                                                  🟠
    function login(email, password) {
        const auth = getAuth();
        // ekhan theke amra ashole ekta promise return kore dicchi ..
        //
        return signInWithEmailAndPassword(auth, email, password);
    }

    //logout function                                                                  🟠
    function logout() {
        const auth = getAuth();
        // ekta promise return kore
        return signOut(auth); // nahole she bujhbe na .. kon auth ta ke she ashole sign out korbe ..
    }

    // ebar authContext provider er value er moddhe shob kichu diye dibo
    const value = {
        currentUser,
        signup,
        login,
        logout,
    };
    return (
        // eta dia amra ashole amader full application ke wrap korbo .. and ekhane value prop dibo .. jei jinish tar
        // maddhome data amader full application e choriye jabe ..
        <AuthContext.Provider value={value}>
            {/* jei value ta pathabo .. shei value ta upore create korte hobe  */}
            {/* loading jotokkhon cholte thakbe .. totokkhon children dekhabo na  */}
            {!loading && children}
            {/* not loading jodi hoy .. taholei shudhu matro children ta dekha jabe  */}

            {/* ekhan theke amra jei value gula pathabo useAuth() custom hook use korle egula she peye jabe */}
        </AuthContext.Provider>
    );
}
