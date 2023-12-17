import FabHome from "./FabHome";
import HomeGroupsRow from "./HomeGroupsRow";
import StatusFrame from "../Other/StatusFrame";
import getHomeGroups from "../../Resource/Net/Requests/GetHomeGroups";


function Home() {
    const { loanGroups, loading, error } = getHomeGroups();
    // console.log(loanGroups)
    return(
        <StatusFrame className='position-relative' loading={loading} error={error}>
            <div className="container-fluid overflow-auto h-100 home-root">
                {loanGroups?.map((loanGroup)=>{
                    return <HomeGroupsRow key={loanGroup.id} loanGroup={loanGroup} />
                })}
                <FabHome/>
            </div>
        </StatusFrame>
    );
}
export default Home;