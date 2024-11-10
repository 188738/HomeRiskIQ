import React, { useState, useRef, useEffect } from 'react';
import './CalculateRisk.css';
import maplibregl, { Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

function CalculateRisk() {
    const [address, setAddress] = useState('');
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [properties, setProperties] = useState(null);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=582182be321d45428b988206666bcd85',
            center: [-98.583333, 39.833333], //centre location for US
            zoom: 2
        });

        map.current.addControl(new maplibregl.NavigationControl());

        map.current.on('load', () => {
            map.current.on('click', handleMapClick);
        });

        return () => {
            if (map.current) {
                map.current.off('click', handleMapClick);
            }
        };
    }, []);

    const handleMapClick = async (e) => {
        const { lng, lat } = e.lngLat; //the latitude and longitude information about the location
        setSelectedCoords({ lng, lat });

        //remove existing marker if it exists
        if (markerRef.current) {
            markerRef.current.remove();
        }

        //create and add new marker
        const newMarker = new Marker()
            .setLngLat([lng, lat])
            .addTo(map.current);

        //update markerRef with the new marker
        markerRef.current = newMarker;

        await reverseGeocode(lng, lat);
    };

    //get the information about the location through the latitude and longitude (reverse geocoding)
    const reverseGeocode = async (lng, lat) => {
        try {
            const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=582182be321d45428b988206666bcd85`);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const feature = data.features[0];
                setProperties(feature.properties);
                const formattedAddress = feature.properties.formatted;
                setAddress(formattedAddress);
                setLocationData(feature);
            }
        } catch (error) {
            console.error("Error reverse geocoding:", error);
        }
    };

    useEffect(() => {
        console.log(properties);
    }, [properties]);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (locationData) {
            console.log("Submitting location data:", properties);
            // Here you would send the locationData to your backend or process it as needed
        } else {
            console.log("No location data available");
        }
    };

    return (
        <div className="calculate-risk-container">
            <form onSubmit={handleSubmit} className="form">
                <h1>Enter Address</h1>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Street, City, State Zip Code, United States of America"
                />
                <div ref={mapContainer} className="map-container"></div>
                {selectedCoords && (
                    <p>Selected coordinates: {selectedCoords.lng.toFixed(6)}, {selectedCoords.lat.toFixed(6)}</p>
                )}
                <button type="submit" className="button">Calculate Risk Score</button>
            </form>
        </div>
    );
}

export default CalculateRisk;