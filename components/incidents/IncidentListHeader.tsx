import { Table } from '../common/Table';

export function IncidentListHeader() {
  return (
    <Table.Header>
      <Table.Head width="w-32">ID</Table.Head>
      <Table.Head width="w-28">Severity</Table.Head>
      <Table.Head width="w-24">Conf.</Table.Head>
      <Table.Head>Attack Type</Table.Head>
      <Table.Head width="w-40">Target IP</Table.Head>
      <Table.Head width="w-28">Status</Table.Head>
    </Table.Header>
  );
}
