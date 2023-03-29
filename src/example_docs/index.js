// this is the job doc, we create this in add job and then modify at multiple points on the job details screen and when we create invoices or payments
export const jobDetails = {
  businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  customer: {
    address: ['4625 35th Street, San Diego, CA 92116'],
    businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
    customerId: '71Nwq7pLEYHJuLyeKO5G',
    dateAdded: '2023-03-11T16:31:20-08:00',
    displayName: 'Derick DeCesare',
    email: ['deerriicckk@gmail.com'],
    firstName: 'Derick',
    lastJob: '2023-03-22T12:02:23-07:00',
    lastName: 'DeCesare',
    lastUpdated: '2023-03-11T16:31:20-08:00',
    notes: 'This is the reincarnated derick',
    notifications: true,
    phone: {
      additional: '',
      home: '',
      mobile: '+13038286690',
      work: '',
    },
  },
  dateAdded: '2023-03-22T12:06:56-07:00',
  datePaid: '2023-03-22T12:06:56-07:00',
  dispatchedTo: [
    {
      businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
      createdAt: '2023-03-10T08:49:04-08:00',
      email: 'derick.decesare@gmail.com',
      firstName: 'Derick',
      id: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
      isAdmin: true,
      lastName: 'DeCesare',
      phone: '+13038286690',
      stripeAccountId: 'acct_1MkddhBSAB04s2b4',
      userType: 'Admin',
    },
  ],

  endedJobTime: 'March 24, 2023 at 9:58:56 AM UTC-7',
  invoicePaidTime: 'March 23, 2023 at 6:53:06 PM UTC-7',
  invoiceSentTime: 'March 24, 2023 at 7:57:41 AM UTC-7',
  end: '2023-03-23T21:00:00-07:00',
  // startDrivingTime: 'March 24, 2023 at 9:58:53 AM UTC-7',
  // endDrivingTime: 'March 24, 2023 at 9:58:54 AM UTC-7',
  startedJobTime: 'March 24, 2023 at 9:58:55 AM UTC-7',
  reviewMessageSent: 'March 24, 2023 at 9:58:57 AM UTC-7',
  tip: 19.9,
  status: 'paid',
  jobId: 'YkhJMQ1Ixo84soVrbleQ',
  jobTotal: 199,
  lastUpdated: '2023-03-22T12:06:56-07:00',
  leadSource: {
    online: true,
  },
  lineItems: [
    {
      description: '',
      name: 'Window CLeaning',
      quantity: 1,
      unitPrice: '199',
    },
  ],
  paymentHistory: [
    {
      0: {
        billingType: 'digital invoice',
        captureMethod: 'automatic',
        date: 'March 23, 2023 at 6:53:07 PM UTC-7',
        jobId: 'YkhJMQ1Ixo84soVrbleQ',
        paymentIntentId: 'pi_3MozoSB9H84ceFmE0SbvlzGI',
        paymentMethod: 0,
        status: 'succeeded',
        totalAmountFromStripe: 21890,
      },
    },
    {
      1: {
        billingType: 'manual card',
        captureMethod: 'automatic',
        date: 'March 24, 2023 at 9:59:11 AM UTC-7',
        jobId: 'YkhJMQ1Ixo84soVrbleQ',
        paymentIntentId: 'pi_3MpDxJB9H84ceFmE0V6xtHJP',
        paymentMethod: 0,
        status: 'succeeded',
        totalAmountFromStripe: 19900,
      },
    },
    {
      2: {
        billingType: 'cash',
        date: 'March 24, 2023 at 9:59:23 AM UTC-7',
        jobId: 'YkhJMQ1Ixo84soVrbleQ',
        otherOption: '',
        paymentNote: 'This is the cash payment note',
        status: 'paid',
        totalAmountFromStripe: 19900,
      },
    },
    {
      3: {
        amount: 199,
        billingType: 'Refund',
        date: 'March 24, 2023 at 9:59:32 AM UTC-7',
        paymentIntentId: 'pi_3MpDxJB9H84ceFmE0V6xtHJP',
        refundId: 're_3MpDxJB9H84ceFmE00sYcK8z',
        status: 'succeeded',
        totalAmountFromStripe: 19900,
      },
    },
  ],
  note: 'Notes!',
  start: '2023-03-23T19:00:00-07:00',
  timezone: 'America/Los_Angeles',
};

// invoice doc, these are only created when we create/send an invoice, not when we make a manual card, cash, check or other payment
const invoiceDoc = {
  amount: 359,
  billingType: 'digital invoice',
  businessAddress: '4625 36th Street, San Diego, CA 92116',
  businessEmail: 'derick.decesare@gmail.com',
  businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  businessName: 'Shineworks Example',
  businessPhone: '+13038286690',
  customerEmail: 'deerriicckk@gmail.com',
  customerId: '71Nwq7pLEYHJuLyeKO5G',
  customerName: 'Derick DeCesare',
  customerPhone: '+13038286690',
  dueDate: 'March 15, 2023 at 10:07:53 PM UTC-7',
  invoiceId: 'so8vxSOoSY0XCjY29bjL',
  invoicePaid: false,
  invoiceSentTime: 'March 15, 2023 at 10:07:53 PM UTC-7',
  jobId: 'wBxqrXyZSKpRkka28zKK',
  lineItems: [
    {
      description: 'Clean all the 2nd story windows',
      name: 'Window Cleaning',
      quantity: 1,
      unitPrice: '159',
    },
    {
      description: 'Only the sidewalk',
      name: 'Pressure Washing',
      quantity: 1,
      unitPrice: '200',
    },
  ],
  numberOfTimesSent: 1,
  serviceDate: 'March 17, 2023 at 9:00:00 AM UTC-7',
  status: 'sent',
  stripeAccountId: 'acct_1MkeJRB9H84ceFmE',
};

