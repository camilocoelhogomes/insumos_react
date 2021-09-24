import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CulruresContext from '../Store/cultureContext';

const Navigation = () => {
    const { cultures } = CulruresContext;
    return (
        <div>
            {cultures[0].label}
        </div>
    )
}

export default Navigation;