import { Table } from '../common/Table';
import { INCIDENT_TABLE_COLUMNS } from './constants';

export function IncidentListHeader() {
  return (
    <Table.Header>
      <Table.Head width={INCIDENT_TABLE_COLUMNS.id}>ID</Table.Head>
      <Table.Head width={INCIDENT_TABLE_COLUMNS.severity}>Severity</Table.Head>
      <Table.Head width={INCIDENT_TABLE_COLUMNS.confidence}>Conf.</Table.Head>
      <Table.Head>Attack Type</Table.Head>
      <Table.Head width={INCIDENT_TABLE_COLUMNS.targetIp}>Target IP</Table.Head>
      <Table.Head width={INCIDENT_TABLE_COLUMNS.status}>Status</Table.Head>
    </Table.Header>
  );
}
