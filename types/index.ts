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
  | 'kill_process'
  | 'block_ip'
  | 'block_port'
  | 'isolate_host'
  | 'kill_connection';
export type SystemComponentStatus = 'connected' | 'degraded' | 'disconnected';
export type ApprovalStatus = 'APPROVED' | 'DENIED' | 'PENDING';

// ─── Incident ─────────────────────────────────────────────────────────────────

export interface Incident {
  id: string;
  attack_type: string; // analysis_result.attack_type
  threatLevel: ThreatLevel;
  confidence_score: number; // 0 ~ 1
  status: IncidentStatus;
  targetIp: string;
  targetName: string;
  detectedAt: string; // ISO 8601
  created_at: string; // ISO 8601
  mitre_attack_ids: string[];
  iocs: {
    attacker_ips: string[];
    target_uris: string[];
  };
  executive_summary: string;
  detailed_analysis: string; // Markdown
  key_indicators: KeyIndicator[];
  raw_log: string;
  recommended_actions: RecommendedAction[];
}

export interface KeyIndicator {
  label: string;
  value: boolean;
  description: string;
}

export interface RecommendedAction {
  id: string;
  action: string;
  parameter: string;
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
  minSeverity: ThreatLevel;
}

export interface AlarmConfig {
  threatScoreThreshold: number; // 0 ~ 100
  enablePushNotification: boolean;
  alertEmail?: string;
}
