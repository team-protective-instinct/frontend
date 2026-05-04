# Capstone Project Frontend

이 프로젝트는 캡스톤 디자인 프로젝트의 프론트엔드 애플리케이션입니다. React Native와 Expo, 그리고 스타일링을 위해 NativeWind(Tailwind CSS)를 사용하고 있습니다.

## 📌 필수 사전 준비 (Prerequisites)

프로젝트를 실행하기 전에 컴퓨터와 스마트폰에 아래 항목들이 준비되어 있어야 합니다.

1. **[Node.js](https://nodejs.org/)**: 공식 홈페이지에서 LTS 버전을 다운로드하고 설치하세요. (패키지 설치 및 실행에 필요합니다.)
2. **[Git](https://git-scm.com/)**: 저장소를 클론(Clone)하기 위해 필요합니다.
3. **Expo Go 앱**: 내 스마트폰(실기기)에서 개발 중인 화면을 띄워보기 위해 필요합니다. 구글 플레이스토어(Android)나 앱스토어(iOS)에서 `Expo Go`를 검색하여 설치해주세요.
   _(PC에서 가상 기기로 띄우려면 OS에 맞게 Android Studio 또는 Xcode 설치 및 설정이 필요합니다.)_

---

## 🛠️ 설치 방법 (Installation)

1. 터미널(또는 명령 프롬프트)을 열고, 이 레포지토리를 로컬 컴퓨터로 클론합니다.

   ```bash
   git clone https://github.com/team-protective-instinct/frontend
   ```

2. 클론한 프로젝트 폴더로 이동합니다.

   ```bash
   cd frontend
   ```

3. `npm`을 사용하여 프로젝트 실행에 필요한 패키지(의존성)들을 설치합니다.

   ```bash
   npm install
   ```

---

## 🚀 실행 가이드 (Running the app)

패키지 설치가 완료되었다면, 아래 명령어를 통해 개발 서버를 실행할 수 있습니다.

```bash
npm start
```

명령어를 실행하면 터미널 창에 **QR 코드**가 나타납니다.

- **안드로이드 사용자**: 스마트폰에서 `Expo Go` 앱을 열고 화면 중앙에 있는 **'Scan QR code'**를 눌러 터미널의 QR 코드를 촬영하세요.
- **아이폰 사용자 (iOS)**: 아이폰의 기본 **'카메라'** 앱을 켜서 터미널의 QR 코드를 비추면화면 안내에 따라 `Expo Go` 앱을 열 수 있습니다.
- **PC 에뮬레이터/시뮬레이터 사용자**:
  - 개발 서버가 켜진 터미널에서 단축키 `a`를 누르면 Android Emulator가 실행됩니다.
  - 단축키 `i`를 누르면 iOS Simulator가 실행됩니다. (Mac 환경 전용)

### 💡 기타 유용한 명령어

- `npm run android`: 개발 서버 실행과 동시에 안드로이드 에뮬레이터로 연결합니다.
- `npm run ios`: 개발 서버 실행과 동시에 iOS 시뮬레이터로 연결합니다.
- `npm run lint`: 코드 문법 및 컨벤션 검사 (ESLint & Prettier)
- `npm run format`: 코드 스타일 자동 정렬 및 수정

### 내 IP 주소 확인 방법

#### macOS

터미널에서 아래 명령어를 실행합니다.

```bash
ipconfig getifaddr en0
```

예시 출력:
192.168.0.10

위 IP를 사용하여 .env 파일을 수정합니다.
EXPO_PUBLIC_API_BASE_URL=<http://192.168.0.10:8000>

만약 아무 값도 출력되지 않는다면, 아래 명령어로 네트워크 인터페이스를 확인합니다.

```bash
ifconfig | grep "inet "
```

출력 중에서 127.0.0.1이 아닌 내부 IP를 사용합니다.

예시:

inet 192.168.0.10 netmask 0xffffff00 broadcast 192.168.0.255

#### Windows

명령 프롬프트 또는 PowerShell에서 아래 명령어를 실행합니다.

```powershell
ipconfig
```

출력 중 현재 연결된 네트워크 어댑터를 찾습니다.
Wi-Fi를 사용 중이라면 보통 아래 항목을 보면 됩니다.

Wireless LAN adapter Wi-Fi:

IPv4 Address. . . . . . . . . . . : 192.168.0.10

여기서 IPv4 Address 값을 사용합니다.

.env 예시:

EXPO_PUBLIC_API_BASE_URL=<http://192.168.0.10:8000>

---

## 🔄 Volta를 통한 버전 관리

이 프로젝트는 [Volta](https://volta.sh/)를 사용하여 Node.js 버전을 관리합니다. Volta를 사용하면 프로젝트에 맞는 Node.js 버전이 자동으로 설정됩니다.

### Volta 설치 (macOS / Linux)

```bash
curl https://get.volta.sh | bash
```

### Volta 설치 (Windows)

```powershell
volta (Windows Package Manager)
# 또는
scoop install volta
```

### 프로젝트 Node.js 버전 설정

프로젝트를 처음 클론한 뒤, 프로젝트 디렉터리로 이동하게 되면 volta가 자동으로 Node.js 버전을 설정합니다.
