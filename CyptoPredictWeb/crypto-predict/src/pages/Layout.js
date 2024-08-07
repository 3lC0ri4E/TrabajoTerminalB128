// Layout.jsx
import React from 'react'
import { Box } from '@chakra-ui/react'

const Layout = ({ children }) => {
    return (
        <Box
            w='100vw'
            alignItems='center'
            h='100vh'
            justifyContent='center'
            color='#FFFFFF'
            fontFamily='Montserrat'
            fontStyle="normal"
            bgGradient='linear(to-r,#1294FF, #022C4F)'
        >
            {children}
        </Box>
    )
}

export default Layout
