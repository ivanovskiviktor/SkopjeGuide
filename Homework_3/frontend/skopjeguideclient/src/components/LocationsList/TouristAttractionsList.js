import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {CircularProgress, Icon} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const fetchData = () => {
    return fetch('https://skopje-guide.herokuapp.com/api/attractions')
        .then(data => data.json());
}

export default function TouristAttractionsList() {
    const classes = useStyles();
    const [touristAttractions, setTouristAttractions] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        let mounted = true;
        fetchData().
        then(items => {
            if(mounted) {
                setTouristAttractions(items)
                setLoading(false)
            }
        })
        return () => mounted = false;
    }, [])

    if(loading) {
        return (<>
            <div style={{paddingLeft: "100px", paddingTop: "100px"}}>
                <h3>Loading ...</h3> <CircularProgress />
            </div>
        </>);
    } else {


        return (
            <>
                <h2>Tourist attractions:</h2>
                <List dense className={classes.root} style={{width: "175%"}}>
                    {touristAttractions && touristAttractions.map((value, index) => {
                        const labelId = `checkbox-list-secondary-label-${index}`;
                        return (

                            <ListItem key={value.id} button>
                                <ListItemAvatar>
                                    <Icon className="fas fa-map-marker-alt" style={{color: "grey"}}></Icon>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`${value.name}`}/>
                                <br/>
                                <br/>
                                <ListItemSecondaryAction>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </>
        );
    }

}