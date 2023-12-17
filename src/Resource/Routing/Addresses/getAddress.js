const getAddress = (name,group_id=0) => {
  switch (name) {
      case 'Splash':        {return '/'}
      case 'Login':         {return '/Auth'}
      case 'MobileCode':    {return '/Auth/MobileCode'}
      case 'ForgetPassword':{return '/Auth/ForgetPassword'}
      case 'Home':          {return '/Home'}
      case 'LoanGroup':     {return '/Home/LoanGroup/'+group_id}
      case 'AddMember':     {return '/Home/LoanGroup/AddMember'}
      case 'EditProfile':   {return '/Home/LoanGroup/EditProfile/'+group_id}
      case 'ChangePassword':{return '/Home/LoanGroup/ChangePassword/'+group_id}
      case 'AddLoan':       {return '/Home/LoanGroup/AddLoan/'+group_id}
      case 'AddTransaction':{return '/Home/LoanGroup/AddTransaction/'+group_id}
      case 'Payments'      :{return '/Home/LoanGroup/Payments/'+group_id}
      case 'AddPayment':    {return '/Home/LoanGroup/AddPayment/'+group_id}
      default:              {return ''}
  }
}
export default getAddress;