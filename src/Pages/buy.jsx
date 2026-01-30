import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const book = location.state?.book;

    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        email: '',
        amount: book?.price || '',
    });
    const[message,setMessage]=useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment submitted:', formData);
        alert('Payment processed successfully!');
    };
    const makepayment=()=>{
        try{
            const response=axios.post('  https://marcelene-isoamyl-needingly.ngrok-free.dev/api/Library/payment',{
            Email:formData.email,
            Amount:formData.amount,
            cardnumber:formData.cardNumber,
            cardholdernname:formData.cardName,
            Expiry:formData.expiry,
            CVV:formData.cvv
        })
        if(response.status===200){
            setMessage('Payment successful!');
            navigate('/home');
        }
        //setMessage('Payment successful!');
        console.log(response)
        console.log(response.data);
        }
        catch(error){
            setMessage('Payment failed. Please try again.');
            return;
        }
        
    }

    if (!book) {
        return (
            <div className="payment-container">
                <div className="payment-card">
                    <h1>No Book Selected</h1>
                    <p>Please select a book from the home page first.</p>
                    <button onClick={() => navigate('/home')}>Go Back to Books</button>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-container">
            <div className="payment-card">
                <h1>Payment Details</h1>
                <div className="book-info" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                    <h2>{book.title}</h2>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Description:</strong> {book.description}</p>
                    <p><strong>Price:</strong> ${book.price}</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="$0.00"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Cardholder Name</label>
                        <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input
                                type="date"
                                name="expiry"
                                value={formData.expiry}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                maxLength="5"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="123"
                                maxLength="3"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" onClick={makepayment} className="pay-button">
                        Pay Now
                    </button>
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    );
}