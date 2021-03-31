import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://radiant-beyond-91833.herokuapp.com/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorizations: `Bearer ${sessionStorage.getItem('token')}`

            }
        })
            .then(res => res.json())
            .then(data => setBookings(data));


    }, [])

    return (
        <div>
            <h3>You have Total: {bookings.length} Bookings</h3>
            {
                bookings.map(booking => <li key={booking._id}>{booking.name} from: {(new Date(booking.checkIn).toDateString('dd/MM/yyyy'))} To: {(new Date(booking.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;