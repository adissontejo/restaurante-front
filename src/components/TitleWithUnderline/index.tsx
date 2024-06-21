import React from 'react';
import { Typography, Box } from '@mui/material';
import { Line } from "./styles";
import { theme } from '../../styles/theme';

interface TitleWithUnderlineProps {
    text: string;
}

export const TitleWithUnderline: React.FC<TitleWithUnderlineProps> = ({ text }) => {
    return (
        <Box>
            <Typography variant="h4" sx={{ position: 'relative', display: 'inline-block', pb: 2, color: theme.colors.black[600], fontWeight: 700 }}>
                {text}
                <Line />
            </Typography>
        </Box>
    );
};
