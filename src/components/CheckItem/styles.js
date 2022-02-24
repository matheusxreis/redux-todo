import styled from 'styled-components'

export const CheckBox = styled.input.attrs({type:"checkbox"})`

width:20px;
height:20px;

color: ${({color})=> color ? `${color}` : '#212930'} !important;

margin-right:3px;
&:checked {
    background-color:green;
}
`