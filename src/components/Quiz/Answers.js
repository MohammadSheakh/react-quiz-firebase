// import  from "./";
// import  from "./";
import { Fragment } from "react";
import Checkbox from "../Form/Checkbox";
import styles from "./Answers.module.css";
// import logo from "";

export default function Answers({ options = [], handleChange, input }) {
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
                    <Fragment key={index}>
                        {/* Fragment use na korle key boshano jay na .. mane <></> eita use korle key boshano jay na                          */}
                        {input ? (
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
                        ) : (
                            <Checkbox
                                className={`${styles.answer} ${
                                    // dynamically value niye ashbo .. correct boshabo naki wrong
                                    option.correct
                                        ? styles.correct
                                        : option.checked
                                        ? styles.wrong
                                        : null
                                }`}
                                text={option.title}
                                // controlled component banate hobe .. definitely amake value dite hobe
                                // value={index} // uncontrolled .. ejonno value o dibo na
                                key={index}
                                defaultChecked={option.checked} // amra false dia initialize kore disilam ..
                                disabled
                                // er pore click korle sheta true hobe ..
                                // onChange={(e) => handleChange(e, index)}
                                // input na dile onChange deowa lagbe na ..
                            ></Checkbox>
                        )}
                    </Fragment>
                ))}
            </div>
        </>
    );
}
