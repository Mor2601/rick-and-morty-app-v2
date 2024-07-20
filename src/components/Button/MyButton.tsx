import React from 'react'
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
interface MyButtonProps {
    name: string;
    onClick: () => void;
    variant: "text" | "outlined" | "contained";
    color: "inherit" | "primary" | "secondary" | "success" | "error";
    size: "small" | "medium" | "large";
    sx?: React.CSSProperties;

    }

const MyButton:React.FC<MyButtonProps> = ({name,onClick,variant,color,size,sx}) => {
  return (
   
    <Button fullWidth variant={variant} size={size} color={color} onClick={onClick}>
    {name}
  </Button>
  
  )
}
export default MyButton