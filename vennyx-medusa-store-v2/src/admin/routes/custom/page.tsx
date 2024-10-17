import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';

const CustomPage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(20);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

    useEffect(() => {
        fetchPokemons();
    }, [offset, limit]);

    const fetchPokemons = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:9000/get-pokemons?offset=${offset}&limit=${limit}`);
            setPokemons(response.data.results);
            setTotalCount(response.data.count);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Pokemons:", error);
            setLoading(false);
        }
    };

    const handleViewMore = async (name: string, type: number) => {
        try {
            const response = await axios.get(`http://localhost:9000/get-poke-info?name=${name}`);
            if (type == 0) {
                setSelectedPokemon(response.data);
                setShowModal(true);
            } else {
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching Pokemon details:", error);
        }
    }

    const handleCheckboxChange = async (name) => {
        setSelectedCheckboxes((prev) => {
            const newSelection = {
                ...prev,
                [name]: !prev[name],
            };

            if (newSelection[name]) {
                handleViewMore(name,1).then((details) => {
                    if (details) {
                        setSelectedPokemon(details);
                    }
                });
            }

            return newSelection;
        });
    };

    const handleSave = async () => {
        const selectedPokemons = [];

        for (const name in selectedCheckboxes) {
            if (selectedCheckboxes[name]) {
                const details = await handleViewMore(name,1);
                if (details) {
                    selectedPokemons.push({
                        name: details.name,
                        img: details.img,
                        type: details.type
                    });
                }
            }
        }

        try {
            await axios.post("http://localhost:9000/create-item", selectedPokemons);
            alert("Selected Pokémon saved successfully!");
            fetchPokemons();
            setSelectedCheckboxes({});
        } catch (error) {
            console.error("Error saving selected Pokémon:", error);
            alert("Failed to save selected Pokémon.");
        }
    };

    const handleSaveWorkflow = async () => {

        const selectedPokemons = [];

        for (const name in selectedCheckboxes) {
            if (selectedCheckboxes[name]) {
                const details = await handleViewMore(name, 1);
                if (details) {
                    selectedPokemons.push({
                        name: details.name,
                        img: details.img,
                        type: details.type
                    });
                }
            }
        }

        try {
            await axios.post("http://localhost:9000/create-item-with-workflow", selectedPokemons);
            alert("Selected Pokémon saved successfully!");
            fetchPokemons();
            setSelectedCheckboxes({});
        } catch (error) {
            console.error("Error saving selected Pokémon:", error);
            alert("Failed to save selected Pokémon.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 style={{ fontWeight: 'bold' }}>Pokemons List</h1>
            <br />
            <div className="table-container">
                {pokemons.map((pokemon, index) => (
                    <div className="card" key={index}>
                        <input
                            type="checkbox"
                            checked={!!selectedCheckboxes[pokemon.name]}
                            onChange={() => handleCheckboxChange(pokemon.name)}
                        />
                        <h2>{pokemon.name}</h2>
                        <button onClick={() => handleViewMore(pokemon.name,0)}>View More</button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleSave}
                style={{
                    marginTop: '20px',
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight:'20px'
                }}
            >
                Save
            </button>

            <button
                onClick={handleSaveWorkflow}
                style={{
                    marginTop: '20px',
                    backgroundColor: '#ee0b0b', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                }}
            >
              Workflow Save
            </button>

            <div className="pagination-controls" style={{ marginTop: '10px' }}>
                <button disabled={offset === 0} onClick={() => setOffset(offset - limit)}>Previous</button>
                <span> Page {Math.ceil(offset / limit) + 1} of {Math.ceil(totalCount / limit)} </span>
                <button disabled={(offset + limit) >= totalCount} onClick={() => setOffset(offset + limit)}>Next</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        {selectedPokemon ? (
                            <>
                                <img
                                    src={selectedPokemon.img || "https://via.placeholder.com/96"}
                                    alt={selectedPokemon.name}
                                />
                                <div className="modal-details">
                                    <h2>{selectedPokemon.name}</h2>
                                    <p><strong>Type:</strong> {selectedPokemon.type || "Unknown"}</p>
                                    <p><strong>ID:</strong> {selectedPokemon.id}</p>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export const config = defineRouteConfig({
    label: "Pokemons",
    //icon: ChatBubbleLeftRight,
})

export default CustomPage