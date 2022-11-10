export const iconSets = {
  fontAwesome5: 'fa5',
  materialIcons: 'material',
  feather: 'feather'
};

export const colors = {
  lightTheme: {
    background: '#fff',
    text: '#000',
    themeIcon: 'moon',
    input: {
      placeholder: '#888',
      background: '#eee'
    },
    divider: '#bbb',
  },
  darkTheme: {
    background: '#000',
    surface: '#111',
    text: '#fff',
    themeIcon: 'sun',
    input: {
      placeholder: '#aaa',
      background: '#222'
    },
    divider: '#666',
  },
  global: {
    primary: {
      default: '#1477B5',
    },
    secondary: {
      default: '#B57114'
    }
  }
};

export const fonts = {
  fontFamily: 'Roboto',
  navbar: {
    size: 22
  },
  button: {
    size: 18,
    color: colors.darkTheme.text
  },
  form: {
    title: {
      size: 20,
      weight: 'bold'
    }
  },
  input: {
    label: {
      size: 18
    }
  },
  tabMenuItems: {
    size: 16
  }
}

export const forms = {
  login: [
    {
      label: 'username',
      placeholder: 'Username',
      checkValue: (value) => value.length >= 6 && value.length <= 50,
      checkTime: 500
    },
    {
      label: 'password',
      placeholder: 'Password',
      checkValue: (value) => value.length >= 8 && value.length <= 50,
      checkTime: 500
    },
  ],
  register: {
    customer: [
      {
        label: 'username',
        placeholder: 'New username for your account',
        checkValue: (value) => value.length >= 6 && value.length <= 50,
        checkTime: 500
      },
      {
        label: 'password',
        placeholder: 'New password for your account',
        checkValue: (value) => value.length >= 8 && value.length <= 50,
        checkTime: 500
      },
      {
        label: 'first_name',
        placeholder: 'Type your first name',
        checkValue: (value) => value.length >= 6 && value.length <= 50,
        checkTime: 500
      },
      {
        label: 'last_name',
        placeholder: 'Type your last name',
        checkValue: (value) => value.length >= 8 && value.length <= 50,
        checkTime: 500
      },
    ],
    company: [
      {
        label: 'username',
        placeholder: 'New username for your account',
        checkValue: (value) => value.length >= 6 && value.length <= 50,
        checkTime: 500
      },
      {
        label: 'password',
        placeholder: 'New password for your account',
        checkValue: (value) => value.length >= 8 && value.length <= 50,
        checkTime: 500
      },
      {
        label: 'first_name',
        placeholder: 'Type your first name',
        checkValue: (value) => value.length >= 6 && value.length <= 50,
        checkTime: 500
      },
      {
        label: 'last_name',
        placeholder: 'Type your last name',
        checkValue: (value) => value.length >= 8 && value.length <= 50,
        checkTime: 500
      },
      {
        label: 'company_name',
        placeholder: 'The name your company will have',
        checkValue: (value) => value.length >= 8 && value.length <= 50,
        checkTime: 500
      },
    ],
  }
};

export const tabMenus = {
  myAccount: ['Login', 'Register_as_customer', 'Register_as_company']
}

export const api = {
  baseUrl: 'http://192.168.1.193:3000',
  v1prefix: '/api/v1',
  authPrefix: '/auth',
  companyPrefix: '/companies',
  goalPrefix: '/goals',
  userPrefix: '/users',
}