import Form from "../components/Form/Form";
import TextInput from "../components/Form/TextInput";
import Checkbox from "../components/Form/Checkbox";
import Button from "../components/Form/Button";
import Illustration from "../components/Illustration/Illustration";
import styles from "../styles/SignUp.module.css";
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
                <Form className={`${styles.signup}`}>
                    <TextInput
                        type="text"
                        placeholder="Enter Name"
                        icon="person"
                    ></TextInput>

                    <TextInput
                        type="email"
                        placeholder="Enter Email"
                        icon="alternate_email"
                    ></TextInput>

                    <TextInput
                        type="password"
                        placeholder="Enter password"
                        icon="lock"
                    ></TextInput>

                    <TextInput
                        type="password"
                        placeholder="Confirm password"
                        icon="lock_clock"
                    ></TextInput>

                    <Checkbox text="I agree to the Terms &amp; Conditions"></Checkbox>
                    <Button>
                        {" "}
                        <span>Submit Now</span>{" "}
                    </Button>
                    <div class="info">
                        Already have an account? <a href="login.html">Login</a>{" "}
                        instead.
                    </div>
                </Form>
                {/* className jeta pathacchi eta kintu props ... className dia receive
                korte hobe oi pash theke  */}
            </div>
        </>
    );
}
