'use client';
import React from 'react'; // Ensure React is imported
// import FabHome from "./FabHome"; // Needs migration
// import HomeGroupsRow from "./HomeGroupsRow"; // Needs migration
// import StatusFrame from "../Other/StatusFrame"; // Needs migration
// import getHomeGroups from "@/Resource/Net/Requests/GetHomeGroups"; // Path adjusted, needs migration
import './Home.css'; // Assuming Home.css will be created in the same directory

function Home() {
    // const { loanGroups, loading, error } = getHomeGroups(); // Logic commented out
    const loading = false; // Placeholder
    const error = null; // Placeholder
    const loanGroups: any[] = []; // Placeholder
    // console.log(loanGroups)
    return(
        // <StatusFrame className='position-relative' loading={loading} error={error}> {/* StatusFrame commented out */}
            <div className="container-fluid overflow-auto h-100 home-root">
                {loanGroups?.map((loanGroup: any) => { // Added type for loanGroup
                    // return <HomeGroupsRow key={loanGroup.id} loanGroup={loanGroup} /> // HomeGroupsRow commented out
                    return <div key={loanGroup.id}>Loan Group: {loanGroup.id}</div>; // Placeholder
                })}
                {/* <FabHome/> */} {/* FabHome commented out */}
                <div>Home Page Content</div> {/* Placeholder content */}
            </div>
        // </StatusFrame>
    );
}
export default Home;
