function UserGroupToMember(user_group) {
    return {
        user_group_id:user_group.id,
        group_id:user_group.group_id,
        user_id:user_group.user.id,
        mobile:user_group.user.mobile,
        name:user_group.user.name,
        transactions:user_group.transactions,
        loans:user_group.loans,
        role_id:user_group.role_id,
        role_name:user_group.role.name,
        role_title:user_group.role.title,
    }
}
export default UserGroupToMember;