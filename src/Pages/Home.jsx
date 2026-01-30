import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const books = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, description: 'A classic American novel' },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 14.99, description: 'A gripping tale of racial injustice' },
        { id: 3, title: '1984', author: 'George Orwell', price: 13.99, description: 'A dystopian novel about totalitarianism' },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 11.99, description: 'A romantic novel of manners' },
    ];

    const handleBuyClick = (book) => {
        console.log(book);
        navigate('/buy', { state: { book } });
    };
    const handlebookClick=(book)=>{
        navigate(`/book`,{state:{book}});
    }

    return (
        <div>
            <h1>Library Books</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title}
                        <a href={`/book/${book.id}`} onClick={()=>handlebookClick(book)} style={{ marginLeft: '10px' }}>
                            Book
                        </a>
                        <button onClick={() => handleBuyClick(book)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            Buy
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}