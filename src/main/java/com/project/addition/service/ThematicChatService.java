package com.project.addition.service;

import com.project.addition.dto.RoomThematic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ThematicChatService {

    private final Map<String, RoomThematic> roomThematics = new ConcurrentHashMap<>();

    @Transactional
    public void saveRoom(RoomThematic roomThematic) {
        roomThematics.put(roomThematic.getChatId(), roomThematic);
    }

}
