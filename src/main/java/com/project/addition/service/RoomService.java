package com.project.addition.service;

import com.project.addition.dto.Room;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class RoomService {

    private final Map<String, Room> roomMap = new HashMap<>();

//    public String getChatId(String senderId, String recipientId) {
//        String chatId = senderId + recipientId;
//        roomMap.computeIfAbsent(chatId, i -> new Room(i, senderId, recipientId));
//        return chatId;
//    }

    public void saveChatId(String chatId, Room room) {
        roomMap.put(chatId, room);
    }

    public void deleteChatId(String chatId) {
       roomMap.remove(chatId);
    }

    public Boolean findChat(String chatId) {
        Room room = roomMap.get(chatId);
        return roomMap.get(chatId) != null;
    }


}