// doc for the business, this is created when we create a new business
const businessDoc = {
  address: '4625 36th Street, San Diego, CA 92116',
  companyName: 'Shineworks Example',
  companyPhone: '+13038286690',
  companySize: '2-5',
  companyWebsite: 'shineworks.co',
  createdAt: 'March 10, 2023 at 8:49:03 AM UTC-8',
  email: 'derick.decesare@gmail.com',
  firstName: 'Derick',
  id: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  industry: 'Window Cleaning',
  lastName: 'DeCesare',
  phone: '+13038286690',
  stripeAccountId: 'acct_1MkeJRB9H84ceFmE',
  stripeSubscription: {
    active: true,
    paymentMethodBrand: 'visa',
    paymentMethodLast4: '4242',
    plan: 'Growing Yearly',
    startDate: 1679269045,
    status: 'trialing',
    trialEnd: 1680478645,
  },
  stripe_charges_enabled: true,
  stripe_details_submitted: true,
  stripe_email: 'derick.decesare+2@gmail.com',
  stripe_payouts_enabled: true,
  timezone: 'America/Los_Angeles',
  twilioNumber: '+16198158003',
};

// doc for estimate, it is the same as the job doc but lacking some fields
const estimateDoc = {
  businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  customer: {
    address: '4625 35th Street, San Diego, CA 92116',
    businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
    customerId: '71Nwq7pLEYHJuLyeKO5G',
    dateAdded: 'March 11, 2023 at 4:31:20 PM UTC-8',
    displayName: 'Derick DeCesare',
    email: 'deerriicckk@gmail.com',
    firstName: 'Derick',
    lastJob: 'March 20, 2023 at 12:30:04 PM UTC-7',
    lastName: 'DeCesare',
    lastUpdated: 'March 11, 2023 at 4:31:20 PM UTC-8',
    notes: 'This is the reincarnated derick',
    notifications: true,
    phone: {
      additional: '',
      home: '',
      mobile: '+13038286690',
      work: '',
    },
  },
  dateAdded: 'March 20, 2023 at 7:42:20 PM UTC-7',
  estimateId: 'iSfx2elGRju9OaFGj9f5',
  estimateTotal: 299,
  lastUpdated: 'March 20, 2023 at 7:42:20 PM UTC-7',
  leadSource: 'online',
  lineItems: [
    {
      description: '',
      name: 'windoiw odnioe',
      quantity: 1,
      unitPrice: '299',
      note: '',
    },
  ],
};

// for storing the conversation details with a customer
const conversationDoc = {
  bizId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  displayName: 'Derick DeCesare',
  id: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2+13038286690',
  lastMessage: 'Here is our invoice. We appreciate your business.',
  lastMessageTime: 'March 24, 2023 at 7:57:41 AM UTC-7',
  phone: '+13038286690',
  read: true,
};

// details of each message
const messageDoc = {
  _id: 'EtgzbChCM5FXxtdEM6di',
  createdAt: 'March 24, 2023 at 7:57:41 AM UTC-7',
  from: '+16198158003',
  imageUrl: null,
  text: 'Here is our invoice. We appreciate your business.',
  to: '+13038286690',
  user: {
    _id: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
    initials: 'SE',
    name: 'Shineworks Example',
  },
};

// could be total monthly, daily ect. they all look like this
const statsDoc = {
  'Derick DeCesare': 798, // salesperson
  'Eight Times': 598, //salesperson
  totalJobs: 14,
  totalRevenue: 4457,
};

// doc for the customer, this is created when we create a new customer
const customerDoc = {
  address: '4625 35th Street, San Diego, CA 92116',
  businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  customerId: '71Nwq7pLEYHJuLyeKO5G',
  dateAdded: 'March 11, 2023 at 4:31:20 PM UTC-8',
  displayName: 'Derick DeCesare',
  email: 'deerriicckk@gmail.com',
  additionalEmail: '',
  firstName: 'Derick',
  lastJob: 'March 22, 2023 at 12:06:56 PM UTC-7',
  lastName: 'DeCesare',
  lastUpdated: 'March 11, 2023 at 4:31:20 PM UTC-8',
  notes: 'This is the reincarnated derick',
  notifications: true,
  phone: {
    additional: '',
    home: '',
    mobile: '+13038286690',
    work: '',
  },
};

// doc for each user that is created that is attached to a business via businessId reference
const userDoc = {
  businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  createdAt: 'March 10, 2023 at 8:49:04 AM UTC-8',
  email: 'derick.decesare@gmail.com',
  firstName: 'Derick',
  id: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  isAdmin: true,
  lastName: 'DeCesare',
  phone: '+13038286690',
  stripeAccountId: 'acct_1MkddhBSAB04s2b4',
  userType: 'Admin',
};
