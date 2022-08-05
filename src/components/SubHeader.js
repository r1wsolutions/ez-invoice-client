import classes from './SubHeader.module.css'

const SubHeader = () =>{
    return (
        <div className={classes['sub-header']}>
            <h1 className={classes.title}>Welcome to Ez-Invoice</h1>
            <h3 
                className={classes['sub-title']}
            >
                A free service that allows you to quickly and easily create invoices for your businesses needs!
            </h3>
            <ul className={classes.descriptions}>
                <li className={classes.description}>input billing data to instantly create an invoice</li>
                <li className={classes.description}>bill based on a per hour basis, monthly fee, annual charge, or the quantity of an item sold</li>
                <li className={classes.description}>instantly generate a PDF invoice to bill clients</li>
            </ul>
        </div>
    )
}

export default SubHeader