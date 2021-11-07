import Account from "./Account";
import styles from "./Nav.module.css";
import logo from "../../assets/images/logo-bg.png";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link to="/" className={styles.brand}>
                        <img src={logo} alt="Learn with Sumit Logo" />
                        <h3>Learn with Sumit</h3>
                    </Link>
                </li>
            </ul>
            <Account />
        </nav>
    );
}
