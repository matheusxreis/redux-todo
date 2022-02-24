import React from 'react'
import { CheckBox } from './styles'

export function CheckItem({text, checked, color, onClickProps}){


    return checked ? (
        <div style={{display:"flex",  alignItems:"center", height:"20px"}}>
        
        <CheckBox  onClick={(e)=>onClickProps(text, e.target.checked)}color={color} checked={checked} />
        <h4 style={{margin:0, padding:0, color: color}}> {text || 'no items'} </h4>

        </div>
    ): (
        <div style={{display:"flex",  alignItems:"center", height:"20px"}}>
        
        <CheckBox onClick={(e)=>onClickProps(text, e.target.checked)} color={color} />
        <h4 style={{margin:0, padding:0, color: color}}> {text || 'no items'} </h4>

        </div> 
    )
}