import { useEffect, useState } from "react"
import {FcUpload} from 'react-icons/fc'
import classes from './InvoiceForm.module.css'

const InvoiceForm =(props) =>{

    const [imageSelected, setImageSelected] = useState(false)

    const lineItemInput =(id) => <div className={classes["invoice-item"]}>                    

        <div className={`${classes['item-option']} ${classes['desc']}`}>
            <input className={`${classes["value-input"]} ${classes["description"]}`} name={`invoiceItems${id}`} type='text' placeholder='Enter Item Name'/>
            <label className={classes['item-label']}>Description</label>
        </div>        

        <div className={classes['item-option']}>
            <select className={classes["quantityOrHourly"]} name={`pricingType${id}`}>
                <option value="qty">Quantity</option>
                <option value="hourly">Hourly</option>
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
            </select>
            <label className={classes['item-label']}>Pricing-Type</label>
        </div>
        
        <div className={classes['item-option']}>
            <input className={`${classes["value-input"]} ${classes["item-quantity"]}`} name={`itemQuantity${id}`} type='number' placeholder='qty'/>
            <label className={classes['item-label']}>Quantity</label>
        </div>

        <div className={classes['item-option']}>
            <input className={`${classes["value-input"]} ${classes["cost"]}`} name={`itemCosts${id}`} type='number' placeholder='Cost'/>
            <label className={classes['item-label']}>Cost per 1 qty</label>
        </div>
        
        <div className={classes['item-option']}>
            <select name={`isTaxed${id}`} className={classes["quantityOrHourly"]}>
                <option value="notTaxed">no</option>
                <option value="isTaxed">yes</option>
            </select>
            <label className={classes['item-label']}>Tax applies</label>
        </div>
                             
    </div>
   

    const [lineItemsInputsCollection,setLineItemsInputsCollection]  = useState([])

    useEffect(()=>{

        const tempArr = []
        
        for(let i = 0; i < props.lineItems; i++)
        {
            tempArr.push(lineItemInput)
        }

        setLineItemsInputsCollection(tempArr)

    }, [props.lineItems,setLineItemsInputsCollection])

    const formSumbitHanler = (e) =>{
        e.preventDefault()
        
        const inputs = document.querySelectorAll('input');  
        const selects = document.querySelectorAll('select'); 
        try {

            const invoiceItems = []

            for(let index = 0; index < props.lineItems; index++)
            {
                invoiceItems.push({})
                for (let j = 0; j < inputs.length; j++) 
                {
                    if(inputs[j].value === '' && !inputs[j].name.includes('image')  
                        && !inputs[j].name.includes('invoiceId') && !inputs[j].name.includes('totalItems'))
                    {
                        console.log(inputs[j].name)
                        throw new Error(`Missing info for ${inputs[j].name}`)   
                    }
                    

                    if(parseInt(inputs[j].name[inputs[j].name.length - 1]) === index)
                    {
                        invoiceItems[index][inputs[j].name.substring(0, inputs[j].name.length - 1)] = inputs[j].value
                    }
                }
            }

            for(let index = 0; index < props.lineItems; index++)
            {
                for (let j = 0; j < selects.length; j++) 
                {
                    if(parseInt(selects[j].name[selects[j].name.length - 1]) === index)
                    {
                        invoiceItems[index][selects[j].name.substring(0, selects[j].name.length - 1)] = selects[j].value
                    }
                }
            }

            const payload = {
                invoiceId: e.target.invoiceId.value,
                chargeDate: e.target.chargeDate.value,
                dueDate: e.target.dueDate.value,
                taxRate: e.target.taxRate.value,
                
                businessInfo: {
                    name: e.target.BusinessName.value,
                    streetAddress: e.target.StreetAddress.value,
                    city: e.target.City.value + ', ' + e.target.State.value + ' ' + e.target.ZipCode.value,
                    //state: e.target.State.value,
                    //zipCode: e.target.ZipCode.value,
                    phoneNumber: e.target.BusPhoneNumber.value
                },
                invoiceItems: invoiceItems,
                clientInfo: {
                    name: e.target.ClientName.value,
                    streetAddress: e.target.ClietnStreetAddress.value,
                    city: e.target.ClientCity.value +', ' + e.target.ClientState.value + ' ' + e.target.ClientZipCode.value,
                    //state: e.target.ClientState.value,
                    //zipCode: e.target.ClientZipCode.value
                }
            }

            props.requestHandler(payload)
            
        } catch (error) {
            console.log({
                message: 'error',
                error: error.stack
            })

            alert(error.message)
        }
    }

    const clearFormHandler = () =>{
        const invoiceForm = document.getElementById('invoice-form')
        invoiceForm.reset()
    }
    

    return(
        <form className={classes.form} id='invoice-form' onSubmit={formSumbitHanler}>
                <h2>Logo</h2>
                
                <label className={`${classes["image-logo"]} ${ imageSelected && classes["image-selected"]}`}>
                    <div id={classes["label-text__holder"]}>
                        <p className={classes['label-text']}>
                            {
                                imageSelected ? 'change selected image' : 'select an image of your logo if applicable'
                            }
                        </p>
                    </div>
                    <div className={classes['file-icon']}>
                        <FcUpload
                            size='2rem'
                        />
                    </div>
                    <input 
                        onChange={()=>{setImageSelected(true)}}
                        className={classes['image-input']}  
                        type="file" 
                        name="image"
                    />
                </label>
                <div className={classes["form-section"]}>
                    <h2>Invoice Information</h2>
                    <label>Invoice Id</label>
                    <select className={classes.select}>
                        <option>yes</option>
                        <option>no</option>
                    </select>
                    <label >(Selecting no will auto generate an ID)</label>
                    <input className={classes.input} name="invoiceId"type="text" placeholder="enter an invoice id"/>

                    <label>Invoice Charge Date</label>
                    <input className={classes.input} name="chargeDate"  id="calendar-input" type="date"/>

                    <label>Invoice Due Date</label>
                    <input className={classes.input} name="dueDate" id="calendar-input" type="date"/>

                </div>

                <div className={classes["form-section"]}>
                    <h2>Business Information</h2>
                    <input className={classes.input} name='BusinessName' type='text' placeholder='Name/Business Name'/>
                    <input className={classes.input} name='StreetAddress' type='text' placeholder='Street Address'/>
                    <input className={classes.input} name='City' type='text' placeholder='City'/>
                    <input className={classes.input} name='State' type='text' placeholder='State'/>
                    <input className={classes.input} name='ZipCode' type='number' placeholder='Zip'/>
                    <input className={classes.input} name='BusPhoneNumber' type='number' placeholder='Phone number'/>
                </div>

                <h2>State tax-rate</h2>
                <h4>(Will only be applied where necessary)</h4>
                <input className={classes['tax-rate']} name="taxRate" type="number"/><label>%</label>

                <h2>Invoice Items</h2>

                {
                    lineItemsInputsCollection.length > 0 && 
                    <div className={classes['line-items']}>
                        {
                            lineItemsInputsCollection.map((line,i)=>{
                                return <div className={classes['return-holder']} key={i}>{lineItemInput(i)}</div>
                            })
                        }
                    </div>
                }
                
                <div className={classes["form-section"]}>
                    <h2>Client Information</h2>
                    <input className={classes.input} name='ClientName' type='text' placeholder='Client Name'/>
                    <input className={classes.input} name='ClietnStreetAddress' type='text' placeholder='Street Address'/>
                    <input className={classes.input} name='ClientCity' type='text' placeholder='City'/>
                    <input className={classes.input} name='ClientState' type='text' placeholder='State'/>
                    <input className={classes.input} name='ClientZipCode' type='number' placeholder='Zip'/>
                </div>
                {
                    props.invoiceId.length > 0 && 
                        <button 
                            className={classes['download-btn']}
                            onClick={()=>{
                                props.retrieveInvoiceHandler()
                                clearFormHandler()
                            }}
                        >
                            DOWNLOAD
                        </button>
                }
                {!props.isLoading && <button className={classes.btn} type="submit">Create Invoice!</button>}
            </form>
    )
}

export default InvoiceForm