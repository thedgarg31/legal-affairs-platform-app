// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { getNearbyLawyers } from '../api/lawyers';
// import Map from '../components/maps/Map';
// import LawyerList from '../components/lawyer/LawyerList';
// import SearchFilters from '../components/lawyer/SearchFilters';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import Alert from '../components/common/Alert';

// const FindLawyer = () => {
//         const { t } = useTranslation();
//         const [lawyers, setLawyers] = useState([]);
//         const [loading, setLoading] = useState(false);
//         const [error, setError] = useState('');
//         const [userLocation, setUserLocation] = useState(null);
//         const [filters, setFilters] = useState({
//             specialization: '',
//             language: '',
//             rating: 0,
//             maxDistance: 50, // km
//         });

//         // Get user's location on component mount
//         useEffect(() => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         const { latitude, longitude } = position.coords;
//                         setUserLocation({ lat: latitude, lng: longitude });
//                         fetchNearbyLawyers(latitude, longitude);
//                     },
//                     (error) => {
//                         console.error('Error getting location:', error);
//                         setError(t('findLawyer.locationError'));
//                         // Use default location (e.g., city center)
//                         setUserLocation({ lat: 28.6139, lng: 77.2090 }); // Delhi coordinates
//                         fetchNearbyLawyers(28.6139, 77.2090);
//                     }
//                 );
//             } else {
//                 setError(t('findLawyer.geolocationNotSupported'));
//                 // Use default location
//                 setUserLocation({ lat: 28.6139, lng: 77.2090 });
//                 fetchNearbyLawyers(28.6139, 77.2090);
//             }
//         }, [t]);

//         const fetchNearbyLawyers = async(lat, lng, filterParams = {}) => {
//             setLoading(true);
//             try {
//                 const params = {
//                     lat,
//                     lng,
//                     maxDistance: filters.maxDistance,
//                     ...filterParams,
//                 };

//                 // Add filters if they have values
//                 if (filters.specialization) params.specialization = filters.specialization;
//                 if (filters.language) params.language = filters.language;
//                 if (filters.rating > 0) params.minRating = filters.rating;

//                 const result = await getNearbyLawyers(params);
//                 setLawyers(result);
//             } catch (err) {
//                 setError(err.response ? .data ? .message || t('findLawyer.errorFetching'));
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const handleFilterChange = (newFilters) => {
//             setFilters({...filters, ...newFilters });
//             if (userLocation) {
//                 fetchNearbyLawyers(userLocation.lat, userLocation.lng, newFilters);
//             }
//         };

//         return ( <
//             div className = "find-lawyer-container" >
//             <
//             h1 > { t('findLawyer.title') } < /h1>

//             {
//                 error && < Alert type = "error"
//                 message = { error }
//                 />}

//                 <
//                 div className = "find-lawyer-content" >
//                     <
//                     div className = "search-filters-container" >
//                     <
//                     SearchFilters
//                 filters = { filters }
//                 onChange = { handleFilterChange }
//                 /> <
//                 /div>

//                 <
//                 div className = "map-container" > {
//                         loading ? ( <
//                             div className = "loading-overlay" >
//                             <
//                             LoadingSpinner / >
//                             <
//                             /div>
//                         ) : ( <
//                             Map userLocation = { userLocation }
//                             lawyers = { lawyers }
//                             maxDistance = { filters.maxDistance }
//                             />
//                         )
//                     } <
//                     /div>

//                 <
//                 div className = "lawyer-list-container" >
//                     <
//                     LawyerList lawyers = { lawyers }
//                 loading = { loading }
//                 /> <
//                 /div> <
//                 /div> <
//                 /div>
//             );
//         };

//         export default FindLawyer;


// My Updated Code:
import React from 'react';

const FindLawyer = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Find a Lawyer</h2>
            <p>Lawyer finder page - Coming soon!</p>
        </div>
    );
};

export default FindLawyer;
