import React from 'react';
import burgerLogo from '../../assets/images/original.png' //We need to do this because when we are gonna launch the web to the server, webpack just take the src folder and join all files into a single folder, then by using this, we are creating a true reference, not referencing by the way to the folder, which again, will be wrong when deploying.
import styles from './Logo.module.css';

const logo = (props) => (
    <div className={styles.Logo} style={{height:props.height}}>
        <img src={burgerLogo} alt="MyBurger"></img>
    </div>
);

export default logo;

//OBS YOU CAN EITHER USE STYLE DYNAMIC PASSING height PROPS, OR WRAPPING IT INTO A DIV
//I CHOOSE THE OTHER APROACH CUZ I NEEDED TO CHANGE THE WIDTH AS WELL, SO ITS 'CLEVER' IF U'RE GOING TO CHANGE SOMETHING IN THE FUTURE