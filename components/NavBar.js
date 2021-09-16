import React, { useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { styles } from '../styles/styles.js';

export const NavBar = (props) => {
    return (
        <div style={styles.navBar}>
            <h1 style={styles.navBar.primaryElement}>
                NFT Meme Minter              
            </h1>
            
            <div style={styles.navBar.navigation}>
                <Button variant="outlined" style={styles.intro.startButton}>Sign Up</Button>
            </div>
        </div>   
    )
};