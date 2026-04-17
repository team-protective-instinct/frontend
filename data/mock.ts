import type { SystemHealth, Incident, Report, VictimServer, AlarmConfig } from '../types';

// ─── System Health ─────────────────────────────────────────────────────────────

export const mockSystemHealth: SystemHealth = {
  overallThreatScore: 78,
  agentRunning: true,
  pendingActions: 2,
  components: [
    { id: 'fastapi', name: 'AI Backend (FastAPI)', status: 'connected', latencyMs: 12 },
    { id: 'elasticsearch', name: 'Elasticsearch', status: 'connected', latencyMs: 34 },
    { id: 'victim1', name: 'Victim Server 1', status: 'connected', latencyMs: 8 },
    { id: 'victim2', name: 'Victim Server 2', status: 'degraded', latencyMs: 230 },
  ],
};

// ─── Incidents ─────────────────────────────────────────────────────────────────

export const mockIncidents: Incident[] = [
  {
    id: 'INC-001',
    title: 'SSH Brute Force 탐지',
    threatLevel: 'CRITICAL',
    status: 'PENDING',
    targetIp: '192.168.10.15',
    targetName: 'Victim Server 1',
    detectedAt: '2026-04-17T00:02:13+09:00',
    mitreTechnique: 'T1110.001',
    mitreName: 'Brute Force: Password Guessing',
    summary:
      '외부 IP 203.0.113.42로부터 1분간 320회 SSH 로그인 실패 탐지. 관리자 계정(root) 대상 사전 대입 공격.',
    aiThinkingLog: [
      {
        id: 'step1',
        timestamp: '2026-04-17T00:02:14+09:00',
        message: 'Elasticsearch에서 최근 5분 SSH 로그 검색 중...',
        type: 'search',
      },
      {
        id: 'step2',
        timestamp: '2026-04-17T00:02:15+09:00',
        message: '320건의 Failed password 이벤트 발견 (소스 IP: 203.0.113.42)',
        type: 'analysis',
      },
      {
        id: 'step3',
        timestamp: '2026-04-17T00:02:16+09:00',
        message: 'MITRE ATT&CK T1110.001 (Brute Force: Password Guessing) 매핑 완료',
        type: 'analysis',
      },
      {
        id: 'step4',
        timestamp: '2026-04-17T00:02:17+09:00',
        message: '공격 IP 203.0.113.42 차단 조치 계획 수립 완료. 관리자 승인 대기 중.',
        type: 'decision',
      },
    ],
    evidence: [
      {
        id: 'ev1',
        raw: 'Apr 17 00:01:44 victim1 sshd[4521]: Failed password for root from 203.0.113.42 port 56789 ssh2',
        source: '/var/log/auth.log',
        timestamp: '2026-04-17T00:01:44+09:00',
      },
      {
        id: 'ev2',
        raw: 'Apr 17 00:01:45 victim1 sshd[4522]: Failed password for root from 203.0.113.42 port 56801 ssh2',
        source: '/var/log/auth.log',
        timestamp: '2026-04-17T00:01:45+09:00',
      },
    ],
    actionPlan: [
      {
        id: 'act1',
        target: '네트워크',
        action: 'block_ip',
        parameter: '203.0.113.42',
        justification: '1분간 320회 SSH 실패 - 명백한 브루트포스 공격 IP',
      },
    ],
  },
  {
    id: 'INC-002',
    title: '비정상 프로세스 실행',
    threatLevel: 'WARNING',
    status: 'UNDER_INVESTIGATION',
    targetIp: '192.168.10.16',
    targetName: 'Victim Server 2',
    detectedAt: '2026-04-16T23:45:00+09:00',
    mitreTechnique: 'T1053.003',
    mitreName: 'Scheduled Task/Cron',
    summary:
      'www-data 계정에서 /tmp/.x 경로 실행 파일 실행. 예약 작업(crontab)으로 지속성 확보 시도 탐지.',
    aiThinkingLog: [
      {
        id: 'step1',
        timestamp: '2026-04-16T23:45:05+09:00',
        message: '프로세스 트리 분석 중 - www-data → /tmp/.x (PID: 3912)',
        type: 'search',
      },
      {
        id: 'step2',
        timestamp: '2026-04-16T23:45:10+09:00',
        message: 'crontab 변조 이력 확인 중...',
        type: 'analysis',
      },
      {
        id: 'step3',
        timestamp: '2026-04-16T23:45:15+09:00',
        message: '추가 IOC 수집 중. 분석 완료 후 조치 계획 수립 예정.',
        type: 'analysis',
      },
    ],
    evidence: [
      {
        id: 'ev1',
        raw: 'Apr 16 23:44:58 victim2 CRON[3912]: (www-data) CMD (/tmp/.x &> /dev/null)',
        source: '/var/log/syslog',
        timestamp: '2026-04-16T23:44:58+09:00',
      },
    ],
    actionPlan: [
      {
        id: 'act1',
        target: '프로세스',
        action: 'terminate_process',
        parameter: 'PID: 3912',
        justification: '/tmp/.x 비정상 경로의 숨겨진 실행 파일',
      },
    ],
  },
  {
    id: 'INC-003',
    title: '웹쉘 업로드 시도',
    threatLevel: 'CRITICAL',
    status: 'RESOLVED',
    targetIp: '192.168.10.15',
    targetName: 'Victim Server 1',
    detectedAt: '2026-04-16T22:10:00+09:00',
    mitreTechnique: 'T1505.003',
    mitreName: 'Server Software Component: Web Shell',
    summary: '/var/www/html/shell.php 웹쉘 파일 업로드 탐지. 격리 및 프로세스 종료로 차단 완료.',
    aiThinkingLog: [
      {
        id: 'step1',
        timestamp: '2026-04-16T22:10:05+09:00',
        message: '웹서버 액세스 로그에서 비정상 POST 요청 탐지',
        type: 'search',
      },
      {
        id: 'step2',
        timestamp: '2026-04-16T22:10:08+09:00',
        message: '/var/www/html/shell.php 파일 생성 확인 (PHP 웹쉘 시그니처 매칭)',
        type: 'analysis',
      },
      {
        id: 'step3',
        timestamp: '2026-04-16T22:10:10+09:00',
        message: '관리자 승인 접수. 파일 격리 및 PID 4012 종료 실행 중...',
        type: 'decision',
      },
      {
        id: 'step4',
        timestamp: '2026-04-16T22:10:15+09:00',
        message: '조치 완료. shell.php 격리됨, PID 4012 종료됨.',
        type: 'complete',
      },
    ],
    evidence: [
      {
        id: 'ev1',
        raw: '203.0.113.99 - - [16/Apr/2026:22:09:58 +0900] "POST /upload.php HTTP/1.1" 200 - "<?php system($_GET[\'cmd\']); ?>"',
        source: '/var/log/nginx/access.log',
        timestamp: '2026-04-16T22:09:58+09:00',
      },
    ],
    actionPlan: [
      {
        id: 'act1',
        target: '파일',
        action: 'quarantine_file',
        parameter: '/var/www/html/shell.php',
        justification: '악성 PHP 웹쉘 발견 - 원격 코드 실행 위협',
      },
      {
        id: 'act2',
        target: '프로세스',
        action: 'terminate_process',
        parameter: 'PID: 4012',
        justification: '웹쉘을 통해 생성된 비정상 자식 프로세스',
      },
    ],
  },
  {
    id: 'INC-004',
    title: '의심스러운 파일 생성',
    threatLevel: 'WARNING',
    status: 'CONTAINED',
    targetIp: '192.168.10.16',
    targetName: 'Victim Server 2',
    detectedAt: '2026-04-16T21:30:00+09:00',
    summary: '/etc/cron.d/ 디렉토리에 숨김 파일(.backdoor) 생성. 호스트 격리 조치 완료.',
    aiThinkingLog: [
      {
        id: 'step1',
        timestamp: '2026-04-16T21:30:05+09:00',
        message: '파일시스템 변경 이벤트 탐지: /etc/cron.d/.backdoor',
        type: 'search',
      },
      {
        id: 'step2',
        timestamp: '2026-04-16T21:30:10+09:00',
        message: '파일 내용 분석 - cron 기반 리버스쉘 스크립트 확인',
        type: 'analysis',
      },
      {
        id: 'step3',
        timestamp: '2026-04-16T21:30:12+09:00',
        message: '호스트 격리 조치 완료.',
        type: 'complete',
      },
    ],
    evidence: [
      {
        id: 'ev1',
        raw: 'inotify: CREATE /etc/cron.d/.backdoor (www-data, uid=33)',
        source: 'auditd',
        timestamp: '2026-04-16T21:30:02+09:00',
      },
    ],
    actionPlan: [
      {
        id: 'act1',
        target: '호스트',
        action: 'isolate_host',
        parameter: '192.168.10.16',
        justification: '지속성 확보 스크립트 발견 - 추가 감염 방지를 위한 격리',
      },
    ],
  },
  {
    id: 'INC-005',
    title: '관리자 정기 스크립트 실행',
    threatLevel: 'NORMAL',
    status: 'DISMISSED',
    targetIp: '192.168.10.15',
    targetName: 'Victim Server 1',
    detectedAt: '2026-04-16T20:00:00+09:00',
    summary: '정기 백업 스크립트 실행으로 인한 경보. 관리자 확인 후 오탐 처리됨.',
    aiThinkingLog: [
      {
        id: 'step1',
        timestamp: '2026-04-16T20:00:05+09:00',
        message: '대용량 파일 읽기/쓰기 이벤트 탐지',
        type: 'search',
      },
      {
        id: 'step2',
        timestamp: '2026-04-16T20:00:10+09:00',
        message: '실행 주체: backup_user, 스크립트: /opt/backup/run.sh - 정상 패턴 확인',
        type: 'analysis',
      },
    ],
    evidence: [
      {
        id: 'ev1',
        raw: 'Apr 16 20:00:00 victim1 sudo: backup_user : TTY=pts/0 ; PWD=/opt/backup ; USER=root ; COMMAND=/opt/backup/run.sh',
        source: '/var/log/auth.log',
        timestamp: '2026-04-16T20:00:00+09:00',
      },
    ],
    actionPlan: [],
  },
];

