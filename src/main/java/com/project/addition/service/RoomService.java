package com.project.addition.service;

import com.project.addition.dto.Message;
import com.project.addition.dto.RoomDTO;
import com.project.addition.model.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.MessagingAdviceBean;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final Map<String, RoomDTO> roomMap = new ConcurrentHashMap<>();

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

    public Boolean findUserByChatId(String chatId, String userId) {
        RoomDTO room = roomMap.get(chatId);
        if(room != null) {
            boolean result = room.getUserOneId().equals(userId) || room.getUserTwoId().equals(userId);
            return room.getUserOneId().equals(userId) || room.getUserTwoId().equals(userId);
        }
        return false;
    }

    public RoomDTO getRoomByChatId(String chatId) {
        return roomMap.get(chatId);
    }


}
