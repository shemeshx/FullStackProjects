import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Icon from '@material-ui/core/Icon';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));
export default function SideMenu() {
    const classes = useStyles();
    //https://material.io/ using icons
    const icons=[
        {name:"Login",iconString:"login"},
        {name:"Register",iconString:"create"}
    ]
    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <List>
                    {icons.map((obj, index) => (
                        <ListItem button key={obj.name}>
                            <ListItemIcon><Icon>{obj.iconString}</Icon></ListItemIcon>
                            <ListItemText primary={obj.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}
