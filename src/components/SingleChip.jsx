import { Chip } from '@mui/material'
import React, { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const SingleChip = ({ctg,selectedCategories,setSelectedCategories}) => {
    const [selected,setSelected]=useState(false)

    const handleClick=()=>{
        if(selectedCategories.indexOf(ctg) === -1) {
            setSelected(true)
            setSelectedCategories((prev)=>[...prev,ctg])
        }else{
            setSelected(false)
            setSelectedCategories(selectedCategories.filter(item=>item !=ctg))
        }
    }
  return (
    <Chip label={ctg}
    sx={{color:'white',background:'#f5adc5',boxShadow:'2px 3px 5px rgb(181, 109, 133)',padding:'2px'}}
    clickable
    size="small"
    onClick={handleClick}
    icon={selected ? <DoneIcon/> : <RadioButtonUncheckedIcon/>}
    />  
)
}