import React, { useEffect, useState } from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/properties");

                if (!res.ok) {
                    throw new Error('Error fetching propertis');
                }
                const propertiesData = await res.json();
                setProperties(propertiesData);
                setIsLoading(false);
            } catch (err) {
                setError(err.message)
                setIsLoading(false);
            }
        }

        fetchProperties();
    }, [])

        if (isLoading) {
            return <div>Loading...</div>;
        }
    
        if (error) {
            return <div>Error: {error}</div>;
        }

        if (!properties.length) {
            return <div>No properties listed</div>;
        }

        return (
            <ul className="PropertyListing">
                { properties.map((property) => (
                    <li key={property.id}>
                        <PropertyCard {...property} />
                    </li>                       
                ))}
        </ul>
    );
};

export default PropertyListing;
