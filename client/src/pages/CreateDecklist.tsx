import CardPool from "@components/CardPool";

const CreateDecklist = () => {
    return(
        <div className="grid grid-cols-3 p-5">
            <div>Card Details</div>
            <div>Actual Decklist</div>
            <CardPool />
        </div>
    )
}

export default CreateDecklist;