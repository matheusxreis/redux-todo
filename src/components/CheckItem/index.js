import React from 'react'
import { CheckBox } from './styles'

export function CheckItem({text, checked, color, onClickProps, param}){


    return checked ? (
        <div style={{display:"flex",  alignItems:"center", height:"20px"}}>
        
        <CheckBox  onClick={(e)=>onClickProps(param)}color={color} checked={checked} />
        <p style={{margin:0, padding:0, color: color}}> {text || 'no items'} </p>

        </div>
    ): (
        <div style={{display:"flex",  alignItems:"center", height:"20px"}}>
        
        <CheckBox onClick={(e)=>onClickProps(param)} color={color} />
        <p style={{margin:0, padding:0, color: color}}> {text || 'no items'} </p>

        </div> 
    )
}