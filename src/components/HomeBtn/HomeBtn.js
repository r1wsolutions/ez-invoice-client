import classes from './HomeBtn.module.css'

const HomeBtn = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={classes.btn}
        >
            HOME
        </button>
    )
}

export default HomeBtn