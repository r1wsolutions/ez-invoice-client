import HomeBtn from '../components/HomeBtn/HomeBtn'
import classes from './Header.module.css'

const Header =() =>{

    const reloadPageHanlder = () => {
        window.location.reload(false)
    }

    return (
        <header
            className={classes.header}
        >
            <div className={classes['nav-col']}>
                <div
                    className={classes.left}
                >
                    <h1 className={classes.title}>EZ-Invoice</h1>
                </div>
                <div
                    className={classes.right}
                >
                    <HomeBtn 
                        onClick={reloadPageHanlder}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header