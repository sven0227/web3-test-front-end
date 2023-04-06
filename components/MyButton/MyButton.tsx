import { Button } from "@mui/material";

export function MyButton({
  children,
  onClick,
}: {
  children: string | React.ReactNode,
  onClick?: React.MouseEventHandler
}) {
  return (
    <Button variant="contained" color="secondary" onClick={onClick} style={{ margin: 10 }}>
      {children}
    </Button>
  )
}