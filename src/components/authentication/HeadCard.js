import React from 'react';

const HeadCard = ({title, paragrah}) => {
    return (
        <>
            <h1 className='text-center text'>
                <span className='text-primary'>D</span>
                <span className='text-danger'>o</span>
                <span className='text-warning'>v</span>
                <span className='text-success'>e</span>
            </h1>
            <h2 className="text fs-4 text-center mb-2">{title}</h2>
            <p className='text-center m-0 mb-4 text-muted'>{paragrah}</p>
        </>
    );
};

export default HeadCard;
