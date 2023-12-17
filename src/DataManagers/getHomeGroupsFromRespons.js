function getHomeGroupFromResponse(response) {
    return response?.data?.data?.loanGroups;
}
export default getHomeGroupFromResponse;