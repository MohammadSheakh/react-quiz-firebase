import Illustration from "../components/Illustration/Illustration";

import SignupForm from "../components/SignUpForm/SignupForm";
// import logo from "";

export default function Signup() {
    return (
        <>
            {/* className={styles.} /}
            {/ className={styles.} */}
            <h1>Create an account</h1>
            <div class="column">
                <Illustration />
                {/* duita class use kora  .. global form */}
                <SignupForm></SignupForm>

                {/* className jeta pathacchi eta kintu props ... className dia receive
                korte hobe oi pash theke  */}
            </div>
        </>
    );
}
