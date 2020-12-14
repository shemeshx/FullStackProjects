import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import RecipeCard from './RecipeCard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    card: {
        textAlign: 'center',
    },
}));

function RecipesGrid() {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={6} direction="row" alignItems="center" >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <Grid item xs={4} className={classes.card}>
                        <RecipeCard />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
export default RecipesGrid;