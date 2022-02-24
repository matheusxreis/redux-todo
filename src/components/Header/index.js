import React from 'react' 
import { Container } from './styles'

export function Header({title}){

    return (
        <Container>
            <h1> {title} </h1>

            <h3> 👋 </h3>
        </Container>
    )

}