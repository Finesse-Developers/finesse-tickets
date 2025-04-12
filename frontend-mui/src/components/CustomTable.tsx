import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PlainButton } from "./PlainButton";
import { Link, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

type PropType = {
  rows: {
    channelName: string;
    id: string;
    panelTitle: string;
  }[];
};

export default function CustomTable({ rows }: PropType) {
  const { id } = useParams();

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        borderTop: "1px solid white",
        borderRadius: 0,
        boxShadow: "none",
      }}
    >
      <Table
        sx={{
          height: "100%",
          width: "100%",
          tableLayout: "fixed", // 👈 forces cells to shrink evenly
          borderBottom: "none",
        }}
        aria-label="responsive table"
      >
        <TableHead>
          <TableRow
            sx={{
              "& th": { color: "white" },
            }}
          >
            <TableCell align="left">Channel</TableCell>
            <TableCell align="left">Panel Title</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "& td": { color: "white" },
                }}
              >
                <TableCell align="left">{row.channelName}</TableCell>
                <TableCell align="left">{row.panelTitle}</TableCell>
                <TableCell align="right">
                  <PlainButton>SEND</PlainButton>
                  <Link to={`/dashboard/${id}/panel/${row.id}/edit`}>
                    <PlainButton>EDIT</PlainButton>
                  </Link>
                  <PlainButton>DELETE</PlainButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              sx={{
                "& td, & th": {
                  borderBottom: "none", // ✅ removes row bottom borders
                },
              }}
            >
              <TableCell colSpan={3} align="center">
                <Box py={4}>
                  <Typography color="white" variant="h6">
                    No panels found, try to create one.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
