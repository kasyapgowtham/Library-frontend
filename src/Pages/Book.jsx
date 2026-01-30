import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom"
import { useState } from "react";
export default function Book() {
    const location = useLocation();
    const book = location.state?.book;
    const navigate = useNavigate();
    const[FormData,setFormData]=useState({
        studentId:'',
        email:'',
        bookingDate:''
    });
    const handleSubmit=(e)=>{
        // e.preventDefault();
        // alert('Booking Successful!');
        try{
                    const response=axios.post('  https://marcelene-isoamyl-needingly.ngrok-free.dev/api/Library/booking',{
            studentId:FormData.studentId,
            Email:FormData.email,
            booked:FormData.bookingDate,
        });
        if(response.status===200){
             console.log(response);
        navigate('/home');
        }
    }
        catch(error){
            console.error('Booking failed:',error);
            return;
        }
    }

    return(
        <div>
             <h1>Booking Details</h1>
                <div className="book-info" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                    <h2>{book.title}</h2>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Description:</strong> {book.description}</p>
                    <p><strong>Price:</strong> ${book.price}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <label for="studentIds">StudentId:-</label>
                    <input type="text" value={FormData.studentId} onChange={(e) => setFormData({...FormData, studentId: e.target.value})} id="studentIds" name="studentId" placeholder="Enter StudentId" required />
                    <br/>
                    <label for="Email">Email:-</label>
                    <input type="email" id="Email" value={FormData.email} onChange={(e) => setFormData({...FormData, email: e.target.value})} name="email" placeholder="Enter Email" required />
                    <br/>
                    <label for="bookingDate">Booking Date:-</label>
                    <input type="date" id="bookingDate" value={FormData.bookingDate} onChange={(e) => setFormData({...FormData, bookingDate: e.target.value})} name="bookingDate" required />
                    <br/>
                </form>
        </div>
    )
}