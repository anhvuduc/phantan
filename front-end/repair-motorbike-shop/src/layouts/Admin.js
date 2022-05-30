/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import CreateEmployee from "components/employees/CreateEmployee";
import Employees from "components/employees/Employee";

import CreateReceipt from "components/materials/CreateReceipt";
import Customer from "components/Customers/Customer";
import Vehicle from "components/Customers/Vehicle";
import UpdateEmployee from "components/employees/UpdateEmployee";

import TimeSheets from "components/TimeSheet/TimeSheets";
import Roles from "components/Roles/Roles";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import history from "../history";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import TimeSheetExcel from "components/TimeSheet/TimeSheetExcel";



// import CreateMaterial from "../views/Materials/CreateMaterial";
// import UpdateMaterial from "../views/Materials/UpdateMaterial";
import CreateRole from "components/Roles/CreateRole";
import Invoices from "components/Invoices/Invoices";
import CreateInvoices from "components/Invoices/CreateInvoices";
import EditInvoice from "components/Invoices/EditInvoice";
import ViewInvoice from "components/Invoices/ViewInvoice";
import ListInvoiceNoFixer from "components/Invoices/ListInvoiceNoFixer";
import EditInvoicesInProcess from "components/Invoices/EditInvoicesInProcess";
import Payment from "components/Invoices/Payment";
import PaymentInvoice from "components/Invoices/PaymentInvoice";
import DeleteInvoice from "components/Invoices/DeleteInvoices";
import Service from "components/services/Service";
import PauseService from "components/services/PauseService";
import ReturnService from "components/services/ReturnService"

import ReceiptInvocie from "components/Invoices/ReceiptInvocie";

import Materials from "../components/materials/Material";
import Login from "components/Login/Login";
import UpdateMaterial from "components/materials/UpdateMaterial"
import CreateMaterial from "components/materials/CreateMaterial";
import Receipt from "components/materials/Receipt";
import ViewReceipt from "components/materials/ViewReceipt";
import InfoEmployees from "components/employees/InforEmployees";
import CreateInvocieMaterial from "components/Invoices/CreateInvoiceMaterial";
 
let ps;

const switchRoutes = (
  <Switch history={history}>
    {/* employees */}

    <Route exact path="/login" component={Login} />
    <Route exact path="/admin/employees/add-employee" component={CreateEmployee} />
    <Route exact path="/admin/employees" component={Employees} />
    <Route exact path="/admin/employees/update-employee/:id" component={UpdateEmployee} />
    <Route exact path="/admin/employees/time-sheets" component={TimeSheets} />
    <Route exact path="/admin/employees/time-sheets/export-excel" component={TimeSheetExcel} />

    <Route exact path="/admin/employees/:id/edit-employee" component={InfoEmployees} />

    {/* customer */}
    <Route exact path="/admin/customers" component={Vehicle}/>
    <Route exact path="/admin/customers/get-all-customers" component={Customer}/>

    {/* material */}
    <Route exact path="/admin/materials" component={Materials}/>
    <Route exact path="/admin/materials/add-material" component={CreateMaterial}/>
    <Route exact path="/admin/materials/update-material/:id" component={UpdateMaterial}/>

    {/* add receipt */}
    <Route exact path="/admin/receipts" component={Receipt}/>
    <Route exact path="/admin/receipts/add-receipt" component={CreateReceipt}/>
    <Route exact path="/admin/receipts/view-receipt/:id" component={ViewReceipt}/>

    {/* roles */}
    <Route exact path="/admin/roles" component={Roles} />
    <Route exact path="/admin/roles/add-role" component={CreateRole} />
    {/* invoices */}
    <Route exact path="/admin/invoices" component={Invoices}/>
    <Route exact path="/admin/invoices/add-invoice" component={CreateInvoices}/>
    <Route exact path="/admin/invoices/add-invoice-material" component={CreateInvocieMaterial}/>
    <Route exact path="/admin/invoices/edit-invoice/:id" component={EditInvoice}/>
    <Route exact path="/admin/invoices/view-invoice/:id" component={ViewInvoice}/>
    <Route exact path="/admin/invoices/list-invoice/no-fixer" component={ListInvoiceNoFixer}/>
    <Route exact path="/admin/invoices/edit-invoice-in-process/:id" component={EditInvoicesInProcess}/>
    <Route exact path="/admin/invoices/payment" component={Payment}/>
    <Route exact path="/admin/invoices/payment/:id" component={PaymentInvoice}/>
    <Route exact path="/admin/invoices/delete-invoice" component={DeleteInvoice}/>
    <Route exact path="/admin/invoices/fixer-invoice/:id" component={ReceiptInvocie}/>
    

    {/*services */}
    <Route exact path="/admin/services" component={Service}/>
    <Route exact path="/admin/services/pause-service" component={PauseService}/>
    <Route exact path="/admin/services/return-service" component={ReturnService}/>



    {routes.map((prop, key) => {
      const jwt = window.sessionStorage.getItem('jwt')
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"FIX-STAR"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        {/*<FixedPlugin*/}
        {/*  handleImageClick={handleImageClick}*/}
        {/*  handleColorClick={handleColorClick}*/}
        {/*  bgColor={color}*/}
        {/*  bgImage={image}*/}
        {/*  handleFixedClick={handleFixedClick}*/}
        {/*  fixedClasses={fixedClasses}*/}
        {/*/>*/}
      </div>
    </div>
  );
}
