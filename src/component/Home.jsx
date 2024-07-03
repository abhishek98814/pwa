import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                setData(response.data.products);
            } catch (err) {
                console.log(err);
                // Handle error
            }
        };

        fetchData();

        const handleOnlineStatusChange = () => {
            setIsOffline(!navigator.onLine);
        };

        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);

        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, []);

    return (
        <div>
            {isOffline && <div>You are currently offline. Please connect to the internet to get the latest data.</div>}
            {data && data.map(product => (
                <div key={product.id}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
