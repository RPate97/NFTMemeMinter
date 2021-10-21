import React from 'react'
import { styles } from '../../styles/styles';
import Grid from '@material-ui/core/Grid';

export const MemeInfo = ({memeInfo}) => {
    return (
        <div style={styles.memePage.info}>
            <div style={{textAlign: 'center'}}> 
                <p style={styles.memePage.info.title}>{memeInfo.name}</p>
                <p style={styles.memePage.info.text}>{memeInfo.description}</p>                
            </div>
            <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid key={0} item>
                    <div style={styles.memePage.info.section}> 
                        <p style={styles.memePage.info.title}>Around the Web: </p>
                        {memeInfo.postings.map((el) => (
                            <li key={el}> 
                                <a href={el}>{el}</a>                                
                            </li>
                        ))}                
                    </div>
                </Grid>
                <Grid key={1} item>
                    <div style={styles.memePage.info.section}> 
                        <p style={styles.memePage.info.title}>Attributes: </p>
                        {memeInfo.attributes.map((el) => (
                            <p key={el.trait_type} style={styles.memePage.info.text}>{el.trait_type}: {el.value}</p>
                        ))}          
                        <p style={styles.memePage.info.text}>Votes: {memeInfo.score}</p>      
                    </div>  
                </Grid>                
            </Grid>
            </Grid>              
            <div style={styles.memePage.info.section}> 
                <p style={styles.memePage.info.title}>Verification Info: </p>
                <p style={styles.memePage.info.text}>Meme Hash (Hash of text and template identifier):</p>
                <p style={styles.memePage.info.text}>{memeInfo.memeHash}</p>
                <p style={styles.memePage.info.text}>Image Hash (Hash of raw image data):</p>
                <p style={styles.memePage.info.text}>{memeInfo.imgHash}</p>
            </div>
        </div>
    )
}