package com.project.addition.controller;

import com.project.addition.dto.RoomThematic;
import com.project.addition.service.ThematicChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ThematicChatController {

    private final ThematicChatService thematicChatService;

//    @PostMapping("/create/thematic")
//    public void saveChat(@RequestBody RoomThematic roomThematic) {
//        thematicChatService.saveRoom(roomThematic);
//    }

//    @MessageMapping("/overdue/thematic")
//    @SendTo("/user/chat/overdue/thematic")
//    public List<String> getOverdueThematicChat() {
//        return thematicChatService.getOverdueThematicChat();
//    }


}
