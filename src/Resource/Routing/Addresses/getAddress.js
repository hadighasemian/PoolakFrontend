const getAddress = (name,group_id=0) => {
  switch (name) {
      case 'Splash':        {return '/'}
      case 'Login':         {return '/Auth'}
      case 'Register':      {return '/Auth/Register'}
      case 'Forget':        {return '/Auth/Forget'}
      case 'EditProfile':   {return '/Home/EditProfile'}
      case 'ChangePassword':{return '/Home/ChangePassword'}
      case 'Home':          {return '/Home'}
      case 'LoanGroup':     {return '/Home/LoanGroup/'+group_id}
      case 'AddMember':     {return '/Home/LoanGroup/AddMember'}

      case 'AddLoanRequest':{return '/Home/LoanGroup/AddLoanRequest/'+group_id}
      case 'AddLoan':       {return '/Home/LoanGroup/AddLoan/'+group_id}
      case 'AddTransaction':{return '/Home/LoanGroup/AddTransaction/'+group_id}
      case 'Payments'      :{return '/Home/LoanGroup/Payments/'+group_id}
      case 'AddPayment':    {return '/Home/LoanGroup/AddPayment/'+group_id}
      default:              {return ''}
  }
}
export default getAddress;