// import  from "./";
// import  from "./";
import Checkbox from "../Form/Checkbox";
import styles from "./Answers.module.css";
// import logo from "";

export default function Answers({ options = [], handleChange }) {
    return (
        <>
            <div className={styles.answers}>
                {/* <Checkbox
                    className={styles.answer}
                    text="text answer from Component > Quiz >  Answer.js > Checkbox "
                ></Checkbox> */}

                {/* checkbox to ar ekta hobe na .. options er shoman hobe checkbox .. 1 ta option thakle 
                1 ta checkbox.. 10 ta option thakle .. 10 ta checkbox */}

                {options.map((option, index) => (
                    // jehetu key dite hobe .. tai index tao niye nilam ..
                    <Checkbox
                        className={styles.answer}
                        text={option.title}
                        // controlled component banate hobe .. definitely amake value dite hobe
                        value={index}
                        key={index}
                        checked={option.checked} // amra false dia initialize kore disilam ..
                        // er pore click korle sheta true hobe ..
                        onChange={(e) => handleChange(e, index)}
                    ></Checkbox>
                ))}
            </div>
        </>
    );
}
