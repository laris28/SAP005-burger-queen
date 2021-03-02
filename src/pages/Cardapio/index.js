/*import { LugMoveText, Movetouch, Lugedge } from "react-beautiful-dnd";
import React, { useState } from 'react';

const menuHamburger = [
    {
        id: 'Isa',
        name: 'Isa Soares',
        Image : 'img'
    },
    {
        id: 'Cintia ',
        name: 'Cintia Fumi',
        Image: 'img',
        description: 'Burguer Cintia Fumi, carne'
    },
    {
]
  
   export const Cardapio = () => {
    const [menuHamburgers, setHamburgers] = useState (menuHamburger);

    const handleStartMoveEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(menuHamburgers);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setHamburgers(items);
    }

 return(
        <div className=''>
            <header className=''>
                <h1>Cardápio de Hamburger</h1>
                <LugMoveText startLugEnd={handleStartLugEnd}>
                    <Movetouch moveTouchId='hamburgers'> 
                        {(provided) => (
                            <ul className='hamburgers' {...provided.movetouchProps} ref={provided.innerRef}>
                                {menuhamburgers.map(({id, name, Image, description}, index) => {
                                    return (
                                        <Lugedge key={id} lugedgeId={id} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.lugedgeProps} {...provided.lugHandleProps}>
                                                    <div className="hamburgers-image">
                                                        <img src={Image} alt={`${name} Image`} />
                                                    </div>
                                                    <h3>{ name }</h3>
                                                    <p>{ description }</p>
                                                </li>
                                            )}
                                        </Lugedge>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Movetouch>
                </LugMoveText>
            </header>
        </div>
    );
}

export default Cardapio; */