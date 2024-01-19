import SearchForm from "./SearchForm";
import EnterCard from "./EnterCard";
import PropTypes from "prop-types";

const EnterList = ({ entries, setEntries }) => {
    return (
        <div className="container bg-gray-700 mt-10 p-8 rounded-md max-h-96">
            <SearchForm setEntries={setEntries} />
            <div className=" max-h-56 overflow-y-scroll overflow-x-hidden">
                {
                    entries?.map((entry, idx) => (
                        <EnterCard entry={entry} key={idx} />
                    ))
                }
            </div>
        </div>
    )
}

export default EnterList;

EnterList.propTypes = {
    entries: PropTypes.array.isRequired,
    setEntries: PropTypes.func.isRequired,
};