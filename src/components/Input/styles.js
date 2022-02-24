import styled from 'styled-components'

export const Input = styled.input`

max-width:100%;
width:600px;

height:40px;

color: #212930;

border:1px solid black;


`

export const Button = styled.button`

background: #764abc;
color #FFF;
width:auto;
height:40px;

text-align:center;

margin-left:1.5px;

transition: filter 0.2s;

&: hover {
    filter: brightness(0.8)
}

`

export const Select = styled.select`
width:100px;
height:50px;

`