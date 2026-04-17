// ─── Threat / Status Types ────────────────────────────────────────────────────

export type ThreatLevel = 'CRITICAL' | 'WARNING' | 'NORMAL';
export type IncidentStatus =
  | 'PENDING'
  | 'UNDER_INVESTIGATION'
  | 'RESOLVED'
  | 'CONTAINED'
  | 'DISMISSED';
export type ActionType =
  | 'quarantine_file'
  | 'terminate_process'
  | 'block_ip'
  | 'isolate_host'
  | 'kill_connection';
export type SystemComponentStatus = 'connected' | 'degraded' | 'disconnected';
export type ApprovalStatus = 'APPROVED' | 'DENIED' | 'PENDING';

// ─── Incident ─────────────────────────────────────────────────────────────────

export interface Incident {
  id: string;
  title: string;
  threatLevel: ThreatLevel;
  status: IncidentStatus;
  targetIp: string;
  targetName: string;
  detectedAt: string; // ISO 8601
  mitreTechnique?: string; // e.g. "T1053.003"
  mitreName?: string; // e.g. "Scheduled Task/Cron"
  summary: string;
  aiThinkingLog: AiThinkingStep[];
  evidence: EvidenceLog[];
  actionPlan: ActionItem[];
}

export interface AiThinkingStep {
  id: string;
  timestamp: string;
  message: string;
  type: 'search' | 'analysis' | 'decision' | 'complete' | 'error';
}

export interface EvidenceLog {
  id: string;
  raw: string;
  source: string;
  timestamp: string;
}

export interface ActionItem {
  id: string;
  target: string; // "파일" | "프로세스" | "네트워크" | "호스트"
  action: ActionType;
  parameter: string;
  justification: string;
}

// ─── System Health ─────────────────────────────────────────────────────────────

export interface SystemComponent {
  id: string;
  name: string;
  status: SystemComponentStatus;
  latencyMs?: number;
}

export interface SystemHealth {
  overallThreatScore: number; // 0 ~ 100
  agentRunning: boolean;
  pendingActions: number;
  components: SystemComponent[];
}

// ─── Report ────────────────────────────────────────────────────────────────────

export interface TimelineEvent {
  id: string;
  label: string;
  timestamp: string;
  detail?: string;
  status: 'success' | 'failure' | 'info';
}

export interface Report {
  id: string;
  incidentId: string;
  title: string;
  threatLevel: ThreatLevel;
  resolvedAt: string;
  approvedBy: string;
  feedbackComment?: string;
  mcpResult: 'SUCCESS' | 'FAILURE' | 'PARTIAL';
  timeline: TimelineEvent[];
  executedActions: ActionItem[];
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export type OsType = 'Linux' | 'Windows' | 'MacOS' | 'Unknown';

export interface VictimServer {
  id: string;
  name: string;
  ip: string;
  os: OsType;
  registered: string; // ISO 8601
  agentStatus: SystemComponentStatus;
}

export interface AlarmConfig {
  threatScoreThreshold: number; // 0 ~ 100
  enablePushNotification: boolean;
  alertEmail?: string;
}
