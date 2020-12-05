import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function List() {
    const state = useSelector(state => state.articles);

    return (
        <div>
            {state}
        </div>
    )
}
export default List;