// ─── Reports ───────────────────────────────────────────────────────────────────

export const mockReports: Report[] = [
  {
    id: 'RPT-001',
    incidentId: 'INC-003',
    title: '웹쉘 업로드 시도 처리 보고서',
    threatLevel: 'CRITICAL',
    resolvedAt: '2026-04-16T22:15:00+09:00',
    approvedBy: 'admin@agent2.io',
    feedbackComment: '웹쉘 파일 격리 및 프로세스 종료 승인. 업로드 취약점 패치 필요.',
    mcpResult: 'SUCCESS',
    timeline: [
      {
        id: 't1',
        label: '위협 탐지',
        timestamp: '2026-04-16T22:10:00+09:00',
        detail: 'Elasticsearch 이상 탐지',
        status: 'success',
      },
      {
        id: 't2',
        label: 'AI 분석',
        timestamp: '2026-04-16T22:10:08+09:00',
        detail: '웹쉘 시그니처 확인 완료',
        status: 'success',
      },
      {
        id: 't3',
        label: '관리자 승인',
        timestamp: '2026-04-16T22:11:00+09:00',
        detail: 'admin@agent2.io 승인',
        status: 'success',
      },
      {
        id: 't4',
        label: '조치 실행',
        timestamp: '2026-04-16T22:11:05+09:00',
        detail: 'MCP API 타격 완료',
        status: 'success',
      },
      {
        id: 't5',
        label: '조치 확인',
        timestamp: '2026-04-16T22:15:00+09:00',
        detail: '파일 격리 및 프로세스 종료 성공',
        status: 'success',
      },
    ],
    executedActions: [
      {
        id: 'act1',
        target: '파일',
        action: 'quarantine_file',
        parameter: '/var/www/html/shell.php',
        justification: '악성 PHP 웹쉘',
      },
      {
        id: 'act2',
        target: '프로세스',
        action: 'terminate_process',
        parameter: 'PID: 4012',
        justification: '웹쉘 실행 프로세스',
      },
    ],
  },
  {
    id: 'RPT-002',
    incidentId: 'INC-004',
    title: '의심스러운 파일 생성 처리 보고서',
    threatLevel: 'WARNING',
    resolvedAt: '2026-04-16T21:45:00+09:00',
    approvedBy: 'admin@agent2.io',
    feedbackComment: '호스트 격리 후 추가 포렌식 수행 예정.',
    mcpResult: 'SUCCESS',
    timeline: [
      {
        id: 't1',
        label: '위협 탐지',
        timestamp: '2026-04-16T21:30:00+09:00',
        detail: 'Auditd 파일시스템 이벤트',
        status: 'success',
      },
      {
        id: 't2',
        label: 'AI 분석',
        timestamp: '2026-04-16T21:30:10+09:00',
        detail: 'cron 기반 백도어 확인',
        status: 'success',
      },
      {
        id: 't3',
        label: '관리자 승인',
        timestamp: '2026-04-16T21:32:00+09:00',
        detail: 'admin@agent2.io 승인',
        status: 'success',
      },
      {
        id: 't4',
        label: '조치 실행',
        timestamp: '2026-04-16T21:32:05+09:00',
        detail: '호스트 격리 완료',
        status: 'success',
      },
      {
        id: 't5',
        label: '조치 확인',
        timestamp: '2026-04-16T21:45:00+09:00',
        detail: '네트워크 격리 성공',
        status: 'success',
      },
    ],
    executedActions: [
      {
        id: 'act1',
        target: '호스트',
        action: 'isolate_host',
        parameter: '192.168.10.16',
        justification: '지속성 확보 스크립트 발견',
      },
    ],
  },
  {
    id: 'RPT-003',
    incidentId: 'INC-005',
    title: '관리자 스크립트 오탐 처리 보고서',
    threatLevel: 'NORMAL',
    resolvedAt: '2026-04-16T20:10:00+09:00',
    approvedBy: 'admin@agent2.io',
    feedbackComment: '정기 백업 스크립트 실행으로 오탐 처리.',
    mcpResult: 'SUCCESS',
    timeline: [
      {
        id: 't1',
        label: '위협 탐지',
        timestamp: '2026-04-16T20:00:00+09:00',
        detail: '대용량 파일 I/O 이벤트',
        status: 'info',
      },
      {
        id: 't2',
        label: 'AI 분석',
        timestamp: '2026-04-16T20:00:10+09:00',
        detail: '정상 백업 패턴 확인',
        status: 'info',
      },
      {
        id: 't3',
        label: '오탐 처리',
        timestamp: '2026-04-16T20:10:00+09:00',
        detail: '관리자 반려 (오탐)',
        status: 'info',
      },
    ],
    executedActions: [],
  },
];

// ─── Victim Servers ────────────────────────────────────────────────────────────

export const mockVictimServers: VictimServer[] = [
  {
    id: 'srv1',
    name: 'Victim Server 1',
    ip: '192.168.10.15',
    os: 'Linux',
    registered: '2026-04-10T09:00:00+09:00',
    agentStatus: 'connected',
  },
  {
    id: 'srv2',
    name: 'Victim Server 2',
    ip: '192.168.10.16',
    os: 'Linux',
    registered: '2026-04-10T09:05:00+09:00',
    agentStatus: 'degraded',
  },
];

// ─── Alarm Config ──────────────────────────────────────────────────────────────

export const mockAlarmConfig: AlarmConfig = {
  threatScoreThreshold: 60,
  enablePushNotification: true,
  alertEmail: 'admin@agent2.io',
};
