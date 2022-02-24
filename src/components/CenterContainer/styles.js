import styled from 'styled-components'


export const Container = styled.div `

margin: 5px auto;
background-color:#FFF;
color: ${({color})=> color ? `${color}` : '#212930'};

box-shadow: 1px 1px 1px 1px #c8c8c8;

padding:5px;
border-top: ${({borderTop})=> borderTop ? '1px solid #c8c8c8' : '0'};

width: 700px;
max-width:100%;
`