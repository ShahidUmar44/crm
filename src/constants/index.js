export const AUTH_TOKEN = 'authToken';

// ? Screens
export const SCREENS = {
  WELCOME: 'Welcome',
  CHART: 'Chart',
  WALK_THROUGH: 'Walkthrough',
  SIGN_IN: 'SignIn',
  SIGN_UP: 'SignUp',
  FORGET_PASSWORD: 'ForgetPassword',
  SET_NEW_PASSWORD: 'SetNewPassword',

  HOME: 'Home1', // not sure what this is
  HOMENAVIGATOR: 'Home',
  HOMESCREEN: 'HomeScreen',
  CHAT: 'ChatScreen',
  CHATNAVIGATOR: 'Messages',
  CHAT_INBOX_LIST: 'ChatInboxList',
  SCHEDULE: 'Schedule', // this seems to be the main navigator
  SCHEDULESCREEN: 'ScheduleScreen',
  CUSTOMER: 'Customer',
  CUSTOMERS_LIST: 'CustomersList',
  EMPLOYEE: 'Employee',
  EMPLOYEES_LIST: 'EmployeesList',
  ADD_EDIT_EMPLOYEE: 'AddEditEmployee',
  ESTIMATE: 'Estimate',
  NEWJOB: 'NewJob',
  JOBDETAILS: 'JobDetails',
  INVOICE: 'Invoice',
  INVOICE_SCREEN: 'InvoiceScreen',
  ADD_INVOICE: 'AddInvoice',
  CUSTOMER: 'Customers', // this seems to be the main navigator
  NEW_CUSTOMER_SCREEN_FROM_JOB: 'NewCustomerScreenFromJob',
  ADD_EDIT_CUSTOMER_PERSONAL_INFO: 'AddEditCustomerPersonalInfo',
  ADD_EDIT_CUSTOMER_PERSONAL_ADDRESS: 'AddEditCustomerPersonalAddress',
  EDIT_CUSTOMER_INFO: 'EditCustomerInfo',
  ADD_EDIT_COMPANY_DETAILS: 'AddEditCompanyDetails',
  CUSTOMER_NOTE_CONTAINER: 'AddEditCompanyDetailsTwo',
  CUSTOMER_DETAILS: 'CutomerDetails',
  PAYMENT: 'Payment',
  CHECKOUT: 'Checkout',
  CHECKOUTSCREEN: 'CheckoutScreen',
  PAYMENTSCREEN: 'PaymentScreen',
  SUCCESSPAYMENT: 'SuccessPayment',
};

//local
// export const node = "http://127.0.0.1:5001/homebase-90/us-central1"

//deployed
export const node = 'https://us-central1-homebase-90.cloudfunctions.net';
