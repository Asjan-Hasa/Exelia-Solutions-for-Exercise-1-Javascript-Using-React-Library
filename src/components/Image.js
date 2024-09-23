import React, { useEffect, useState } from "react"
const imagePlaceholder = 'https://via.placeholder.com/182x268/gray?text=No+Image'

const Image = (props) => {
    const {src,...otherProps} = props;
    const [imageSrc,setImageSrc] = useState(src)

    useEffect(()=>{
            setImageSrc(src)
    },[src])
    return <img
                {...otherProps}
                src={imageSrc || imagePlaceholder} 
                onError={(e) => {
                    e.target.onerror = null; 
                    setImageSrc(imagePlaceholder)
                }}
/>
}

export default Image