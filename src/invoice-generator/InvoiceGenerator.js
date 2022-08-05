import { useState } from 'react'
import InvoiceForm from './Form/InvoiceForm'
import SubHeader from '../components/SubHeader'
import classes from './InvoiceGenerator.module.css'

const InvoiceGenerator =(props) =>{

    const [isLoading, setIsLoading] = useState(false)
    const [invoiceId, setInvoiceId] = useState('')
    const [lineItems, setLineItems] = useState(0)


    const setLineItemsTotalHanlder = (e) =>{
        e.preventDefault()
        setLineItems(0)
        const totalItems = parseInt(e.target.totalItems.value)

        console.log(totalItems)

        if(totalItems < 1 || !totalItems) return

        setLineItems(totalItems)
    } 

    const requestInvoiceHandler = async (payload) =>{
                
        try {
            setIsLoading(true)

            //vercel does not save to file system, API route no longer active
            //const invoiceRequest = await fetch('https://ezinvoice.vercel.app/api/create-invoice',{
            //const invoiceRequest = await fetch('http://localhost:8000/create-invoice',{
            //const invoiceRequest = await fetch('http://localhost:5000/api/create-invoice',{
            //const invoiceRequest = await fetch('http://174.138.126.27:8000/create-invoice',{
            const invoiceRequest = await fetch('https://rws-api.cloud/create-invoice',{
                method:'POST',
                //mode: 'cors',
                headers:{
                    //'Access-Control-Allow-Origin': '*',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(payload)
            })

            

            const invoiceResponse = await invoiceRequest.json()

            if(!invoiceRequest.ok)
            {
                throw new Error(invoiceResponse.error)
            }

            
            if(invoiceResponse === null)
            {
                throw new Error('request for invoice failed, resonse null')
            }
       
            setInvoiceId(invoiceResponse.invoiceId)

            setIsLoading(false)
            
        } catch (error) {
            console.log(error.stack)
            setIsLoading(false)
        }
    }

    const retrieveInvoiceHandler = async () =>{
        try {
            setIsLoading(true)
            
            const opnePdf = window.open(`https://rws-api.cloud/download-invoice/${invoiceId}`,'_bank')
            //const opnePdf = window.open(`http://localhost:8000/download-invoice/${invoiceId}`,'_bank')
            opnePdf.focus()
            setIsLoading(false)
            setInvoiceId('')

        } catch (error) {
            console.log(error.stack)
        }
        
    }

    return (
        <main className={`${classes['main']} ${ lineItems > 0 && classes['height-adjust']}`}>
            {lineItems === 0 && <SubHeader />}
            <div className={classes.wrapper}>
                
                <h2 className={classes.title}>
                    How many line items do you need to charge for?
                </h2>
                <form className={classes.form} onSubmit={setLineItemsTotalHanlder}>
                    <input className={classes.input} name="totalItems" type="number" placeholder="total items"/>
                    <button className={classes.btn} type="submit">Next</button>
                </form>
                {
                    lineItems > 0 && <InvoiceForm 
                                        lineItems={lineItems}
                                        requestHandler={requestInvoiceHandler}
                                        retrieveInvoiceHandler={retrieveInvoiceHandler}
                                        isLoading={isLoading}   
                                        invoiceId={invoiceId}
                                    />
                }
            </div>
        </main>           
    )
}


export default InvoiceGenerator