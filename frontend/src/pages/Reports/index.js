import React from "react";

import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import MainContainer from "../../components/MainContainer/index.js";
import Title from "../../components/Title/index.js";
import MainHeader from "../../components/MainHeader/index.js";
import { useLogs } from "../../hooks/useLogs/index.js";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(8, 8, 3),
  },

  paper: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
  },

  settingOption: {
    marginLeft: "auto",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Reports = () => {
  const { logs } = useLogs();
  const classes = useStyles();

  return (
    <MainContainer className={classes.mainContainer}>
      <MainHeader>
        <Title>Relatórios</Title>
      </MainHeader>
      <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Responsável</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.description}</TableCell>
              <TableCell>{format(new Date(log.createdAt), "dd/MM/yyyy | HH:mm:ss")}</TableCell>
              <TableCell>{log.author.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </MainContainer>
  );
};

export default Reports;
