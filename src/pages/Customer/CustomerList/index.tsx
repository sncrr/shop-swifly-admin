import { NavigateFunction } from "react-router-dom";
import { Section } from "../../../components/containers";
import { TBody, THead, THeader, TRow, Table, TableControls } from "../../../components/tables";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

interface Props {
  customerState: any,
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
}

const CustomerList = (props: Props) => {

  console.log("CUSTOMER ROUTE", props);

  return (
    <Section>
      <TableControls
        hasSearch
      />
      <Table>
        <THeader>
          <TRow>
            <THead></THead>
            <THead>Id</THead>
            <THead>First Name</THead>
            <THead>Last Name</THead>
            <THead>Email</THead>
            <THead>Birthday</THead>
          </TRow>
        </THeader>
        <TBody>

        </TBody>
      </Table>
    </Section>

  )
}

export default CustomerList;