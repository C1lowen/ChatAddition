package com.project.addition.controller;

import com.project.addition.dto.ActionMessage;
import com.project.addition.dto.Message;
import com.project.addition.dto.User;
import com.project.addition.service.RoomService;
import com.project.addition.service.SearchUserService;
import com.project.addition.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Controller
@RequiredArgsConstructor
public class MessageController {


    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserService userService;
    private final RoomService roomService;
    private final SearchUserService searchUserService;
    private final Map<String, Map<String, String>> sessionMap = new ConcurrentHashMap<>();



    @MessageMapping("/chat/{chatId}")
    public void greet(@Payload Message message, @DestinationVariable String chatId) throws InterruptedException {
        Optional<User> userOptional = userService.getUser(message.getSession());

      if(userOptional.isPresent()) {

            User user = userOptional.get();

//            if(message.getAction() != ActionMessage.DELETE) {
//                roomService.saveMessage(message, chatId);
//            }
//            String recipientId = user.getRecipientId();

//            Room room = roomService.getRoomByChatId(chatId);

            String idRoom = user.getRoom().getChatId();

            simpMessagingTemplate.convertAndSendToUser(chatId, "/message", message);
        }
    }

    @EventListener
    private void handleSessionConnected(SessionConnectEvent event) {
        SimpMessageHeaderAccessor headers1 = SimpMessageHeaderAccessor.wrap(event.getMessage());

        Map<String, Map<String, List<String>>> map = (Map<String, Map<String, List<String>>>)headers1.getHeader("nativeHeaders");

        String session = headers1.getSessionId();

        String userId = ((List<String>)map.get("userId")).get(0);
        String chatId = "";
        Optional<User> userOptional = userService.getUser(userId);
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            chatId = user.getRoom().getChatId();
        }
        
        Map<String, String> setsInfoUser = new ConcurrentHashMap<>();

        setsInfoUser.put("chatId", chatId);
        setsInfoUser.put("userId", userId);

        sessionMap.put(session,setsInfoUser);

    }

    @EventListener
    private void handleSessionDisconnect(SessionDisconnectEvent event) {
        SimpMessageHeaderAccessor headers1 = SimpMessageHeaderAccessor.wrap(event.getMessage());

        String session = headers1.getSessionId();
        Map<String, String> userInfo = sessionMap.getOrDefault(session, new ConcurrentHashMap<>());

        String userId = userInfo.getOrDefault("userId", "");
        String chatId = userInfo.getOrDefault("chatId", "");

        userService.deleteUser(userId);
        roomService.deleteChatId(chatId);
        searchUserService.deleteQueueByUserId(userId);

        sessionMap.remove(session);
    }


}
