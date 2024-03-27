package com.project.addition.service;

import com.project.addition.dto.*;
import com.project.addition.model.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.MessagingAdviceBean;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final Map<String, RoomDTO> roomMap = new ConcurrentHashMap<>();

    private final ThematicChatService thematicChatService;

    private final static Integer COUNT_USERS_ROOM = 2;

    private final SimpMessagingTemplate simpMessagingTemplate;
//    private final RoomRepository roomRepository;

//    private final RedisTemplate<String, Boolean> redisTemplate;

//    public String getChatId(String senderId, String recipientId) {
//        String chatId = senderId + recipientId;
//        roomMap.computeIfAbsent(chatId, i -> new Room(i, senderId, recipientId));
//        return chatId;
//    }

    public void saveChatId(String chatId, RoomDTO room) {
        roomMap.put(chatId, room);
    }

    public void deleteChatId(String chatId) {
       roomMap.remove(chatId);
    }

    public Boolean findChat(String chatId) {
        RoomDTO room = roomMap.get(chatId);
        return roomMap.get(chatId) != null;
    }

//    public void saveMessage(Message message, String chatId) {
//        List<Message> messages = redisTemplate.opsForValue().get(chatId);
//        if(messages == null) {
//            messages = Collections.synchronizedList(new ArrayList<>());
//        }
//        messages.add(message);
//        redisTemplate.opsForValue().set(chatId, messages);
//    }
//
//    public List<Message> getMessage(String id) {
//       return redisTemplate.opsForValue().get(id);
//    }

//    public List<Room> getMessageList(String id) {
//        return roomRepository.findMessagesById(id);
//    }

    public ResponseActiveChat findUserByChatId(String chatId, String userId) {
        RoomDTO room = roomMap.get(chatId);
        RoomThematic roomThematic = thematicChatService.getRoomThematic(chatId);
        if(room != null) {
            Boolean active = room.getUserOneId().equals(userId) || room.getUserTwoId().equals(userId);
            return new ResponseActiveChat(active, "default", null);
        }
        if(roomThematic != null) {
            Boolean active = roomThematic.getUsers().contains(userId);
            Boolean allUsers = roomThematic.getUsers().size() == COUNT_USERS_ROOM;
            if(active && allUsers) {
                simpMessagingTemplate.convertAndSend("/user/all/thematicRoom/delete", new ArrayList<>(List.of(chatId)));
            }
            if(active && !allUsers) {
                String destination = roomThematic.getTypeRoom() == TypeRoom.THEMATIC ? "/user/chat/save/thematic" : "/user/chat/save/thematic18";
                simpMessagingTemplate.convertAndSend(destination, roomThematic);
            }
            return new ResponseActiveChat(active, "thematic", allUsers);
        }
        return new ResponseActiveChat(false, "", null);
    }

    public RoomDTO getRoomByChatId(String chatId) {
        return roomMap.get(chatId);
    }


}
