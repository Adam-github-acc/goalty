export const iconSets = {
  fontAwesome5: 'fa5',
  materialIcons: 'material',
  feather: 'feather'
};

export const colors = {
  lightTheme: {
    background: '#ffe',
    surface: '#E0FFE0',
    text: '#000',
    secondaryText: '#666',
    themeIcon: 'moon',
    input: {
      placeholder: '#888',
      background: '#F0FFF0',
      error: '#EF9A9A'
    },
    divider: '#bbb',
    mapStyle: []
  },
  darkTheme: {
    background: '#213D30',
    surface: '#4D6B50',
    text: '#fff',
    secondaryText: '#bbb',
    themeIcon: 'sun',
    input: {
      placeholder: '#ddd',
      background: '#607C6E',
      error: '#841515'
    },
    divider: '#666',
    mapStyle: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}],
      },
    ]
  },
  global: {
    primary: {
      default: '#4DBD33',
      disabled: '#7BBF6A',
    },
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
      size: 16
    }
  },
  tabMenuItems: {
    size: 16
  },
  welcomeText: {
    size: 20,
    weight: 'bold'
  },
  card: {
    title: {
      size: 20,
      weight: 'bold'
    },
    description: {
      size: 14
    }
  },
  companyDetails: {
    title: {
      size: 22,
      weight: 'bold'
    },
    subtitle: {
      size: 20,
      weight: 'bold'
    },
    content: {
      size: 18,
    }
  },
  goal: {
    name: {
      size: 20,
      weight: 'bold'
    },
    description: {
      size: 14
    }
  },
  addGoal: {
    text: {
      size: 20,
      weight: 'bold'
    }
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
      checkTime: 500,
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
        checkValue: (value) => value.length >= 2 && value.length <= 20,
        checkTime: 500
      },
      {
        label: 'last_name',
        placeholder: 'Type your last name',
        checkValue: (value) => value.length >= 2 && value.length <= 29,
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
        checkValue: (value) => value.length >= 2 && value.length <= 20,
        checkTime: 500
      },
      {
        label: 'last_name',
        placeholder: 'Type your last name',
        checkValue: (value) => value.length >= 2 && value.length <= 29,
        checkTime: 500
      },
      {
        label: 'company_name',
        placeholder: 'The name your company will have',
        checkValue: (value) => value.length >= 3 && value.length <= 20,
        checkTime: 500
      },
      {
        label: 'company_description',
        placeholder: 'The description your company will have',
        checkValue: (value) => value.length <= 255,
        checkTime: 500
      },
    ],
  },
  addGoal: [
    {
      label: 'username',
      placeholder: 'Username',
      checkValue: (value) => value.length >= 6 && value.length <= 50,
      checkTime: 500
    },
  ],
  createGoal: [
    {
      label: 'name',
      placeholder: 'Name for your new loyalty card',
      checkValue: (value) => value.length >= 3 && value.length <= 30,
      checkTime: 500
    },
    {
      label: 'goal_reach_value',
      placeholder: 'How many times you have to validate that card',
      checkValue: (value) => /(^\d{1,10}$)/.test(value),
      checkTime: 500
    }
  ]
};

export const tabMenus = {
  myAccount: ['Login', 'Register_as_customer', 'Register_as_company']
}

export const api = {
  baseUrl: 'https://goalty.onrender.com',
  v1prefix: '/api/v1',
  authPrefix: '/auth',
  companyPrefix: '/companies',
  goalPrefix: '/goals',
  userPrefix: '/users',
}