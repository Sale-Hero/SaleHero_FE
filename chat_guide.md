# 익명 채팅방 기능 프론트엔드 연동 가이드

## 1. 개요

본 문서는 백엔드에 구현된 익명 채팅방 기능과 프론트엔드(React 기반)의 연동을 위한 가이드라인을 제공합니다. 사용자들은 별도의 인증 없이 익명으로 채팅방에 참여하여 실시간으로 메시지를 주고받을 수 있습니다.

## 2. 백엔드 기술 스택 (프론트엔드 연동 관점)

*   **WebSocket:** 실시간 양방향 통신을 위한 프로토콜.
*   **STOMP (Simple Text Oriented Messaging Protocol):** WebSocket 위에서 동작하는 메시징 프로토콜로, 메시지 발행/구독 모델을 제공합니다.
*   **Spring Boot, Spring WebSocket:** 백엔드 구현 기술.
*   **JSON:** 클라이언트와 서버 간 메시지 교환 형식.

## 3. 통신 흐름 및 API 명세

프론트엔드는 SockJS와 StompJS 라이브러리를 사용하여 백엔드 WebSocket 서버와 통신합니다.

### 3.1. WebSocket 연결

*   **Endpoint:** `/ws-chat`
*   **설명:** 클라이언트는 `/ws-chat` 엔드포인트로 WebSocket 연결을 시도합니다. 백엔드는 SockJS 핸드셰이크를 통해 연결을 수립합니다.

### 3.2. 메시지 구독

*   **Topic:** `/topic/chat`
*   **설명:** 연결 성공 후, 클라이언트는 `/topic/chat` 토픽을 구독하여 서버로부터 전송되는 모든 채팅 메시지를 수신합니다.

### 3.3. 메시지 전송

*   **Destination:** `/app/chat.sendMessage`
*   **설명:** 클라이언트는 메시지 입력 후 `/app/chat.sendMessage` 목적지로 STOMP 메시지를 전송하여 채팅 메시지를 발행합니다.

### 3.4. 메시지 형식 (DTO)

클라이언트와 서버 간에 주고받는 메시지 형식은 `ChatMessageDto`를 따르며, JSON 형태로 직렬화/역직렬화됩니다.

```json
{
  "type": "CHAT",    // 메시지 타입 (CHAT, JOIN, LEAVE 중 하나)
  "sender": "익명-12345", // 메시지 발신자 (서버에서 부여한 익명 닉네임)
  "content": "안녕하세요!" // 메시지 내용 (JOIN/LEAVE 타입일 경우 입장/퇴장 메시지)
}
```

*   **`type` (MessageType):** 메시지의 종류를 나타냅니다.
    *   `CHAT`: 일반 채팅 메시지.
    *   `JOIN`: 사용자가 채팅방에 입장했음을 알리는 메시지.
    *   `LEAVE`: 사용자가 채팅방에서 퇴장했음을 알리는 메시지.
*   **`sender` (String):** 메시지를 보낸 사용자의 익명 닉네임입니다. 서버에서 자동으로 부여됩니다.
*   **`content` (String?):** 메시지 내용입니다. `JOIN` 또는 `LEAVE` 타입일 경우, 해당 이벤트에 대한 설명이 포함됩니다.

## 4. 클라이언트 구현 가이드 (개념)

### 4.1. 라이브러리 사용

*   **SockJS:** WebSocket 연결의 브라우저 호환성을 위해 사용합니다.
*   **StompJS:** STOMP 프로토콜을 쉽게 사용할 수 있도록 돕는 클라이언트 라이브러리입니다.

### 4.2. 연결 및 구독 예시 (의사 코드)

```javascript
// 1. SockJS를 사용하여 WebSocket 연결
var socket = new SockJS('/ws-chat');
var stompClient = Stomp.over(socket);

// 2. 연결 성공 시 콜백
stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);

    // 3. 메시지 수신 토픽 구독
    stompClient.subscribe('/topic/chat', function(message) {
        var chatMessage = JSON.parse(message.body);
        // chatMessage.type, chatMessage.sender, chatMessage.content를 사용하여 UI 업데이트
        console.log('Received: ', chatMessage);
    });

    // (선택 사항) 서버는 연결 시 JOIN 메시지를 자동으로 브로드캐스팅합니다.
    // 클라이언트에서 별도로 JOIN 메시지를 보낼 필요는 없습니다.

}, function(error) {
    console.error('Connection error: ' + error);
});

// 4. 메시지 전송 예시
function sendMessage(content) {
    if (stompClient && stompClient.connected) {
        var chatMessage = {
            type: 'CHAT',
            // sender는 서버에서 자동으로 부여하므로 클라이언트에서 보낼 필요 없음
            content: content
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    }
}

// 5. 연결 해제 시 콜백
window.onbeforeunload = function() {
    if (stompClient && stompClient.connected) {
        stompClient.disconnect(function() {
            console.log('Disconnected');
        });
    }
};
```

## 5. 추가 고려사항 (프론트엔드 관점)

*   **UI/UX:** 메시지 표시, 사용자 목록, 입장/퇴장 알림, 메시지 입력 UI 등 사용자 경험을 고려한 디자인 및 구현이 필요합니다.
*   **과거 메시지 조회:** 현재 백엔드는 실시간 메시지만 제공합니다. 과거 메시지 조회 기능이 필요할 경우, 별도의 REST API 엔드포인트를 백엔드에 추가하고 프론트엔드에서 해당 API를 호출하여 메시지 목록을 가져와야 합니다.
*   **에러 처리:** WebSocket 연결 실패, 메시지 전송 실패 등 다양한 상황에 대한 에러 처리 로직을 구현해야 합니다.
*   **재연결 로직:** 네트워크 문제 등으로 연결이 끊겼을 경우, 자동으로 재연결을 시도하는 로직을 구현하는 것이 좋습니다.
*   **보안:** 현재 익명 채팅이므로 별도의 인증은 없지만, 필요시 Spring Security와 연동하여 사용자 인증/권한 부여 로직을 추가할 수 있습니다.
