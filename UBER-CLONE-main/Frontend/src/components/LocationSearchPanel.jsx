
const LocationSearchPanel = ({ suggestions, setvehcilePanel, setPickup, setDestination, activeField }) => {
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.description); // Set pickup as description
        } else if (activeField === 'destination') {
            setDestination(suggestion.description); // Set destination as description
        }
    };

    return (
        <div>
            {/* Display fetched suggestions */}
            {suggestions.map((elem, idx) => (
                <div
                    key={idx}
                    onClick={() => handleSuggestionClick(elem)}
                    className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
                >
                    <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
                        <i className="ri-map-pin-fill"></i>
                    </h2>
                    {/* Use elem.description for display */}
                    <h4 className="font-medium">{elem.description}</h4>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;
