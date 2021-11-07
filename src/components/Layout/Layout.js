import Nav from "../Nav/Nav";

import styles from "./Layout.module.css";
// 👈
// 👉 App.js
export default function Layout({ children }) {
    return (
        <>
            <Nav />
            <main className={styles.main}>
                <div className="container">
                    {children}
                    {/* Layout er pet er moddhe ja ashbe .. sheta dekhabe  */}
                </div>
            </main>
        </>
    );
}
