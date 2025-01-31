import CardDetails from "@components/CardDetails";
import CardPool from "@components/CardPool";
import ChangableDecklist from "@components/ChangableDecklist";

const ManageDecklist = () => {
    return(
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2fr_1fr] px-5 pt-4 gap-x-2">
            <CardDetails />
            <ChangableDecklist />
            <CardPool />
        </div>
    )
}

export default ManageDecklist;