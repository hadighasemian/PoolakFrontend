function UnpackGroupAuthRole(group) {
    return {
        membershipId:group?.clientRole.membership_id,
        role:group?.clientRole,
    }
}
export default UnpackGroupAuthRole;