package com.project.addition.controller;

import com.project.addition.dto.RoomThematic;
import com.project.addition.service.ThematicChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ThematicChatController {

    private final ThematicChatService thematicChatService;

    @PostMapping("/create/thematic")
    public void saveChat(@RequestBody RoomThematic roomThematic) {
        thematicChatService.saveRoom(roomThematic);
    }
}
