import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        background: 'linear-gradient(60deg, #d9e9ff 45%, #d9fffb 80%)',
        minHeight: 2,
        height: '100%'
    },
    textField: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        width: '300px',
    },
    menuButton: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        padding: 20,
        color: "white"
    }

}));