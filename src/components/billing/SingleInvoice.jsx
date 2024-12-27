import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceDetails } from "../redux/slices/billingDetails/ezBillingDetailsSlice";
import { Container } from "react-bootstrap";
import "./Invoice.css";
import { getCustomerDetailsByID } from "../redux/ezCustomerRegistrationSlice";
import { hideBill } from "../redux/slices/ezEnableFiledSlice";

const SingleInvoice = (props) => {
  const { InvoiceNo, InvoiceItems, isgetInvoiceDetailsSucess } = useSelector(
    (state) => state.ezInvoiceDetails
  );
  const { UserDetails } = useSelector((state) => state.ezLogin);
  const { customerDetailsByID, isgetCustomerDetailsByIDPendng } = useSelector(
    (state) => state.ezCustomerRegistration
  );
  const { isshowBill } = useSelector((state) => state.ezEnableField);
  let totalAmount = 0;
  let totalTax = 0;
  let totalTaxable = 0;
  let totalgst = 0;
  let totalgst_d = 0;
  let totalAmount_d = 0;
  let totalTax_d = 0;
  let totalTaxable_d = 0;
  let totalCess = 0;
  let totalCess_d = 0;
  
  const dispatch = useDispatch();
  const InvoiceNo1 = isshowBill ? props.viewInvoicebyno.billno : InvoiceNo;
  useEffect(() => {
    dispatch(getInvoiceDetails({ InvoiceNo: InvoiceNo1 }))
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isgetInvoiceDetailsSucess) {
      dispatch(
        getCustomerDetailsByID({ id: InvoiceItems.billingDetails[0].cno })
      )
        .unwrap()
        .then(() => {})
        .catch(() => {});
    }
  }, [InvoiceItems]);
  const spacelength =[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
  const createSpace=()=>{
      if(spacelength.length<(InvoiceItems.billingDetails.length)){
        return 0;
      }
      return spacelength.length-(InvoiceItems.billingDetails.length);
    
  }

  
  spacelength.length = InvoiceItems ? createSpace():0;
  const space= InvoiceItems?spacelength:[];
  const renderWithLineBreaks = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>c
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const timestamp =
    isgetInvoiceDetailsSucess &&
    InvoiceItems &&
    InvoiceItems.billingDetails &&
    InvoiceItems.billingDetails.length > 0
      ? InvoiceItems.billingDetails[0].billing_date
      : "";
  // Create a Date object from the timestamp
  const jsDate = new Date(timestamp);

  // Extract day, month, and year components from the Date object
  const day = jsDate.getDate().toString().padStart(2, "0");
  const month = (jsDate.getMonth() + 1).toString().padStart(2, "0"); // Note: Month is zero-based, so we add 1
  const year = jsDate.getFullYear().toString().slice(-2); // Get the last two digits of the year

  // Concatenate the components in "ddmmyy" format
  const ddmmyyDateString = `${day}/${month}/${year}`;

  return (
    <div>
      <div className="invoice-container">
      
        <div className="centered-text">
          <center>
            <b>TAX INVOICE</b>
          </center>
        </div>
        <div className="tables-container">
          <div className="table-wrapper">
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>{UserDetails.user.firmName}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>GSTIN/UIN :</b> {UserDetails.user.gstNo}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Contact No :</b> {UserDetails.user.contact}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Address :</b>{" "}
                    {UserDetails.user.address}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>State :</b> {UserDetails.user.state}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-wrapper">
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>Customer Name :</b>{" "}
                    {customerDetailsByID && customerDetailsByID.cname}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>GSTIN/UIN :</b>{" "}
                    {customerDetailsByID && customerDetailsByID.ctno}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Contact No :</b>{" "}
                    {customerDetailsByID && customerDetailsByID.cpno}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Address :</b>{" "}
                    {customerDetailsByID && customerDetailsByID.cadd}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>State :</b>{" "}
                    {customerDetailsByID && customerDetailsByID.supplyplace}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-wrapper">
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>Invoice No: </b>
                    {InvoiceNo1}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Date : </b>
                    {ddmmyyDateString}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Vehical No: </b>
                    {UserDetails.user.vehicalNo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="tables-container-items">
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>Sno</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  return [
                    <tr>
                      <td>{i + 1}</td>
                    </tr>,
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
            </table>
          </div>

          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>Product Description</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  return [
                    <tr>
                      <td>{InvoiceItem.product_name}</td>
                    </tr>,
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>Qty</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  return [
                    <tr>
                      <td>{InvoiceItem.qty+" "+InvoiceItem.unites_per}</td>
                    </tr>,
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>HSN/SAC</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  return [
                    <tr>
                      <td>{InvoiceItem.hsn_code}</td>
                    </tr>,
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>MRP</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  return [
                    <tr>
                      <td>{InvoiceItem.mrp}</td>
                    </tr>
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>RATE</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  return [
                    <tr>
                      <td>{InvoiceItem.rate.toFixed(2)}</td>
                    </tr>,
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>Cess</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  return [
                    <tr>
                      <td>{InvoiceItem.cess}</td>
                    </tr>
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
              <tr>
                <td style={{ height: 26 }}></td>
              </tr>
              <tr>
                <td style={{ height: 27 }}></td>
              </tr>
              <tr>
                <td style={{ height: 20 }}></td>
              </tr>
              <tr>
                <td style={{ borderTop: "1px solid black" }}>
                  <b>Totals</b>
                </td>
              </tr>
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>Cess AMT</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  totalCess = totalCess + InvoiceItem.cessAmount;
                  return [
                    <tr>
                      <td>{InvoiceItem.cessAmount.toFixed(2)}</td>
                    </tr>,
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
              <tr>
                <td style={{ height: 26 }}></td>
              </tr>
              <tr>
                <td style={{ height: 27 }}></td>
              </tr>
              <tr>
                <td style={{ height: 20 }}></td>
              </tr>
              <tr>
                <td style={{ borderTop: "1px solid black" }}>
                  <b>{totalCess.toFixed(2)}</b>
                </td>
              </tr>
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>GST RATE</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  return [
                    <tr>
                      <td>{InvoiceItem.product_gst}</td>
                    </tr>,
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
                {customerDetailsByID.isigst !="yes" &&
              <tr>
                <td style={{ borderTop: "1px solid black" }}>
                  <b>CGST</b>
                </td>
              </tr>}
              { customerDetailsByID.isigst !="yes" &&
              <tr>
                <td>
                  <b>SGST</b>
                </td>
              </tr>}
              {customerDetailsByID.isigst === "yes" &&
              <>
              <tr><td></td></tr>
              <tr>
                <td style={{ borderTop: "1px solid black" }}>
                  <b>IGST</b>
                </td>
              </tr></>}
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>GST AMOUNT</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  totalTax = totalTax + InvoiceItem.gstamount;
                  return [
                    <tr>
                      <td>{InvoiceItem.gstamount.toFixed(2)}</td>
                    </tr>,
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
                {customerDetailsByID.isigst !="yes" &&
              <tr>
                <td style={{ borderTop: "1px solid black" }}>
                  <b>{(totalTax / 2).toFixed(2)}</b>
                </td>
              </tr>}
              {customerDetailsByID.isigst !="yes" &&
              <tr>
                <td>
                  <b>{(totalTax / 2).toFixed(2)}</b>
                </td>
              </tr>}
              {customerDetailsByID.isigst === "yes" &&
              <div>
              <tr><td></td></tr>
              <tr>
                <td style={{ borderTop: "1px solid black" }}>
                  <b>{(totalTax).toFixed(2)}</b>
                </td>
              </tr></div>}
              <tr>
                <td style={{ borderTop: "1px solid black",height:"10px" }}>
                  <b>{totalTax.toFixed(2)}</b>
                </td>
              </tr>
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>GROSS</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  totalTaxable = totalTaxable + InvoiceItem.gross_amount;
                  return [
                    <tr>
                      <td>{InvoiceItem.gross_amount.toFixed(2)}</td>
                    </tr>,
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
              <tr>
                <td style={{ height: 26 }}></td>
              </tr>
              <tr>
                <td style={{ height: 27 }}></td>
              </tr>
              <tr>
                <td style={{ height: 20 }}></td>
              </tr>
              <tr>
                <td style={{ borderTop: "1px solid black" }}>
                  <b>{totalTaxable.toFixed(2)}</b>
                </td>
              </tr>
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>AMT</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.billingDetails.map((InvoiceItem, i) => {
                  totalAmount = totalAmount + InvoiceItem.amount;
                  return [
                    <tr>
                      <td>{InvoiceItem.amount.toFixed(2)}</td>
                    </tr>,
                  ];
                })}
                {space.map((sp)=>{
                  return[
                  <tr>
                  <td><br></br></td>
                </tr>
                  ]
                })}
              <tr>
                <td style={{ height: 26 }}></td>
              </tr>
              <tr>
                <td style={{ height: 27 }}></td>
              </tr>
              <tr>
                <td style={{ height: 20 }}></td>
              </tr>
              <tr>
                <td style={{ borderTop: "1px solid black" }}>
                  <b>₹ {totalAmount.toFixed(2)}</b>
                </td>
              </tr>
            </table>
          </div>
        </div>
        {customerDetailsByID && customerDetailsByID.ctno !="not avaliable" &&
        <div className="tables-container-items">
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>HSN CODE</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.wayBillDetails.map((wayBillDetailsItems, i) => {
                  return [
                    <tr>
                      <td>{wayBillDetailsItems.hsn_code}</td>
                    </tr>,
                  ];
                })}
            </table>
          </div>
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>Taxable Amount</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.wayBillDetails.map((wayBillDetailsItems, i) => {
                  return [
                    <tr>
                      <td>
                        {(
                          wayBillDetailsItems.amountSum -
                          wayBillDetailsItems.gstAmountSum- wayBillDetailsItems.cessAmountSum
                        ).toFixed(2)}
                      </td>
                    </tr>,
                  ];
                })}
            </table>
          </div>
          {customerDetailsByID.isigst !="yes" &&
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>CGST(%)</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.wayBillDetails.map((wayBillDetailsItems, i) => {
                  return [
                    <tr>
                      <td>{wayBillDetailsItems.product_gst / 2}</td>
                    </tr>,
                  ];
                })}
            </table>
          </div>}
          {customerDetailsByID.isigst !="yes" &&
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>CGST</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.wayBillDetails.map((wayBillDetailsItems, i) => {
                  return [
                    <tr>
                      <td>
                        {(wayBillDetailsItems.gstAmountSum / 2).toFixed(2)}
                      </td>
                    </tr>,
                  ];
                })}
            </table>
          </div>}
          {customerDetailsByID.isigst !="yes" &&
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>SGST(%)</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.wayBillDetails.map((wayBillDetailsItems, i) => {
                  return [
                    <tr>
                      <td>{wayBillDetailsItems.product_gst / 2}</td>
                    </tr>,
                  ];
                })}
            </table>
          </div>}
          {customerDetailsByID.isigst !="yes" &&
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>SGST</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.wayBillDetails.map((wayBillDetailsItems, i) => {
                  return [
                    <tr>
                      <td>
                        {(wayBillDetailsItems.gstAmountSum / 2).toFixed(2)}
                      </td>
                    </tr>,
                  ];
                })}
            </table>
          </div>}
          {customerDetailsByID.isigst==="yes" &&
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>IGST(%)</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.wayBillDetails.map((wayBillDetailsItems, i) => {
                  return [
                    <tr>
                      <td>{wayBillDetailsItems.product_gst}</td>
                    </tr>,
                  ];
                })}
            </table>
          </div>}
          {customerDetailsByID.isigst==="yes" &&
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>IGST</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.wayBillDetails.map((wayBillDetailsItems, i) => {
                  return [
                    <tr>
                      <td>
                        {(wayBillDetailsItems.gstAmountSum).toFixed(2)}
                      </td>
                    </tr>,
                  ];
                })}
            </table>
          </div>}
          <div className="table-wrapper-items">
            <table>
              <tr>
                <th>Tax Amount</th>
              </tr>
              {InvoiceItems &&
                InvoiceItems.wayBillDetails.map((wayBillDetailsItems, i) => {
                  totalgst = totalgst + wayBillDetailsItems.gstAmountSum;
                  return [
                    <tr>
                      <td>{wayBillDetailsItems.gstAmountSum.toFixed(2)}</td>
                    </tr>,
                  ];
                })}
              <tr>
                <td style={{ borderTop: "1px solid black" }}>
                  <b>{totalgst.toFixed(2)}</b>
                </td>
              </tr>
            </table>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default SingleInvoice;
