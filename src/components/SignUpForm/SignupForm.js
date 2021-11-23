// import  from "./";

// import Form from "../components/Form/Form";
// import TextInput from "../components/Form/TextInput";
// import Checkbox from "../components/Form/Checkbox";

//import styles from "./.module.css";
// import image1 from "";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../Form/Button";
import Checkbox from "../Form/Checkbox";
import Form from "../Form/Form";
import TextInput from "../Form/TextInput";

export default function SignupForm() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    // signup korar jonno .. jei signup function ta .. sheta amake niye ashte hobe ..
    const { signup } = useAuth();
    const navigate = useNavigate();

    // ekhon amader signup function ta banate hobe .. signup e press korle ki kaj ta hobe ..
    async function handleSubmit(e) {
        //form submit deowar pore ei function ta kaj korbe ..
        e.preventDefault(); // form submit kora hole .. page reload nibe na ..
        if (password !== confirmPassword) {
            return setError("Password don't match");
        }
        // signup ta jehetu assynchronous tai amar ekta loading state o proyojon hobe ..

        // ei ta ekta asyncronous function .. right .. so ekhane amake signup ta ke call korte hobe ..
        // tahole .. asyncronous function e amra try catch block use korbo ..
        try {
            setError(""); // ager state e kono error thakle sheta clear hoye jabe ..
            setLoading(true); //  loading houwa shuru hobe ..
            await signup(email, password, userName); // signup function ta call korlam ..
            navigate("/"); // eta may be amader ke homepage e niye jabe othoba erokom kono kaj korbe ..
        } catch (err) {
            console.log("🔴🔴", err);
            setLoading(false);
            setError("Failed to create an account!");
        }
    }

    return (
        <>
            {/* className={ ${styles. } ${styles. }} 
            className={styles.} */}
            <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    placeholder="Enter Name"
                    icon="person"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                ></TextInput>

                <TextInput
                    required
                    type="email"
                    placeholder="Enter Email"
                    icon="alternate_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></TextInput>

                <TextInput
                    required
                    type="password"
                    placeholder="Enter password"
                    icon="lock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></TextInput>

                <TextInput
                    required
                    type="password"
                    placeholder="Confirm password"
                    icon="lock_clock"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></TextInput>

                <Checkbox
                    required
                    text="I agree to the Terms &amp; Conditions"
                    value={agree}
                    onChange={(e) => setAgree(e.target.value)}
                ></Checkbox>
                <Button disabled={loading} type="submit">
                    {/* button loading state e thakle .. button disabled thakbe .. mane sheta click kora jabe na */}
                    <span>Submit Now</span>
                </Button>
                {/* kono error hoile eita ekhane dekha jabe .. ar global css design ta follow korbe ..  */}
                {error && <p className="error">{error}</p>}

                <div class="info">
                    Already have an account? <Link to="/login">login</Link>{" "}
                    instead.
                </div>
            </Form>
        </>
    );
}
