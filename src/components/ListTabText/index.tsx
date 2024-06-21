import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Line } from "./styles";
import { theme } from '../../styles/theme';


interface ListTabTextProps {
    text: String;
    isActive: boolean;
    onClick: () => void;
}

export const ListTabText: React.FC<ListTabTextProps> = ({ text, isActive, onClick }) => {

    return (
        <Box onClick={onClick}>
            <Typography variant="h6" sx={{
                    position: 'relative',
                    display: 'inline-block',
                    pb: 2,
                    color: isActive ? theme.colors.black[600] : theme.colors.black[200],
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                }}>
                {text}
                {isActive && <Line />}
            </Typography>
        </Box>
    );
};
