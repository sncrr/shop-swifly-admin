import { Section } from "../../../components/containers";
import { TBody, THead, THeader, TRow, Table, TableControls } from "../../../components/tables";

const CustomerList = () => {

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