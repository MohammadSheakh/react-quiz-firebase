import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
import Button from "../components/Form/Button";
import Form from "../components/Form/Form";
import TextInput from "../components/Form/TextInput";
import Illustration from "../components/Illustration/Illustration";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const { login } = useAuth();
    const navigate = useNavigate(); // login korar pore amake dashboard e jete hobe ..
    // ejonno amader navigate ta lagbe ..

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError("Failed to login!");
        }
    }

    return (
        <>
            <h1>Log in your account</h1>
            <div class="column">
                <Illustration />

                <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
                    <TextInput
                        type="text"
                        placeholder="Enter email"
                        icon="alternate_email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextInput
                        type="password"
                        placeholder="Enter password"
                        icon="lock"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit" disabled={loading}>
                        <span>Submit Now</span>
                    </Button>

                    {error && <p className="error">{error}</p>}

                    <div className="info">
                        Don't have an account? <Link to="/signup">Signup</Link>{" "}
                        instead.
                    </div>
                </Form>
            </div>
        </>
    );
}
