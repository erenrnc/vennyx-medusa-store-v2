import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';

const DetailPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:9000/get-items");
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching items:", error);
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/delete-item?id=${id}`);
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            alert("Item deleted successfully!");
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 style={{ fontWeight: 'bold' }}>In DB Pokemons</h1>
            <div className="grid-container">
                {items.map((item) => (
                    <div className="grid-item" key={item.id}>
                        <img src={item.img} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p><strong>Type:</strong> {item.type}</p>
                        <button onClick={() => handleDelete(item.id)} style={{ marginTop: '10px', color: '#dc3545' }}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const config = defineRouteConfig({
    label: "Saved Pokemons"
})

export default DetailPage