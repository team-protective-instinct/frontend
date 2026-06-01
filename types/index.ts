// ─── Threat / Status Types ────────────────────────────────────────────────────

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'analyzing' | 'pending_review' | 'resolved' | 'dismissed';
export type ActionType =
  | 'quarantine_file'
  | 'terminate_process'
  | 'kill_process'
  | 'block_ip'
  | 'block_port'
  | 'isolate_host'
  | 'kill_connection';
export type SystemComponentStatus = 'connected' | 'degraded' | 'disconnected';
export type ApprovalStatus = 'APPROVED' | 'DENIED' | 'PENDING';

// ─── Incident ─────────────────────────────────────────────────────────────────

export interface IncidentListItem {
  idx: number;
  attack_type: string; // analysis_result.attack_type
  severity: SeverityLevel;
  confidence_score: number; // 0 ~ 1
  status: IncidentStatus;
  targetIp: string;
  targetName: string;
  detectedAt: string; // ISO 8601
  created_at: string; // ISO 8601
}

export interface IncidentDetail extends IncidentListItem {
  attack_ip?: string;
  target_uris: string[];
  suspicious_payloads: string[];
  analysis_summary: string;
  key_indicators: KeyIndicator[];
  raw_log: string;
}

export interface IncidentListResponse {
  items: IncidentListItem[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface IncidentQueryParams {
  page?: number;
  limit?: number;
  status?: IncidentStatus | 'ALL';
  severity?: SeverityLevel | 'ALL';
  q?: string;
}

export interface OverviewSummary {
  pending_count: number;
  today_count: number;
  resolved_count: number;
  recent_pending: IncidentListItem[];
}

export interface KeyIndicator {
  label: string;
  value: boolean;
  description: string;
}

// ─── System Health ─────────────────────────────────────────────────────────────

export interface SystemComponent {
  id: string;
  name: string;
  status: SystemComponentStatus;
  latencyMs?: number;
  lastSeen?: string;
}

export interface SystemHealth {
  overallThreatScore: number; // 0 ~ 100
  agentRunning: boolean;
  pendingActions: number;
  components: SystemComponent[];
}

// ─── Playbook (Knowledge Base) ──────────────────────────────────────────────────

export interface Playbook {
  id: string;
  fileName: string;
  fileType: 'PDF' | 'DOCX' | 'MD' | 'TXT';
  fileSize: number;
  uploadedAt: string;
  syncStatus: 'extracting' | 'vectorizing' | 'synced';
}

export interface PlaybookListItem {
  idx: number;
  title: string;
  tactic: string;
  source_file: string;
  recommended_action_hints: string[];
  source_refs: Record<string, unknown>[];
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

export interface PlaybookChunk {
  idx: number;
  playbook_id: number;
  chunk_id: string;
  section: string | null;
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
  modified_at: string;
}

export interface PlaybookDetail extends PlaybookListItem {
  chunks: PlaybookChunk[];
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
  lastSeen: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'Admin' | 'Analyst' | 'Viewer';
}

export interface NotificationSettings {
  email: string;
  webhookUrl?: string;
  minSeverity: SeverityLevel;
}

export interface AlarmConfig {
  threatScoreThreshold: number; // 0 ~ 100
  enablePushNotification: boolean;
  alertEmail?: string;
}
