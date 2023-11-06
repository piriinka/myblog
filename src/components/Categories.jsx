import React, { useState, useContext } from 'react'
import Stack from '@mui/material/Stack';
import { SingleChip } from './SingleChip';
import { CategContext } from '../context/CategContext';
import { Typography } from '@mui/material';


export const Categories = ({selectedCategories, setSelectedCategories}) => {
    const { categories } = useContext(CategContext)

   // console.log('categories rendering')
    
    return (
        <Stack direction="row" spacing={1} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '5px', gap:'5px' }}>
            <Typography sx={{width:'100%',textAlign:'center', fontWeight:'lighter', fontSize:'0.8rem',paddingTop:'10px',color:'#a2a0a1'}}>💎 categories 💎</Typography>
            {categories && categories.map(ctg =>
                <SingleChip key={ctg} ctg={ctg}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
            )}

        </Stack>
    )
}
