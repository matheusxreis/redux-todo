import React from 'react'

import { Container } from './styles'
export function CenterContainer({children, borderTop, color}){

    return (
        <Container borderTop={borderTop} color={color}>
            {children}
        </Container>
    )
}
