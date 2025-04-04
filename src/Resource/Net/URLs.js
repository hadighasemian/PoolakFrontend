export default {
    // 'base':'http://127.0.0.1/loan/back/public',
    'base':'https://back.poolak.salam-raya.ir',
    // 'base':'http://poolak.salam-raya.ir/backend',
    // 'base':'http://salam-raya.ir',


    'auth':{
        'register':{
            'mobile':'api/auth/register/mobile',
            'confirm_code':'api/auth/register/confirm_code',
            'register':'api/auth/register/register',
        },
        'forget':{
            'mobile':'api/auth/forget/mobile',
            'confirm_code':'api/auth/forget/confirm_code',
            'pass':'api/auth/forget/pass',
        },
        'check_token':'api/auth/check_token',
        'login':'api/auth/login',
    },
    'profile':{
        'editProfile':'api/profile/editProfile',
        'changePassword':'api/profile/changePassword',
    },
    'pardakht':{
        'request':'api/pardakht/request',
        'verification':'api/pardakht/verification',
    },
    'roles':{
        'index':'api/roles'
    },
    'loan_groups':{
        'index':'api/loan_groups/index',
        'add':'api/loan_groups/add',
        'delete':'api/loan_groups/delete',
        'view':'api/loan_groups/group',
        'member':{
            'index':'api/loan_groups/member',
            'add':'api/loan_groups/member/add',
            'delete':'api/loan_groups/member/delete',
            'checkout':'api/loan_groups/member/checkout',
        },
        'loans':{
            'index':'api/loan_groups/loan',
            'add':'api/loan_groups/loan/add',
            'delete':'api/loan_groups/loan/delete',
            'terminate':'api/loan_groups/loan/terminate',
        },
        'payments':{
            'index':'api/loan_groups/payments',
            'add':'api/loan_groups/payment/add',
            'delete':'api/loan_groups/payment/delete',
        },
        'loan_request':{
            'index':'api/loan_groups/loan_request',
            'add':'api/loan_groups/loan_request/add',
            'delete':'api/loan_groups/loan_request/delete',
        },
        'transactions':{
            'index':'api/loan_groups/transaction',
            'add':'api/loan_groups/transaction/add',
            'delete':'api/loan_groups/transaction/delete',
        },

    },


}

