import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ name }) => {
    const imageUrl = name ? name.startsWith('https') ? name : `/avatar/${name}.svg` : "";
    return (
        <img src={name} referrerPolicy="no-referrer" className="w-24 h-24 rounded-full mx-auto" />
    );
};

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Avatar;