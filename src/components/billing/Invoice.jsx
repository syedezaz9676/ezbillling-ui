import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceDetails } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import { Container } from "react-bootstrap";
import "./Invoice.css";
import {getCustomerDetailsByID } from "../redux/ezCustomerRegistrationSlice";
import { hideBill } from "../redux/slices/ezEnableFiledSlice";


const Invoice = (props) => {
  const { InvoiceNo,InvoiceItems,isgetInvoiceDetailsSucess } = useSelector((state) => state.ezInvoiceDetails);
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { customerDetailsByID , isgetCustomerDetailsByIDPendng} = useSelector((state) => state.ezCustomerRegistration);
  const { isshowBill } = useSelector((state) => state.ezEnableField);
  let totalAmount= 0;
  let totalTax=0;
  let totalTaxable=0;
  let totalAmount_d= 0;
  let totalTax_d=0;
  let totalTaxable_d=0;
  let totalCess=0;
  let totalCess_d=0;
  // const InvoiceNo = savedInvoiceNo;
  const dispatch = useDispatch();
  const InvoiceNo1=isshowBill?props.viewInvoicebyno.billno:InvoiceNo;
  console.log("InvoiceNo1",InvoiceNo1)
  useEffect(() => {
    
    dispatch(getInvoiceDetails({ InvoiceNo:InvoiceNo1 }))
    .unwrap()
    .then(() => {
       
    })
    .catch(() => {
    }) 
  
       
  }, []);
  console.log("invoice number",InvoiceNo)
  console.log("isgetInvoiceDetailsSucess",isgetInvoiceDetailsSucess)
  console.log("InvoiceItems",InvoiceItems);
  // const id = InvoiceItems[0].cno;

  // console.log("id",id)
     

  useEffect(() => {

    console.log("in useeffect");

    // dispatch(getInvoiceDetails({ InvoiceNo }))
    // .unwrap()
    // .then(() => {
    // })
    // .catch(() => {
    // })

    if(isgetInvoiceDetailsSucess){

    dispatch(getCustomerDetailsByID({ id : InvoiceItems[0].cno}))
        .unwrap()
        .then(() => {
        })
        .catch(() => {
        })
      // }
    // dispatch(getProductDetails({ userID }))
    //     .unwrap()
    //     .then(() => {
    //     })
    //     .catch(() => {
    //     })
      }
  console.log("isgetInvoiceDetailsSucess",isgetInvoiceDetailsSucess)
}, [InvoiceItems]);



  const renderWithLineBreaks = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  
  // console.log("InvoiceItems",InvoiceItems);

  // const dateValue = Date.parse(InvoiceItems[0].billing_date);


  const timestamp = InvoiceItems?InvoiceItems[0].billing_date:null;

// Create a Date object from the timestamp
const jsDate = new Date(timestamp);

// Extract day, month, and year components from the Date object
const day = jsDate.getDate().toString().padStart(2, '0');
const month = (jsDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based, so we add 1
const year = jsDate.getFullYear().toString().slice(-2); // Get the last two digits of the year

// Concatenate the components in "ddmmyy" format
const ddmmyyDateString = `${day}/${month}/${year}`;


  return (
    <div>
    <div className="invoice-container">
      <div className="centered-text">
        <center><b>TAX INVOICE</b></center>
      </div>
      <div className="tables-container">
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr>
                <td><b>{UserDetails.user.firmName}</b></td>
              </tr>
              <tr>
                <td><b>GSTIN/UIN :</b> {UserDetails.user.gstNo}</td>
              </tr>
              <tr>
                <td><b>Contact No :</b> {UserDetails.user.contact}</td>
              </tr>
              <tr>
                <td><b>Address :</b> {renderWithLineBreaks(UserDetails.user.address)}</td>
              </tr>
              <tr>
                <td><b>State :</b> {UserDetails.user.state}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-wrapper">
           <table>
            <tbody>
            <tr>
                <td><b>Customer Name :</b>{customerDetailsByID && customerDetailsByID.cname}</td>
              </tr>
              <tr>
                <td><b>GSTIN/UIN :</b> {customerDetailsByID && customerDetailsByID.ctno}</td>
              </tr>
              <tr>
                <td><b>Contact No :</b> {customerDetailsByID && customerDetailsByID.cpno}</td>
              </tr>
              <tr>
                <td><b>Address :</b> {customerDetailsByID && customerDetailsByID.cadd}</td>
              </tr>
              <tr>
                <td><b>State :</b> {customerDetailsByID && customerDetailsByID.supplyplace}</td>
              </tr>
            </tbody>
          </table> 
        </div>
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr>
                <td><b>Invoice No: </b>{InvoiceNo1}</td>
              </tr>
              <tr>
                <td><b>Date :</b>{ddmmyyDateString}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Repeat this block for other tables */}
      </div>
      <div className="tables-container-items">
      <div className="table-wrapper-items">
      <table>
          <tr>
            <th>Sno</th>
          </tr>
       {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{i+1}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
      
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>Product Description</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.product_name}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
        <div className="table-wrapper-items">
      <table>
          <tr>
            <th>Qty</th>
          </tr>
       {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.qty}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>HSN/SAC</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.hsn_code}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>MRP</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.mrp}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>RATE</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.rate}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
        {/* <div className="table-wrapper-items">
        <table>
          <tr>
            <th>Disc(%)</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.disc}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div> */}
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>Cess</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.cess}</td>
         </tr>
        ]
       }

       )}
        <tr>
        <td style={{height:26}}></td>
       </tr>
       <tr>
        <td style={{height:27}}></td>
       </tr>
       <tr>
          <td  style={{ borderTop: "1px solid black" }}><b>Totals</b></td>
         </tr>
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>Cess AMT</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
            totalCess =totalCess+InvoiceItem.cessAmount
        return[
         <tr>
          <td>{InvoiceItem.cessAmount.toFixed(2)}</td>
         </tr>
        ]
       }

       )}
        <tr>
        <td style={{height:26}}></td>
       </tr>
       <tr>
        <td style={{height:27}}></td>
       </tr>
       <tr>
          <td  style={{ borderTop: "1px solid black" }}><b>{totalCess.toFixed(2)}</b></td>
         </tr>
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>GST RATE</th>
          </tr>
          {InvoiceItems &&  InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.product_gst}</td>
         </tr>
        ]
       }

       )}
       <tr>
        <td style={{ borderTop: "1px solid black" }}><b>CGST</b></td>
       </tr>
       <tr>
        <td><b>SGST</b></td>
       </tr>
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>GST AMOUNT</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
            totalTax =totalTax+InvoiceItem.gstamount
        return[
         <tr>
          <td>{InvoiceItem.gstamount.toFixed(2)}</td>
         </tr>
        ]
       }

       )}
       <tr>
          <td style={{ borderTop: "1px solid black" }}><b>{(totalTax/2).toFixed(2)}</b></td>
         </tr>
       <tr>
          <td><b>{(totalTax/2).toFixed(2)}</b></td>
         </tr>
        <tr>
          <td style={{ borderTop: "1px solid black" }}><b>{totalTax.toFixed(2)}</b></td>
         </tr>
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>GROSS</th>
          </tr>
          { InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
            totalTaxable =totalTaxable+InvoiceItem.gross_amount
        return[
         <tr>
          <td >{InvoiceItem.gross_amount.toFixed(2)}</td>
         </tr>
        ]
       }

       )}
         <tr>
        <td style={{height:26}}></td>
       </tr>
       <tr>
        <td style={{height:27}}></td>
       </tr>
       <tr>
          <td  style={{ borderTop: "1px solid black" }}><b>{totalTaxable.toFixed(2)}</b></td>
         </tr>
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>AMT</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
          totalAmount= totalAmount+InvoiceItem.amount
        return[
         <tr>
          <td >{InvoiceItem.amount.toFixed(2)}</td>
         </tr>
        ]
       }

       )}
       <tr>
        <td style={{height:26}}></td>
       </tr>
       <tr>
        <td style={{height:27}}></td>
       </tr>
        <tr>
          <td style={{ borderTop: "1px solid black" }}><b>₹ {totalAmount.toFixed(2)}</b></td>
         </tr>
        </table>
        </div>
        </div>
      
    </div>
    <br></br>
    <br></br>
    <br></br>
    <div className="invoice-container">
      <div className="centered-text">
        <center><b>TAX INVOICE</b></center>
      </div>
      <div className="tables-container">
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr>
                <td><b>{UserDetails.user.firmName}</b></td>
              </tr>
              <tr>
                <td><b>GSTIN/UIN :</b> {UserDetails.user.gstNo}</td>
              </tr>
              <tr>
                <td><b>Contact No :</b> {UserDetails.user.contact}</td>
              </tr>
              {/* <tr>
                <td><b>Address :</b> {renderWithLineBreaks(UserDetails.user.address)}</td>
              </tr> */}
              <tr>
                <td><b>Address :</b> {UserDetails.user.address}</td>
              </tr>
              <tr>
                <td><b>State :</b> {UserDetails.user.state}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-wrapper">
           <table>
            <tbody>
            <tr>
                <td><b>Customer Name :</b>{customerDetailsByID && customerDetailsByID.cname}</td>
              </tr>
              <tr>
                <td><b>GSTIN/UIN :</b> {customerDetailsByID && customerDetailsByID.ctno}</td>
              </tr>
              <tr>
                <td><b>Contact No :</b> {customerDetailsByID && customerDetailsByID.cpno}</td>
              </tr>
              <tr>
                <td><b>Address :</b> {customerDetailsByID && customerDetailsByID.cadd}</td>
              </tr>
              <tr>
                <td><b>State :</b> {customerDetailsByID && customerDetailsByID.supplyplace}</td>
              </tr>
            </tbody>
          </table> 
        </div>
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr>
                <td><b>Invoice No: </b>{InvoiceNo1}</td>
              </tr>
              <tr>
                <td><b>Date :</b>{ddmmyyDateString}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Repeat this block for other tables */}
      </div>
      <div className="tables-container-items">
      <div className="table-wrapper-items">
      <table>
          <tr>
            <th>Sno</th>
          </tr>
       {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{i+1}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
      
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>Product Description</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.product_name}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
        <div className="table-wrapper-items">
      <table>
          <tr>
            <th>Qty</th>
          </tr>
       {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.qty}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>HSN/SAC</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.hsn_code}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>MRP</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.mrp}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>RATE</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.rate}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div>
        {/* <div className="table-wrapper-items">
        <table>
          <tr>
            <th>Disc(%)</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.disc}</td>
         </tr>
        ]
       }

       )}
        </table>
        </div> */}
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>Cess</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
            
        return[
         <tr>
          <td>{InvoiceItem.cess}</td>
         </tr>
        ]
       }

       )}
       <tr>
        <td style={{height:26}}></td>
       </tr>
       <tr>
        <td style={{height:27}}></td>
       </tr>
       <tr>
          <td  style={{ borderTop: "1px solid black" }}><b>Totals</b></td>
         </tr>
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>Cess AMT</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
            totalCess_d =totalCess_d+InvoiceItem.cessAmount
        return[
         <tr>
          <td>{InvoiceItem.cessAmount.toFixed(2)}</td>
         </tr>
        ]
       }

       )}
       <tr>
        <td style={{height:26}}></td>
       </tr>
       <tr>
        <td style={{height:27}}></td>
       </tr>
       <tr>
          <td  style={{ borderTop: "1px solid black" }}><b>{totalCess_d.toFixed(2)}</b></td>
         </tr>
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>GST RATE</th>
          </tr>
          {InvoiceItems &&  InvoiceItems.map((InvoiceItem,i)=>{
        return[
         <tr>
          <td>{InvoiceItem.product_gst}</td>
         </tr>
        ]
       }

       )}
       <tr>
        <td style={{ borderTop: "1px solid black" }}><b>CGST</b></td>
       </tr>
       <tr>
        <td><b>SGST</b></td>
       </tr>
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>GST AMOUNT</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
            totalTax_d =totalTax_d+InvoiceItem.gstamount
        return[
         <tr>
          <td>{InvoiceItem.gstamount.toFixed(2)}</td>
         </tr>
        ]
       }

       )}
       <tr>
          <td style={{ borderTop: "1px solid black" }}><b>{(totalTax/2).toFixed(2)}</b></td>
         </tr>
       <tr>
          <td><b>{(totalTax/2).toFixed(2)}</b></td>
         </tr>
        <tr>
          <td style={{ borderTop: "1px solid black" }}><b>{totalTax.toFixed(2)}</b></td>
         </tr>
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>GROSS</th>
          </tr>
          { InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
            totalTaxable_d =totalTaxable_d+InvoiceItem.gross_amount
        return[
         <tr>
          <td >{InvoiceItem.gross_amount.toFixed(2)}</td>
         </tr>
        ]
       }

       )}
         <tr>
        <td style={{height:26}}></td>
       </tr>
       <tr>
        <td style={{height:27}}></td>
       </tr>
       <tr>
          <td  style={{ borderTop: "1px solid black" }}><b>{totalTaxable.toFixed(2)}</b></td>
         </tr>
        </table>
        </div>
        <div className="table-wrapper-items">
        <table>
          <tr>
            <th>AMT</th>
          </tr>
          {InvoiceItems && InvoiceItems.map((InvoiceItem,i)=>{
          totalAmount_d= totalAmount_d+InvoiceItem.amount
        return[
         <tr>
          <td >{InvoiceItem.amount.toFixed(2)}</td>
         </tr>
        ]
       }

       )}
       <tr>
        <td style={{height:26}}></td>
       </tr>
       <tr>
        <td style={{height:27}}></td>
       </tr>
        <tr>
          <td style={{ borderTop: "1px solid black" }}><b>₹ {totalAmount.toFixed(2)}</b></td>
         </tr>
        </table>
        </div>
        </div>
      
    </div>
    </div>
      
  );
};

export default Invoice;