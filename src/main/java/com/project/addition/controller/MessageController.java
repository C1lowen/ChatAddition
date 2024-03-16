package com.project.addition.controller;

import com.project.addition.dto.Message;
import com.project.addition.dto.User;
import com.project.addition.service.RoomService;
import com.project.addition.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserService userService;
    private final RoomService roomService;


    @MessageMapping("/hello")
    public void greet(@Payload Message message) throws InterruptedException {
        User user = userService.getUser(message.getSession());

        String recipientId = user.getRecipientId();

        String idRoom = user.getRoomId();

        simpMessagingTemplate.convertAndSendToUser(idRoom, "/message", message);
    }
}
